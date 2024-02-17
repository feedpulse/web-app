<script lang="ts" setup>

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';
import Divider from 'primevue/divider';

// @ts-ignore
import PhKeyDuotone from '~icons/ph/key-duotone'
// @ts-ignore
import PhEnvelopeDuotone from '~icons/ph/envelope-duotone'
// @ts-ignore
import PhCodeDuotone from '~icons/ph/code-duotone'

import {onMounted, ref} from 'vue'
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";
import {watchOnce} from "@vueuse/core";
import {useUserStore} from "@/stores/useUserStore";
import {storeToRefs} from "pinia";

import {buildTime, sha, version} from "@/const/GitMetaProperties"

const email = ref('')
const password = ref('')
const referralCode = ref('')

const authStore = useAuthStore()
const userStore = useUserStore()

const {errorMsg} = storeToRefs(authStore)
const sendSuccess = ref(false)

function handleAccountRequest() {
    authStore
        .requestAccount(email.value, password.value, referralCode.value)
        .then(() => sendSuccess.value = true)
}

onMounted(() => {
    // if user is already logged in, redirect to home
    if (authStore.isLoggedIn) {
        router.push("/")
    }
})

</script>

<template>
    <form class="h-screen w-screen flex flex-col gap-3 "
          @submit.prevent="handleAccountRequest">
        <div class="absolute bottom-0 left-0 p-2">
            <div class="text-surface-600 text-xs">
                <span class="block">Version: {{ version }}</span>
                <span class="block">SHA: {{ sha }}</span>
                <span class="block">Build Time: {{ buildTime }}</span>
            </div>
        </div>
        <div class="w-96 h-full mx-auto flex flex-col gap-3 justify-center">
            <p class="text-3xl font-bold text-surface-300 py-6">
                Welcome to
                <span class="text-3xl font-bold text-primary-500">FeedPulse</span>
                <sup class="text-surface-600 ms-1 text-sm italic">(alpha)</sup>
            </p>
            <!--            <span class="text-surface-600">Enter your email and password to request an account.</span>-->


            <InputGroup>
                <InputGroupAddon>
                    <PhEnvelopeDuotone/>
                </InputGroupAddon>
                <InputText v-model="email" class="w-full" placeholder="Email" type="email"/>
            </InputGroup>

            <InputGroup class="w-full">
                <InputGroupAddon>
                    <PhKeyDuotone/>
                </InputGroupAddon>
                <InputText v-model="password" :feedback="false" class="w-full" placeholder="Password" toggle-mask
                           type="password"/>
            </InputGroup>
            <Transition>
                <InlineMessage v-if="errorMsg != ''">{{ errorMsg }}</InlineMessage>
            </Transition>
            <span class="text-surface-600">Already have an account? <RouterLink class="underline"
                                                                                to="/login">Login</RouterLink></span>
            <Divider/>
            <InputGroup class="w-full flex flex-col">
                <div class="flex">
                    <InputGroupAddon>
                        <PhCodeDuotone/>
                    </InputGroupAddon>
                    <InputText v-model="referralCode" :feedback="false" class="w-full" placeholder="Referral code"
                               toggle-mask type="text"/>
                </div>
                <span id="username-help" class="text-surface-600">Enter your referral code to request an account.</span>
            </InputGroup>
            <Transition>
                <Button v-if="!sendSuccess" class="w-full my-2" label="Request account" size="small" type="submit"/>
                <InlineMessage v-else severity="success">An account request was sent to the server. You will be notified once
                    your account is ready.
                </InlineMessage>
            </Transition>

        </div>
    </form>

</template>

<style scoped>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
