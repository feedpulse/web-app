<script lang="ts" setup>

import Button from 'primevue/button';
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import EntryCard from "@/components/entry/EntryCardItem.vue";
import {onBeforeUnmount, onMounted} from "vue";
import ProgressBar from "primevue/progressbar";

const entryStore = useEntryStore()
const {entries, loadMoreEntriesBool, noMoreEntries} = storeToRefs(entryStore)

onMounted(() => entryStore.getEntries())
onBeforeUnmount(() => entryStore.clearEntries())

const onLoadMore = () => entryStore.loadMoreEntries()

</script>
<template>
    <div v-if="entries.length > 0" class="home w-full flex flex-wrap place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button :disabled="loadMoreEntriesBool" label="Load more" @click="onLoadMore"/>
        </div>
    </div>
    <div v-else class="h-screen flex items-center justify-center">
        <div class="flex justify-center w-full p-4">
            <ProgressBar mode="indeterminate" class="w-96 !h-1.5"></ProgressBar>
        </div>
    </div>
</template>
