<script lang="ts" setup>

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import InlineMessage from 'primevue/inlinemessage';

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

import {sha,version, buildTime} from "@/const/GitMetaProperties"

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
        router.push("/")
    }
})

</script>

<template>
    <div
        class="h-screen w-screen justify-center items-center justify-items-center place-items-center flex flex-col gap-3">
        <div class="absolute bottom-0 left-0 p-2">
            <div class="text-surface-600 text-xs">
                <span class="block">Version: {{version}}</span>
                <span class="block">SHA: {{sha}}</span>
                <span class="block">Build Time: {{buildTime}}</span>
            </div>
        </div>
        <InputGroup class="!w-fit">
            <InputGroupAddon>
                <PhEnvelopeDuotone/>
            </InputGroupAddon>
            <InputText v-model="email" placeholder="Email" type="email"/>
        </InputGroup>

        <InputGroup class="!w-fit">
            <InputGroupAddon>
                <PhKeyDuotone/>
            </InputGroupAddon>
            <Password v-model="password" placeholder="Password" toggle-mask/>
        </InputGroup>
        <Transition>
            <InlineMessage v-if="errorMsg != ''">{{ errorMsg }}</InlineMessage>
        </Transition>

        <Button class="w-fit" label="Login" size="small" @click="handleLogin"/>
    </div>

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
