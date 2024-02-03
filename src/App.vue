<script lang="ts" setup>
import {RouterView} from 'vue-router'
import router from "@/router";
import Toast from "primevue/toast";
</script>

<template>
    <component :is="router.currentRoute.value.meta.layout || 'div'">
        <Toast/>
        <RouterView/>
    </component>
</template>

