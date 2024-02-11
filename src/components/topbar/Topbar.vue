<script lang="ts" setup>
import ProfileBubble from "@/components/topbar/ProfileBubble.vue";
import ViewOptions from "@/components/topbar/ViewOptions.vue";
import Searchbar from "@/components/topbar/Searchbar.vue";
</script>

<template>
    <div class="h-16 flex justify-end items-center mx-4">
        <Searchbar />
        <ViewOptions />
        <ProfileBubble/>
    </div>
</template>

