<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import UnauthorizedDialog from "@/components/dialogs/UnauthorizedDialog.vue";

</script>

<template>
    <div class="flex bg-surface-900">
        <UnauthorizedDialog/>
        <Sidebar />
        <div class="ml-56 w-full h-screen">
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
