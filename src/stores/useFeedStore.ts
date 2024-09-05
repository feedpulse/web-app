import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
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
            console.log(error)
            feeds.value = []
        })
    }

    const setSelectedFeed = async (feedId: (string | null)) => {
        // wait until feeds are loaded
        await until(feeds).toMatch((value) => value.length > 0, {timeout: 10000})
        selectedFeed.value = feeds.value.filter((feed) => feed.uuid === feedId)[0]
    }

    const markFeedAsRead = (feedId: string) => {
        apiService.FeedAPI.markFeedAsRead(feedId).then(() => {
            getFeeds() // TODO: only update the feed that was marked as read
        }).catch((error) => {
            console.error(error)
        })
    }

    // TODO: implement updateFeed
    // const updateFeed = (feed: Feed) => {
    // }

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

    const validateFeedUrl = (feedUrl: string): Promise<boolean> => {
        return apiService.FeedAPI.validateFeedUrl(feedUrl).then(r => {
            console.log(r)
            return true
        }).catch(e => {
            console.log(e)
            return false
        })
    }

    return {
        feeds,
        selectedFeed,
        getFeeds,
        markFeedAsRead,
        addFeed,
        removeFeed,
        setSelectedFeed,
        isAddFeedDialogOpen,
        validateFeedUrl
    }
})
