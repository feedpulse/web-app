<script lang="ts" setup>
// @ts-ignore
import PhListDashesDuotone from '~icons/ph/list-dashes-duotone'
// @ts-ignore
import PhGridFourDuotone from '~icons/ph/grid-four-duotone'
import {usePreferenceStore} from "@/stores/usePreferenceStore";
import {storeToRefs} from "pinia";
import EntryView from "@/models/enums/EntryView";

const preferenceStore = usePreferenceStore()
const {entryView} = storeToRefs(preferenceStore)

function setEntryView(view: EntryView) {
    if (view == entryView.value) return
    preferenceStore.setEntryView(view)
}

</script>

<template>
    <div>
        <div class="flex gap-2 text-white ">
            <PhListDashesDuotone :class="{'bg-gray-700':entryView == EntryView.LIST}"
                                 class="h-10 w-10 p-2 cursor-pointer rounded-lg my-2 hover:bg-gray-700"
                                 @click="setEntryView(EntryView.LIST)"/>
            <PhGridFourDuotone :class="{'bg-gray-700':entryView == EntryView.CARD}"
                               class="h-10 w-10 p-2 cursor-pointer rounded-lg my-2 hover:bg-gray-700"
                               @click="setEntryView(EntryView.CARD)"/>
        </div>
    </div>

</template>

<style scoped>

</style>
