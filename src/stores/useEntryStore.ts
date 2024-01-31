import {defineStore, storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/useAuthStore";
import {ref} from "vue";
import {useFeedStore} from "@/stores/useFeedStore";
import type Entry from "@/models/Entry";
import type Feed from "@/models/Feed";
import ApiService from "@/services/apiService";

export const useEntryStore = defineStore('entryStore', () => {
    const authStore = useAuthStore()
    const {expiration} = storeToRefs(authStore)
    const feedStore = useFeedStore()
    const entries = ref<Entry[]>([])

    const getEntriesForFeed = (feed: Feed) => {
        ApiService.FeedAPI.getFeedEntries(feed.uuid).then((response) => {
            entries.value = response.data.content
        }).catch(() => entries.value = [])
    }

    const getEntriesForCurrentFeed = () => {
        if (feedStore.selectedFeed != null) {
            getEntriesForFeed(feedStore.selectedFeed)
        }
    }

    const getEntries = () => {
        ApiService.EntryAPI.getEntries().then((response) => {
            entries.value = response.data.content
        }).catch(() => entries.value = [])
    }

    const loadMoreEntriesBool = ref(false)
    const loadMoreEntries = () => {
        if (entries.value.length === 0) return; // No entries to load
        if (loadMoreEntriesBool.value) return; // Already loading entries
        loadMoreEntriesBool.value = true
        ApiService.EntryAPI.getEntries(50, entries.value.length).then((response) => {
            entries.value.push(...response.data.content)
        }).catch((error) => {
            entries.value = []
        }).finally(() => loadMoreEntriesBool.value = false)
    }

    const markEntryAsRead = (entry: Entry) => {
        ApiService.EntryAPI.updateEntry(
            entry.uuid,
            !entry.read ?? false,
            null,
            null)
            .then((response) => {
                console.log(response.data)
                ApiService.EntryAPI.getEntry(entry.uuid).then((response) => {
                    const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                    entries.value[index] = response.data
                });
            }).catch((error) => {

        })
    };

    const markEntryAsFav = (entry: Entry) => {
        ApiService.EntryAPI.updateEntry(
            entry.uuid,
            null,
            !entry.favorite ?? false,
            null)
            .then((response) => {
                console.log(response.data)
                ApiService.EntryAPI.getEntry(entry.uuid).then((response) => {
                    const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                    entries.value[index] = response.data
                });
            }).catch((error) => {})
    };

    const markEntryAsBookmarked = (entry: Entry) => {
        ApiService.EntryAPI.updateEntry(
            entry.uuid,
            null,
            null,
            !entry.bookmark ?? false)
            .then((response) => {
                console.log(response.data)
                ApiService.EntryAPI.getEntry(entry.uuid).then((response) => {
                    const index = entries.value.findIndex((e) => e.uuid === entry.uuid)
                    entries.value[index] = response.data
                });
            }).catch((error) => {})
    };

    const getFavoriteEntries = () => {
        ApiService.EntryAPI.getFavoriteEntries().then((response) => {
            entries.value = response.data.content
        }).catch((error) => {
            entries.value = []
        })
    }

    const getBookmarkedEntries = () => {
        ApiService.EntryAPI.getBookmarkedEntries().then((response) => {
            entries.value = response.data.content
        }).catch((error) => {
            entries.value = []
        })
    }

    return {
        entries,
        getEntries,
        getEntriesForFeed,
        getEntriesForCurrentFeed,
        loadMoreEntries,
        markEntryAsRead,
        markEntryAsFav,
        markEntryAsBookmarked,
        getFavoriteEntries,
        getBookmarkedEntries,
    }
})
