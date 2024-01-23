<script lang="ts" setup>

import {useEntryStore} from "@/stores/useEntryStore";
import {storeToRefs} from "pinia";
import EntryCard from "@/components/entry/EntryCard.vue";

const entryStore = useEntryStore()
const {entries} = storeToRefs(entryStore)

entryStore.getBookmarkedEntries()

</script>
<template>
    <div class="home w-full flex flex-wrap place-items-center bg-surface-900">}
        <div v-for="entry in entries" :key="entry.uuid">
            <EntryCard :entry="entry"/>
        </div>
    </div>
</template>
