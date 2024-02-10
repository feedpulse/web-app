import {defineStore} from "pinia";
import EntryView from "@/models/enums/EntryView";
import {useStorage} from "@vueuse/core";


export const usePreferenceStore = defineStore('preferenceStore', () => {
    const entryView = useStorage('entryView', EntryView.LIST)

    const setEntryView = (view: EntryView) => {
        entryView.value = view
    }

    return {
        entryView,
        setEntryView
    }

})
