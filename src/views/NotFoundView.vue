<script setup lang="ts">

</script>

<template>
    <div class="bg-surface-900 w-screen h-screen">
        <div class="flex flex-col items-center justify-center h-full">
            <h1 class="text-9xl text-primary-500">404</h1>
            <h2 class="text-3xl text-white">Page not found</h2>
            <!-- go home -->
            <router-link to="/">
                <button class="bg-primary-500 text-white px-4 py-2 rounded-md mt-8">Go Home</button>
            </router-link>
        </div>
    </div>
</template>

<style scoped>

</style>
