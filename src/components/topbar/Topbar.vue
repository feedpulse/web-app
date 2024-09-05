<script lang="ts" setup>
import ProfileBubble from "@/components/topbar/ProfileBubble.vue";
import ViewOptions from "@/components/topbar/ViewOptions.vue";
import Searchbar from "@/components/topbar/Searchbar.vue";
import Divider from 'primevue/divider';
import Button from "primevue/button";

// @ts-ignore
import PhReadCvLogoDuotone from '~icons/ph/read-cv-logo-duotone'
import {useFeedStore} from "@/stores/useFeedStore";
import {storeToRefs} from "pinia";

const feedStore = useFeedStore()
const {selectedFeed} = storeToRefs(feedStore)

function markRead() {
    feedStore.markFeedAsRead(selectedFeed.value?.uuid)
    console.log("mark read")
}

</script>

<template>
    <div class="h-16 flex justify-end items-center mx-4">
        <Searchbar />
        <Divider layout="vertical" style="min-height: unset" class="!me-1"/>
        <div>
            <Button v-tooltip.bottom="'Mark Feed as Read'" severity="secondary" text  label="Mark Read" outlined @click="markRead">
                <PhReadCvLogoDuotone class="w-5 h-5" />
            </Button></div>
        <Divider layout="vertical" style="min-height: unset" class=" !ms-1"/>
        <ViewOptions />
        <Divider layout="vertical" style="min-height: unset"/>
        <ProfileBubble/>
    </div>
</template>

