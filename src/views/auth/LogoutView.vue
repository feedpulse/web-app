<script lang="ts" setup>
import {onMounted} from "vue";
import {useAuthStore} from "@/stores/useAuthStore";
import {useRouter} from "vue-router";

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
    authStore.logout()
    router.push("/login")
})

</script>

<template>
    <div>
        <h1>Logout</h1>
    </div>
</template>

<style scoped>

</style>
