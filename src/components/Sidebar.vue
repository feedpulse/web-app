<script lang="ts" setup>

import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem.vue";
import SidebarFeedItem from "@/components/sidebar/SidebarFeedItem.vue";
import SidebarUserProfile from "@/components/sidebar/SidebarUserProfile.vue";

import Divider from 'primevue/divider';

// @ts-ignore
import PhGearDuotone from '~icons/ph/gear-duotone'
// @ts-ignore
import PhQuestionDuotone from '~icons/ph/question-duotone'
// @ts-ignore
import PhBuildingsDuotone from '~icons/ph/buildings-duotone'
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

const footerLinks = [{
    name: 'Settings',
    icon: PhGearDuotone
}, {
    name: 'Help',
    icon: PhQuestionDuotone
}, {
    name: 'About',
    icon: PhBuildingsDuotone
}
]

function addFeed() {
    // open modal to add feed
    feedStore.isAddFeedDialogOpen = true
}

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
                <SidebarFeedItem :to="`/feed/${feed.uuid}`" v-for="feed in feeds" :name="feed.title" :key="feed.uuid"/>
                <Divider />
                <div @click="addFeed" class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-1.5 m-1 rounded-md space-x-2">
                    <PhPlusCircleDuotone />
                    <span>An Feed</span>
                    <AddFeedDialog/>
                </div>
            </div>
            <div>
                <SidebarMenuItem v-for="foot in footerLinks" :icon="foot.icon" :label="foot.name"/>
                <SidebarUserProfile/>
            </div>
        </aside>
    </div>
</template>

<style scoped>

</style>
