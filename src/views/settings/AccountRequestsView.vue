<script lang="ts" setup>
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";

// @ts-ignore
import PhCopySimpleDuotone from '~icons/ph/copy-simple-duotone'

import {useAdminStore} from "@/stores/useAdminStore";
import {useUserStore} from "@/stores/useUserStore";
import {onMounted, ref, watch, watchEffect} from "vue";
import type User from "@/models/User";
import {useClipboard} from "@vueuse/core";
import {useToast} from "primevue/usetoast";
import {storeToRefs} from "pinia";

const toast = useToast()
const userStore = useUserStore()
const adminStore = useAdminStore()
const {referralCodes} = storeToRefs(adminStore)

const disabledUsers = ref<User[]>([])

onMounted(() => {
    userStore.getUsersWithFilter(null, false).then(users => {
        disabledUsers.value = users.data.content
        console.log(disabledUsers.value)
    })
})

const referralCode = ref("gg wp")
watch(referralCodes, (newVal) => {
    console.log(newVal)
    if (newVal.length > 0) {
        const size = newVal.length
        referralCode.value = newVal[size - 1].code
    }
},  { immediate: true, deep: true })


function generateReferralCode() {
    adminStore.generateReferralCode()
}

const { copy } = useClipboard()

function copyToClipboard() {
    copy(referralCode.value)
    toast.add({severity: 'success', summary: 'Copied', detail: 'Referral code copied to clipboard', life: 3000});
}

function enableUser(user: User) {
    console.log(user)
    userStore.enableUser(user).then(() => {
        disabledUsers.value = disabledUsers.value.filter(u => u.uuid !== user.uuid)
    })
}
</script>

<template>
    <div>
        <div v-for="user in disabledUsers" :key="user.uuid" class="mt-4">
            <div class="flex m-1 items-center ">
                <span class="grow text-white">{{ user.email}}</span>
                <Button @click="enableUser(user)" label="Enable" size="small"/>
            </div>
            <Divider type="dotted" class="!my-1.5"/>
        </div>
        <div class="flex mx-auto w-full space-y-4 space-x-4 justify-center items-center">
            <Button @click="generateReferralCode" label="Generate new Referral Code" class="mt-4" />
            <InputText class="grow" type="text" v-model="referralCode" readonly />
            <PhCopySimpleDuotone @click="copyToClipboard" v-tooltip.left="'Copy'" class=" w-fit h-fit text-white p-1" />
        </div>

    </div>
</template>

<style scoped>

</style>
