import {defineStore} from "pinia";
import {computed, ref} from "vue";
import type Entry from "@/models/Entry";
import ApiService from "@/services/apiService";
import type PageableResponse from "@/models/PageableResponse";

export const useSearchStore = defineStore('searchStore', () => {
    const entries = ref<Entry[]>([])
    const pageable = ref<PageableResponse<Entry> | undefined>(undefined) // should this be propagated to the store or stay in the service layer?
    const noMoreEntries = computed(() => pageable.value?.links.next == null || pageable.value.links.next == '')
    const query = ref('')

    const getEntriesByQuery = (q: string) => {
        query.value = q
        entries.value = []
        ApiService.SearchAPI.getEntriesByQuery(q).then((response) => {
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


    const clearEntries = () => {
        entries.value = []
    }

    return {
        entries,
        getEntriesByQuery,
        loadMoreEntries,
        loadMoreEntriesBool,
        noMoreEntries,
        clearEntries,
    }
})
