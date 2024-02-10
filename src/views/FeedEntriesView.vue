<script lang="ts" setup>

import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';
import {useFeedStore} from "@/stores/useFeedStore";
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import {onBeforeUnmount, onBeforeUpdate, onMounted, watch} from "vue";
import EntryCard from "@/components/entry/EntryCardItem.vue";
import {useRoute} from "vue-router";

const feedStore = useFeedStore()
const entryStore = useEntryStore()
const {entries, loadMoreEntriesBool,noMoreEntries} = storeToRefs(entryStore)
const route = useRoute()

const props = defineProps({
    feedId: {
        type: String,
        required: false
    }
})

watch(() => route.params.feedId, async (newVal, oldVal) => {
    if (newVal == oldVal || newVal == undefined) return
    entryStore.clearEntries()
    await feedStore.setSelectedFeed(newVal as string)
    entryStore.getEntriesForCurrentFeed()
}, {
    immediate: true
})

onBeforeUnmount(() => entryStore.clearEntries())

const onLoadMore = () => entryStore.loadMoreEntries()

</script>
<template>
    <div v-if="entries.length > 0" class="home w-full flex flex-wrap place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button label="Load more" @click="onLoadMore" :disabled="loadMoreEntriesBool"/>
        </div>
    </div>
    <div v-else class="h-screen flex items-center justify-center">
        <div class="flex justify-center w-full p-4">
            <ProgressBar mode="indeterminate" class="w-96 !h-1.5"></ProgressBar>
        </div>
    </div>
</template>
