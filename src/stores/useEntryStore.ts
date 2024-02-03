import {defineStore, storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/useAuthStore";
import {computed, ref} from "vue";
import {useFeedStore} from "@/stores/useFeedStore";
import type Entry from "@/models/Entry";
import type Feed from "@/models/Feed";
import ApiService from "@/services/apiService";
import type PageableResponse from "@/models/PageableResponse";

export const useEntryStore = defineStore('entryStore', () => {
    const feedStore = useFeedStore()
    const entries = ref<Entry[]>([])
    const pageable = ref<PageableResponse<Entry>|undefined>(undefined) // should this be propagated to the store or stay in the service layer?
    const noMoreEntries = computed(() => pageable.value?.links.next == null || pageable.value.links.next == '')

    const getEntriesForFeed = (feed: Feed) => {
        ApiService.FeedAPI.getFeedEntries(feed.uuid).then((response) => {
            entries.value = response.data.content
            pageable.value = response.data
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
            pageable.value = response.data
        }).catch(() => entries.value = [])
    }

    const loadMoreEntriesBool = ref(false)
    const loadMoreEntries = () => {
        if (entries.value.length === 0) return; // No entries to load
        if (loadMoreEntriesBool.value) return; // Already loading entries
        if (pageable.value?.links.next == null || pageable.value.links.next == '') return; // No more entries to load
        if (pageable.value.page >= pageable.value.totalPages) return; // No more entries to load
        loadMoreEntriesBool.value = true
        ApiService.EntryAPI.getEntriesByUrl(pageable.value?.links.next).then((response) => {
            console.log(response.data)
            console.log(pageable.value ?? "pageable is null")
            pageable.value = response.data
            console.log(pageable.value ?? "pageable is null")
            entries.value.push(...response.data.content)
        }).catch((error) => {
            console.log(error)
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
        loadMoreEntriesBool,
        noMoreEntries,
        markEntryAsRead,
        markEntryAsFav,
        markEntryAsBookmarked,
        getFavoriteEntries,
        getBookmarkedEntries,
    }
})
