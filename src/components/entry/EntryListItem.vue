<script lang="ts" setup>

import Button from "primevue/button";

// @ts-ignore
import PhStarDuotone from '~icons/ph/star-duotone'
// @ts-ignore
import PhBookmarkSimpleDuotone from '~icons/ph/bookmark-simple-duotone'
// @ts-ignore
import PhReadCvLogoDuotone from '~icons/ph/read-cv-logo-duotone'

import type Entry from "@/models/Entry";
import {useEntryStore} from "@/stores/useEntryStore";
import {computed} from "vue";


const props = defineProps({
    entry: {
        type: Object as () => Entry,
        required: true
    }
})

const entryStore = useEntryStore()

function markRead() {
    entryStore.markEntryAsRead(props.entry)
    console.log("mark read")
}

function fav() {
    entryStore.markEntryAsFav(props.entry)
    console.log("fav")
}

function bookmark() {
    entryStore.markEntryAsBookmarked(props.entry)
    console.log("bookmark")
}

const readBtnSeverity = computed(() => {
    if (props.entry.read) {
        return "help"
    } else {
        return "secondary"
    }
})

const favBtnSeverity = computed(() => {
    if (props.entry.favorite) {
        return "warning"
    } else {
        return "secondary"
    }
})

const bookmarkBtnSeverity = computed(() => {
    if (props.entry.bookmark) {
        return "info"
    } else {
        return "secondary"
    }
})

</script>


<template>
    <div class="border-primary-400 border m-2 justify-center flex items-center">
        <Button v-tooltip.bottom="'Mark as Read'" :severity="readBtnSeverity" label="Mark Read" outlined text
                @click="markRead">
            <PhReadCvLogoDuotone class="w-5 h-5"/>
        </Button>
        <Button v-tooltip.bottom="'Favourite'" :severity="favBtnSeverity" label="Fav" text @click="fav">
            <PhStarDuotone class="w-5 h-5"/>
        </Button>
        <Button v-tooltip.bottom="'Bookmark'" :severity="bookmarkBtnSeverity" label="Bookmark" text @click="bookmark">
            <PhBookmarkSimpleDuotone class="w-5 h-5"/>
        </Button>
        <div class="text-white grow">
            <a class="hover:underline" :href="entry.link">{{ entry.title }}</a>
        </div>
        <span class="text-white grow-0 whitespace-nowrap">{{ entry.pubDate }}</span>
    </div>
</template>

<style scoped>

</style>
