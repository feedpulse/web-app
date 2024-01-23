import {defineStore, storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/useAuthStore";
import {ref} from "vue";
import {useFeedStore} from "@/stores/useFeedStore";
import {FeedAPI} from "@/api/FeedAPI";
import {EntryAPI} from "@/api/EntryAPI";
import {useUnauthorizedErrorStore} from "@/stores/useUnauthorizedErrorStore";
import type Entry from "@/models/Entry";

export const useEntryStore = defineStore('entryStore', () => {
    const authStore = useAuthStore()
    const {tokenString, expiration} = storeToRefs(authStore)
    const feedStore = useFeedStore()
    const unauthStore = useUnauthorizedErrorStore()
    const entries = ref<Entry[]>([])

    const getEntriesForFeed = (feed: Feed) => {
        console.log("Getting entries")
        if (expiration.value < 0 || tokenString.value == null) {
            entries.value = []
            return
        }
        FeedAPI.getFeedEntries(tokenString.value, feed.uuid).then((response) => {
            entries.value = response.data
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
            entries.value = []
        })
    }

    const getEntriesForCurrentFeed = () => {
        if (feedStore.selectedFeed != null) {
            getEntriesForFeed(feedStore.selectedFeed)
        }
    }

    const getEntries = () => {
        if (expiration.value < 0 || tokenString.value == null) {
            entries.value = []
            return
        }
        EntryAPI.getEntries(tokenString.value).then((response) => {
            entries.value = response.data
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
            entries.value = []
        })
    }

    const markEntryAsRead = (entry: Entry) => {
        EntryAPI.updateEntry(
            tokenString.value!,
            entry.uuid,
            !entry.read ?? false,
            null,
            null)
        .then((response) => {
            console.log(response.data)
            EntryAPI.getEntry(tokenString.value!, entry.uuid).then((response) => {
                const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                entries.value[index] = response.data
            });
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
        })
    };

    const markEntryAsFav = (entry: Entry) => {
        EntryAPI.updateEntry(
            tokenString.value!,
            entry.uuid,
            null,
            !entry.favorite ?? false,
            null)
        .then((response) => {
            console.log(response.data)
            EntryAPI.getEntry(tokenString.value!, entry.uuid).then((response) => {
                const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                entries.value[index] = response.data
            });
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
        })
    };

    const markEntryAsBookmarked = (entry: Entry) => {
        EntryAPI.updateEntry(
            tokenString.value!,
            entry.uuid,
            null,
            null,
            !entry.bookmark ?? false)
        .then((response) => {
            console.log(response.data)
            EntryAPI.getEntry(tokenString.value!, entry.uuid).then((response) => {
                const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                entries.value[index] = response.data
            });
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
        })
    };

    const getFavoriteEntries = () => {
        if (expiration.value < 0 || tokenString.value == null) {
            entries.value = []
            return
        }
        EntryAPI.getFavoriteEntries(tokenString.value).then((response) => {
            entries.value = response.data
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
            entries.value = []
        })
    }

    const getBookmarkedEntries = () => {
        if (expiration.value < 0 || tokenString.value == null) {
            entries.value = []
            return
        }
        EntryAPI.getBookmarkedEntries(tokenString.value).then((response) => {
            entries.value = response.data
        }).catch((error) => {
            unauthStore.checkIfUnauthorizedError(error)
            console.error(error)
            entries.value = []
        })
    }

    return {
        entries,
        getEntries,
        getEntriesForFeed,
        getEntriesForCurrentFeed,
        markEntryAsRead,
        markEntryAsFav,
        markEntryAsBookmarked,
        getFavoriteEntries,
        getBookmarkedEntries,
    }
})
