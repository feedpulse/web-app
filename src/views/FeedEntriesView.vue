<script lang="ts" setup>

import Button from 'primevue/button';
import {useFeedStore} from "@/stores/useFeedStore";
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import {watch} from "vue";
import EntryCard from "@/components/entry/EntryCard.vue";
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
    await feedStore.setSelectedFeed(newVal as string)
    entryStore.getEntriesForCurrentFeed()
}, {
    immediate: true
})

const onLoadMore = () => entryStore.loadMoreEntries()

</script>
<template>
    <div class="home w-full flex flex-wrap place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button label="Load more" @click="onLoadMore" :disabled="loadMoreEntriesBool"/>
        </div>
    </div>
</template>
