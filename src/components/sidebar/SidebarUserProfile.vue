<script setup lang="ts">
import {useAuthStore} from "@/stores/useAuthStore";
import {useUserStore} from "@/stores/useUserStore";
import {computed} from "vue";
import {storeToRefs} from "pinia";

// @ts-ignore
import PhUserCircleDuotone from '~icons/ph/user-circle-duotone'
// @ts-ignore
import PhUserCircleMinusDuotone from '~icons/ph/user-circle-minus-duotone'

const authStore =  useAuthStore()
const userStore = useUserStore()
const mail = computed(() => userStore.user?.email ?? "Not logged in")
const {isLoggedIn} = storeToRefs(authStore)



</script>

<template>
        <div class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-2 m-2 rounded-md space-x-2">
            <component v-if="isLoggedIn" :is="PhUserCircleDuotone" class="inline-block"/>
            <component v-else :is="PhUserCircleMinusDuotone" class="inline-block"/>
            <span>{{ mail }}</span>
        </div>
</template>

<style scoped>

</style>
