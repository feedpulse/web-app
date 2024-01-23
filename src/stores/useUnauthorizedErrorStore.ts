import {defineStore} from "pinia";
import {ref} from "vue";

export const useUnauthorizedErrorStore = defineStore('unauthorizedErrorStore', () => {

    const isUnauthorizedError = ref(false)

    const checkIfUnauthorizedError = (error: any) => {
        if (error.response.status === 401) {
            isUnauthorizedError.value = true
        }
    }

    return {
        checkIfUnauthorizedError,
        isUnauthorizedError,
    }

})
