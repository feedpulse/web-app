<script lang="ts" setup>

import {useRoute} from "vue-router";
import {ref, watch, watchEffect} from "vue";
import EntryView from "@/models/enums/EntryView";
import EntryListItem from "@/components/entry/EntryListItem.vue";
import Button from "primevue/button";
import ProgressBar from "primevue/progressbar";
import EntryCardItem from "@/components/entry/EntryCardItem.vue";
import {storeToRefs} from "pinia";
import {useSearchStore} from "@/stores/useSearchStore";
import {usePreferenceStore} from "@/stores/usePreferenceStore";

const searchStore = useSearchStore();
const preferenceStore = usePreferenceStore();

const {entries, loadMoreEntriesBool, noMoreEntries} = storeToRefs(searchStore);
const {entryView} = storeToRefs(preferenceStore);

const route = useRoute();
const query = ref<string>('');

watchEffect(() => {
    query.value = route.query.query as string;
    console.log(query.value);
    searchStore.getEntriesByQuery(query.value);
});

const onLoadMore = () => searchStore.loadMoreEntries()

</script>

<template>
    <div>
        <div class="flex items-center px-4 p-2">
            <h1 class="text-4xl text-white">Search '{{ query }}'</h1>
        </div>
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
    </div>
</template>

<style scoped>

</style>
