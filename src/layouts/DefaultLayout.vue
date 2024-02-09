<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import UnauthorizedDialog from "@/components/dialogs/UnauthorizedDialog.vue";
import Topbar from "@/components/topbar/Topbar.vue";

</script>

<template>
    <div class="flex flex-col bg-surface-900">
        <div class="ml-56">
            <Topbar/>
        </div>
        <UnauthorizedDialog/>
        <Sidebar />
        <div class="ml-56 h-screen">
            <slot/>
        </div>
    </div>
</template>

<style scoped>

</style>
