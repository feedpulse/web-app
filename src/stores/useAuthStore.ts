import {defineStore} from "pinia";
import {computed, type ComputedRef, readonly} from "vue";
import {AuthAPI} from "@/api/AuthAPI";
import {useSessionStorage} from '@vueuse/core'
import jwtDecode, {type JwtPayload} from "jwt-decode";

export const useAuthStore = defineStore('authStore', () => {
    const _tokenString = useSessionStorage<string | null>('token', null)
    const tokenString = readonly(_tokenString)
    const token: ComputedRef<JwtPayload | null> = computed(() => {
        try {
             // Returns with the JwtPayload type
            const decoded = jwtDecode<JwtPayload>(_tokenString.value ?? "")
            removeTokenAtExpiration((decoded.exp! - decoded.iat!) * 1000)
            return decoded
        } catch (e) {
            return null
        }
    })
    const expiration: ComputedRef<number> = computed(() => token?.value?.exp ?? -1)
    const isLoggedIn: ComputedRef<boolean> = computed(() => expiration.value > 0) //todo

    const loginUser = async (email: string, password: string) => {
        AuthAPI.login(email, password).then((response) => {
            _tokenString.value = response.data
        }).catch((error) => {
            console.error(error)
            _tokenString.value = null
        })
    }

    const removeTokenAtExpiration = (time: number) => {
        setTimeout(() => {
            _tokenString.value = null
        }, time)
    }

    const logout = () => {
        _tokenString.value = null
    }

    return {
        tokenString,
        expiration,
        isLoggedIn,
        token,
        loginUser,
        logout
    }

})
