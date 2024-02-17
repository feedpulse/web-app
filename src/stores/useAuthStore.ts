import {defineStore} from "pinia";
import {computed, type ComputedRef, ref} from "vue";
import {useEventBus, useSessionStorage, useTimestamp} from '@vueuse/core'
import jwtDecode, {type JwtPayload} from "jwt-decode";
import ApiService from "@/services/apiService";
import {useToast} from "primevue/usetoast";

export const useAuthStore = defineStore('authStore', () => {
    const toast = useToast()
    const unauthEventBus = useEventBus<boolean>('unauth')
    const errorMsg = ref('')
    ApiService.setUnauthenticatedCallback(() => {
        unauthEventBus.emit(true)
        logout()
    })
    ApiService.setUnauthorizedCallback(() => toast.add({
        severity: 'error',
        summary: 'Unauthorized',
        detail: 'You are not authorized to perform this action.',
        life: 3000
    }))
    ApiService.setTooManyRequestsCallback(() => toast.add({
        severity: 'error',
        summary: 'Too Many Requests',
        detail: 'You have made too many requests. Please wait a while before trying again.',
        life: 3000
    }))
    ApiService.setNetworkErrorCallback(() => toast.add({
        severity: 'error',
        summary: 'Network Error',
        detail: 'An error occurred while sending the request.',
        life: 3000
    }))

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
            unauthEventBus.emit(false)
            tokenString.value = response.data.token
        }).catch((error) => {
            errorMsg.value = error.response.data.details
            logout()
        })
    }

    const requestAccount = async (email: string, password: string, referralCode: string) => {
        ApiService.AuthAPI.requestAccount(email, password, referralCode).then((response) => {
            errorMsg.value = ''
            unauthEventBus.emit(false)
            tokenString.value = response.data.token
            Promise.resolve()
        }).catch((error) => {
            errorMsg.value = error.response.data.details
            logout()
            Promise.reject()
        })
    }

    const logout = () => {
        unauthEventBus.emit(true)
        tokenString.value = null
        ApiService.setBearer(null)
    }

    return {
        errorMsg,
        unauthEventBus,
        // unauthenticated,
        expiration,
        isLoggedIn,
        token,
        loginUser,
        requestAccount,
        logout
    }

})
