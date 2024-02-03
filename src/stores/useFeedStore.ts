import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {useAuthStore} from "@/stores/useAuthStore";
import {until} from "@vueuse/core";
import type Feed from "@/models/Feed";
import apiService from "@/services/apiService";

export const useFeedStore = defineStore('feedStore', () => {

    const feeds = ref<Feed[]>([])

    const isAddFeedDialogOpen = ref<boolean>(false)
    const selectedFeed = ref<Feed | null>(null)



    const getFeeds = () => {
        apiService.FeedAPI.getFeeds().then((response) => {
            feeds.value = response.data.content
        }).catch((error) => {
            feeds.value = []
        })
    }

    const setSelectedFeed = async (feedId: (string | null)) => {
        // wait until feeds are loaded
        await until(feeds).toMatch((value) => value.length > 0, {timeout: 10000})
        selectedFeed.value = feeds.value.filter((feed) => feed.uuid === feedId)[0]
    }

    const addFeed = (feedUrl: string) => {
        isAddFeedDialogOpen.value = false
        apiService.FeedAPI.addFeed(feedUrl).then((response) => {
            feeds.value.push(response.data)
            getFeeds()
        }).catch((error) => {})

    }

    const removeFeed = (feedId: string) => {
        apiService.FeedAPI.removeFeed(feedId).then(() => {
            feeds.value = feeds.value.filter((feed) => feed.uuid !== feedId)
            getFeeds()
        }).catch((error) => {})
    }

    return {
        feeds,
        selectedFeed,
        getFeeds,
        addFeed,
        removeFeed,
        setSelectedFeed,
        isAddFeedDialogOpen,
    }
})
