<script lang="ts" setup>

import Button from 'primevue/button';
import {useFeedStore} from "@/stores/useFeedStore";
import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import EntryCard from "@/components/entry/EntryCard.vue";
import {onBeforeMount} from "vue";

const feedStore = useFeedStore()
const entryStore = useEntryStore()
const {entries, loadMoreEntriesBool, noMoreEntries} = storeToRefs(entryStore)

onBeforeMount(async () => {
    await feedStore.setSelectedFeed(null)
    entryStore.getEntries()
    // alert("mounted")
    // await until(entries).toMatch((entries) => entries.length > 0)
    // alert("done")

})

const onLoadMore = () => entryStore.loadMoreEntries()


</script>
<template>
    <div class="home w-full flex flex-wrap place-items-center bg-surface-900">
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
        <div v-if="!noMoreEntries" class="flex justify-center w-full p-4">
            <Button  label="Load more" @click="onLoadMore" :disabled="loadMoreEntriesBool"/>
        </div>
    </div>
</template>
