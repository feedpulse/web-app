<script lang="ts" setup>

import Button from 'primevue/button';
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import EntryCard from "@/components/entry/EntryCard.vue";

const entryStore = useEntryStore()
const {entries, loadMoreEntriesBool, noMoreEntries} = storeToRefs(entryStore)

entryStore.getFavoriteEntries()

const onLoadMore = () => entryStore.loadMoreEntries()

</script>
<template>
    <div class="home w-full flex flex-wrap place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button :disabled="loadMoreEntriesBool" label="Load more" @click="onLoadMore"/>
        </div>
    </div>
</template>
