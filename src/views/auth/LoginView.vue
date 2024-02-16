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

import {onMounted, ref} from 'vue'
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";
import {watchOnce} from "@vueuse/core";
import {useUserStore} from "@/stores/useUserStore";
import {storeToRefs} from "pinia";

import {buildTime, sha, version} from "@/const/GitMetaProperties"

const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const userStore = useUserStore()

const {errorMsg} = storeToRefs(authStore)

function handleLogin() {
    authStore.loginUser(email.value, password.value)
    watchOnce(() => userStore.user, (isLoggedIn) => {
        if (isLoggedIn) {
            router.push("/all")
        }
    })
}

onMounted(() => {
    // if user is already logged in, redirect to home
    if (authStore.isLoggedIn) {
        // router.push("/")
    }
})

</script>

<template>
    <form @submit.prevent="handleLogin"
        class="h-screen w-screen flex flex-col gap-3 ">
        <div class="absolute bottom-0 left-0 p-2">
            <div class="text-surface-600 text-xs">
                <span class="block">Version: {{version}}</span>
                <span class="block">SHA: {{sha}}</span>
                <span class="block">Build Time: {{buildTime}}</span>
            </div>
        </div>
        <div class="w-96 h-full mx-auto flex flex-col gap-3 justify-center">
            <p class="text-3xl font-bold text-surface-300 py-6">
                Welcome to
                <span class="text-3xl font-bold text-primary-500">FeedPulse</span>
                <sup class="text-surface-600 ms-1 text-sm italic">(alpha)</sup>
            </p>
            <span class="text-surface-600">Login to your account</span>


            <InputGroup>
                <InputGroupAddon>
                    <PhEnvelopeDuotone/>
                </InputGroupAddon>
                <InputText class="w-full" v-model="email" placeholder="Email" type="email"/>
            </InputGroup>

            <InputGroup class="w-full">
                <InputGroupAddon>
                    <PhKeyDuotone/>
                </InputGroupAddon>
                <InputText class="w-full" :feedback="false" v-model="password" placeholder="Password" type="password" toggle-mask/>
            </InputGroup>
            <Transition>
                <InlineMessage v-if="errorMsg != ''">{{ errorMsg }}</InlineMessage>
            </Transition>

            <Button class="w-full" label="Login" size="small" type="submit"/>
            <Divider type="dotted" />
            <span class="text-surface-600">
                Don't have an account?
                <RouterLink to="/request-account" class="underline"> Request account</RouterLink>
            </span>
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
