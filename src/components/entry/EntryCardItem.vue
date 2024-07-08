<script setup lang="ts">

import Button from "primevue/button";
import Card from "primevue/card";

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
    <Card class="border-primary-400 border w-[28em] m-2" >
        <template #header>
            <img alt="user header" class="w-full  object-cover aspect-[5/3]" :src="entry.imageUrl" />
        </template>
        <template #title> <a class="hover:underline duration-300" :href="entry.link">{{entry.title}}</a> </template>
        <template #subtitle> {{entry.pubDate}} </template>
        <template #content>
            <p class="m-0 line-clamp-6">
                {{entry.description}}
            </p>
        </template>
        <template #footer>
            <div class="">
                <Button v-tooltip.bottom="'Mark as Read'" :severity="readBtnSeverity" text label="Mark Read" outlined @click="markRead">
                    <PhReadCvLogoDuotone class="w-5 h-5" />
                </Button>
                <Button v-tooltip.bottom="'Favourite'" :severity="favBtnSeverity" label="Fav" text @click="fav" >
                    <PhStarDuotone class="w-5 h-5" />
                </Button>
                <Button v-tooltip.bottom="'Bookmark'" label="Bookmark" :severity="bookmarkBtnSeverity" text @click="bookmark" >
                    <PhBookmarkSimpleDuotone class="w-5 h-5" />
                </Button>
            </div>
        </template>
    </Card>
</template>

<style scoped>

</style>
