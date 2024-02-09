import {defineStore, storeToRefs} from "pinia";
import {computed, ref, watch} from "vue";

import {useAuthStore} from "@/stores/useAuthStore";
import type User from "@/models/User";
import apiService from "@/services/apiService";

export const useUserStore = defineStore('userStore', () => {
    const authStore = useAuthStore()
    const user = ref<User | null>(null)
    const {token} = storeToRefs(authStore)

    // Watch for changes in the token and update the user
    watch(token, (newVal, oldVal) => {
        if (newVal) {
            getUser()
        } else {
            user.value = null
        }
    })

    const getUser = () => {
        apiService.UserAPI.getLoggedInUser()
            .then((response) => {
                user.value = response.data
            })
            .catch((error) => {
                user.value = null
            })
    }

    if (authStore.isLoggedIn) {
        getUser()
    }

    const initials = computed(() => {
        if (user.value) {
            return user.value.email.charAt(0).toUpperCase()
        }
        return ''
    })

    const roles = computed(() => {
        if (user.value) {
            return user.value?.roles
                ?.map(role => role.name.replace("ROLE_", "")) || []
        }
        return []
    })

    return {
        user,
        initials,
        roles
    }


})
