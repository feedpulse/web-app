import {defineStore} from "pinia";
import {computed, type ComputedRef, ref, watch} from "vue";
import {useNow, useSessionStorage, useTimestamp} from '@vueuse/core'
import jwtDecode, {type JwtPayload} from "jwt-decode";
import ApiService from "@/services/apiService";
import {useToast} from "primevue/usetoast";

export const useAuthStore = defineStore('authStore', () => {
    const toast = useToast()
    const unauthenticated = ref(true)
    const errorMsg = ref('')
    ApiService.setUnauthenticatedCallback(() => unauthenticated.value = true)
    ApiService.setUnauthorizedCallback(() => toast.add({severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized to perform this action.', life: 3000}))
    ApiService.setNetworkErrorCallback(() => toast.add({severity: 'error', summary: 'Network Error', detail: 'An error occurred while sending the request.', life: 3000}))

    const tokenString = useSessionStorage<string | null>('token', null)
    if (tokenString.value != null) {
        ApiService.setBearer(tokenString.value)
    }

    const token: ComputedRef<JwtPayload | null> = computed(() => {
        try {
            // Returns with the JwtPayload type
            return jwtDecode<JwtPayload>(tokenString.value ?? "")
        } catch (e) {
            console.log(e)
            return null
        }
    })
    const expiration = computed(() => token?.value?.exp ?? -1)
    const isLoggedIn = computed(() => expiration.value > Math.floor(Date.now() / 1000))


    const loginUser = async (email: string, password: string) => {
        ApiService.AuthAPI.login(email, password).then((response) => {
            errorMsg.value = ''
            unauthenticated.value = false
            tokenString.value = response.data.token
        }).catch((error) => {
            errorMsg.value = error.response.data.details
            logout()
        })
    }

    const logout = () => {
        unauthenticated.value = true
        tokenString.value = null
        ApiService.setBearer(null)
    }

    return {
        errorMsg,
        unauthenticated,
        expiration,
        isLoggedIn,
        token,
        loginUser,
        logout
    }

})
