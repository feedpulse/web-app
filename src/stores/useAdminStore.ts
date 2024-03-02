import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type ReferralCode from "@/models/ReferralCode";
import ApiService from "@/services/apiService";
import {set} from "@vueuse/core";

export const useAdminStore = defineStore('adminStore', () => {
    const referralCodes = ref<ReferralCode[]>([])

    const getReferralCodes = () => {
        return ApiService.AdminAPI.getReferralCodes()
            .then((response) => {
                referralCodes.value = response.data
            }).catch(() => referralCodes.value = [])
    }

    const generateReferralCode = () => {
        return ApiService.AdminAPI.generateReferralCode()
            .then((response) => {
                console.log(response.data)
                set(referralCodes.value, referralCodes.value.length, response.data); // Use Vue.set
                console.log(referralCodes.value)
            }).catch(() => {
                console.log("Failed to generate referral code")
            })
    }

    // The init function will be run when the store is created
    const init = () => {
        getReferralCodes();
    }

    // Call init immediately
    init();

    return {
        referralCodes,
        getReferralCodes,
        generateReferralCode
    }
})
