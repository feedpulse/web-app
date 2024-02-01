import {defineStore} from "pinia";
import {computed, type ComputedRef, ref} from "vue";
import {useNow, useSessionStorage, useTimestamp} from '@vueuse/core'
import jwtDecode, {type JwtPayload} from "jwt-decode";
import ApiService from "@/services/apiService";
import {useToast} from "primevue/usetoast";

export const useAuthStore = defineStore('authStore', () => {
    const toast = useToast()
    const unauthorized = ref(true)
    const errorMsg = ref('')
    ApiService.setUnauthenticatedCallback(() => unauthorized.value = true)
    ApiService.setUnauthorizedCallback(() => toast.add({severity: 'error', summary: 'Unauthorized', detail: 'You are not authorized to perform this action.', life: 3000}))
    ApiService.setNetworkErrorCallback(() => toast.add({severity: 'error', summary: 'Network Error', detail: 'An error occurred while sending the request.', life: 3000}))

    const tokenString = useSessionStorage<string | null>('token', null)
    if (tokenString.value != null) {
        ApiService.setBearer(tokenString.value)
    }

    const token: ComputedRef<JwtPayload | null> = computed(() => {
        try {
            console.log(tokenString.value)
            // Returns with the JwtPayload type
            return jwtDecode<JwtPayload>(tokenString.value ?? "")
        } catch (e) {
            return null
        }
    })
    const expiration: ComputedRef<number> = computed(() => token?.value?.exp ?? -1)
    const isLoggedIn: boolean = expiration.value > Math.floor(Date.now() / 1000)


    const loginUser = async (email: string, password: string) => {
        ApiService.AuthAPI.login(email, password).then((response) => {
            errorMsg.value = ''
            unauthorized.value = false
            tokenString.value = response.data.token
            ApiService.setBearer(tokenString.value)
        }).catch((error) => {
            errorMsg.value = error.response.data.details
            logout()
        })
    }

    const logout = () => {
        unauthorized.value = true
        tokenString.value = null
        ApiService.setBearer(null)
    }

    return {
        errorMsg,
        unauthorized,
        expiration,
        isLoggedIn,
        token,
        loginUser,
        logout
    }

})
