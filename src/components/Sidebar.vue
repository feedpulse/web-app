<script lang="ts" setup>

import ContextMenu from 'primevue/contextmenu';

import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import SidebarFeedItem from "@/components/sidebar/SidebarFeedItem.vue";

import Divider from 'primevue/divider';

// @ts-ignore
import PhPlusCircleDuotone from '~icons/ph/plus-circle-duotone'
// @ts-ignore
import PhStarDuotone from '~icons/ph/star-duotone'
// @ts-ignore
import PhBookmarkSimpleDuotone from '~icons/ph/bookmark-simple-duotone'
// @ts-ignore
import PhNotebookDuotone from '~icons/ph/notebook-duotone'

import {useFeedStore} from "@/stores/useFeedStore"
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import AddFeedDialog from "@/components/dialogs/AddFeedDialog.vue";
import type Feed from "@/models/Feed";

const feedStore = useFeedStore()
onMounted(() => {
    feedStore.getFeeds()
})

const {feeds} = storeToRefs(feedStore)

function addFeed() {
    // open modal to add feed
    feedStore.isAddFeedDialogOpen = true
}

const rightClickedFeed = ref<Feed>();
const menu = ref();
const items = ref([
    {
        label: 'Remove',
        icon: 'pi pi-copy',
        command: ($event: any) => {
            feedStore.removeFeed(rightClickedFeed.value!.uuid)
        }
    },
]);

const onImageRightClick = (event: any, feed: Feed) => {
    rightClickedFeed.value = feed;
    menu.value.show(event);
};

</script>

<template>
    <div class="bg-surface-800 h-screen w-56 fixed">
        <aside class="flex flex-col h-screen">
            <div class="flex flex-col place-self-center">
                <h2 class="text-primary-500 font-semibold text-xl">Logo</h2>
            </div>
            <div class="pt-6">
                <SidebarMenuItem :icon="PhNotebookDuotone" label="All" to="/all"/>
                <SidebarMenuItem :icon="PhStarDuotone" label="Favourite" to="/favourites"/>
                <SidebarMenuItem :icon="PhBookmarkSimpleDuotone" label="Bookmarks" to="/bookmarks"/>
            </div>

            <div class="grow flex flex-col text-white justify-center m-2">
                <span>Feeds</span>
                <SidebarFeedItem v-for="feed in feeds" :key="feed.uuid" :name="feed.title" :to="`/feed/${feed.uuid}`"
                                 @contextmenu="onImageRightClick($event, feed)"/>
                <ContextMenu ref="menu" :model="items"/>
                <Divider/>
                <div class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-1.5 m-1 rounded-md space-x-2"
                     @click="addFeed">
                    <PhPlusCircleDuotone/>
                    <span>An Feed</span>
                    <AddFeedDialog/>
                </div>
            </div>
        </aside>
    </div>
</template>

<style scoped>

</style>
