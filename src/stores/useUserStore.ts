import {defineStore, storeToRefs} from "pinia";
import {ref, watch} from "vue";

import {useAuthStore} from "@/stores/useAuthStore";
import {UserAPI} from "@/api/UserAPI";
import {useUnauthorizedErrorStore} from "@/stores/useUnauthorizedErrorStore";

export const useUserStore = defineStore('userStore', () => {
    const authStore = useAuthStore()
    const user = ref<User | null>(null)
    const {tokenString} = storeToRefs(authStore)

    const unauthStore = useUnauthorizedErrorStore()


    /**
     * will evaluate to true if value is not:
     *     - null
     *     - undefined
     *     - NaN
     *     - empty string ("")
     *     - 0
     *     - false
     */
    watch(tokenString, (newVal, oldVal) => {
        if (newVal) {
            getUser(newVal)
        } else {
            user.value = null
        }
    })

    const getUser = (bearer: string) => {
        console.log("Getting user with token: " + bearer)
        UserAPI.getLoggedInUser(bearer)
            .then((response) => {
                user.value = response.data
            })
            .catch((error) => {
                unauthStore.checkIfUnauthorizedError(error)

                console.error(error)
                user.value = null
            })
    }

    if (authStore.isLoggedIn) {
        getUser(tokenString.value!)
    }

    return {
        user,
    }


})
