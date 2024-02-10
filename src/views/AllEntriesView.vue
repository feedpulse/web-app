<script lang="ts" setup>

import Button from 'primevue/button';
import ProgressBar from 'primevue/progressbar';

import {useFeedStore} from "@/stores/useFeedStore";
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import EntryListItem from "@/components/entry/EntryListItem.vue";
import {onBeforeUnmount, onMounted} from "vue";
import {usePreferenceStore} from "@/stores/usePreferenceStore";
import EntryView from "@/models/enums/EntryView";
import EntryCardItem from "@/components/entry/EntryCardItem.vue";

const preferenceStore = usePreferenceStore()
const feedStore = useFeedStore()
const entryStore = useEntryStore()
const {entries, loadMoreEntriesBool, noMoreEntries} = storeToRefs(entryStore)
const {entryView} = storeToRefs(preferenceStore)


onMounted(() => entryStore.getEntries())
onBeforeUnmount(() => entryStore.clearEntries())

const onLoadMore = () => entryStore.loadMoreEntries()


</script>
<template>
    <div v-if="entries.length > 0" :class="[entryView == EntryView.LIST ? '' :'flex flex-wrap']"
         class="home w-full  place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCardItem v-if="entryView == EntryView.CARD" :entry="entry"/>
            <EntryListItem v-if="entryView == EntryView.LIST" :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button :disabled="loadMoreEntriesBool" label="Load more" @click="onLoadMore"/>
        </div>
    </div>
    <div v-else class="h-screen flex items-center justify-center">
        <div class="flex justify-center w-full p-4">
            <ProgressBar class="w-96 !h-1.5" mode="indeterminate"></ProgressBar>
        </div>
    </div>
</template>
