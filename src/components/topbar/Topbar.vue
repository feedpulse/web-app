<script lang="ts" setup>

import {ref, watch} from "vue";

import ProfileBubble from "@/components/topbar/ProfileBubble.vue";
import ViewOptions from "@/components/topbar/ViewOptions.vue";
import Searchbar from "@/components/topbar/Searchbar.vue";
import Divider from 'primevue/divider';
import Button from "primevue/button";
import SelectButton from "primevue/selectbutton";

// @ts-ignore
import PhReadCvLogoDuotone from '~icons/ph/read-cv-logo-duotone'
import {useFeedStore} from "@/stores/useFeedStore";
import {storeToRefs} from "pinia";
import {useEntryStore} from "@/stores/useEntryStore";

const entryStore = useEntryStore()
const feedStore = useFeedStore()
const {selectedFeed} = storeToRefs(feedStore)

function markRead() {
    if (!selectedFeed.value) return
    feedStore.markFeedAsRead(selectedFeed.value.uuid)
    console.log("mark read")
}

const value = ref('All');
const options = ref(['All', 'Unread']);
watch(value, (newVal) => {
    entryStore.onlyUnreadEntries = (newVal !== 'All');
    // only works when a specific feed is selected, not for all feeds
    if (selectedFeed.value) {
        entryStore.getEntriesForCurrentFeed()
    } else {
        entryStore.getEntries()
    }
})

</script>

<template>
    <div class="h-16 flex justify-end items-center mx-4">
        <Searchbar />
        <Divider layout="vertical" style="min-height: unset" class="!me-1 "/>
        <div>
            <Button v-tooltip.bottom="'Mark Feed as Read'" severity="secondary" text  label="Mark Read" outlined @click="markRead">
                <PhReadCvLogoDuotone class="w-5 h-5" />
            </Button></div>
        <Divider layout="vertical" style="min-height: unset" class=" !ms-1"/>
        <div class="card flex justify-center">
            <SelectButton v-model="value" :options="options" aria-labelledby="basic" />
        </div>
        <Divider layout="vertical" style="min-height: unset"/>
        <ViewOptions />
        <Divider layout="vertical" style="min-height: unset"/>
        <ProfileBubble/>
    </div>
</template>

