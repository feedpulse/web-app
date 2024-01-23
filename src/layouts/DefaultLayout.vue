<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";

</script>

<template>
    <div class="flex bg-surface-900">
        <Sidebar />
        <div class="ml-56 w-full h-screen">
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
