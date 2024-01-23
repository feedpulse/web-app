<script lang="ts" setup>
import {RouterView} from 'vue-router'
import router from "@/router";
</script>

<template>
    <component :is="router.currentRoute.value.meta.layout || 'div'">
        <RouterView/>
    </component>
</template>

