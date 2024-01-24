import {defineStore, storeToRefs} from "pinia";
import {ref} from "vue";
import {FeedAPI} from "@/api/FeedAPI";
import {useAuthStore} from "@/stores/useAuthStore";
import {useUnauthorizedErrorStore} from "@/stores/useUnauthorizedErrorStore";
import {until} from "@vueuse/core";
import type Feed from "@/models/Feed";

export const useFeedStore = defineStore('feedStore', () => {
    const authStore = useAuthStore()
    const {tokenString, expiration} = storeToRefs(authStore)

    const feeds = ref<Feed[]>([])

    const isAddFeedDialogOpen = ref<boolean>(false)
    const selectedFeed = ref<Feed | null>(null)

    const unauthStore = useUnauthorizedErrorStore()


    const getFeeds = () => {
        if (expiration.value < 0) return
        FeedAPI.getFeeds(tokenString.value!).then((response) => {
            feeds.value = response.data
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
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
        if (expiration.value < 0) return
        FeedAPI.addFeed(tokenString.value!, feedUrl).then((response) => {
            feeds.value.push(response.data)
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
        }).finally(() => {
            getFeeds()
        })
    }

    return {
        feeds,
        selectedFeed,
        getFeeds,
        addFeed,
        setSelectedFeed,
        isAddFeedDialogOpen,
    }
})
