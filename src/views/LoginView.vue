<script lang="ts" setup>

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';

// @ts-ignore
import PhKeyDuotone from '~icons/ph/key-duotone'
// @ts-ignore
import PhEnvelopeDuotone from '~icons/ph/envelope-duotone'

import {ref} from 'vue'
import {useAuthStore} from "@/stores/useAuthStore";
import router from "@/router";
import {watchOnce} from "@vueuse/core";
import {useUserStore} from "@/stores/useUserStore";

const email = ref('')
const password = ref('')

const authStore = useAuthStore()
const userStore = useUserStore()

function handleLogin() {
    authStore.loginUser(email.value, password.value)
    watchOnce(() => userStore.user, (isLoggedIn) => {
        if (isLoggedIn) {
            router.push("/")
        }
    })
}

</script>

<template>
    <div
        class="h-screen w-screen justify-center items-center justify-items-center place-items-center flex flex-col gap-3">
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

        <Button class="w-fit" label="Login" size="small" @click="handleLogin"/>
    </div>

</template>

<style scoped>

</style>
