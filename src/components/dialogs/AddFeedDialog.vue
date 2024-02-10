<script lang="ts" setup>
import {useFeedStore} from "@/stores/useFeedStore";

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

// @ts-ignore
import PhWarningDuotone from '~icons/ph/warning-duotone'

import {ref} from "vue";

const feedStore = useFeedStore()
const feedUrl = ref("")

const invalidUrl = ref(false)
async function addFeed(feedUrl: string) {
    invalidUrl.value = false
    const validUrl = await feedStore.validateFeedUrl(feedUrl)
    if (validUrl) {
        feedStore.addFeed(feedUrl)
    } else {
        invalidUrl.value = true
        console.log("Invalid URL")
    }
}

function resetInvalidUrl() {
    if (invalidUrl.value) {
        invalidUrl.value = false
    }
}


</script>

<template>
    <div>
        <Dialog v-model:visible="feedStore.isAddFeedDialogOpen" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :style="{ width: '32rem' }" header="Add Feed" modal>

            <div class="card flex justify-center w-full">
                <div class="flex flex-col gap-2 w-full">
                    <label for="username">Enter the URL of the feed you want to add</label>
                    <InputText @update:model-value="resetInvalidUrl" id="username" v-model="feedUrl" aria-describedby="username-help"/>
                    <div v-if="invalidUrl" class="text-red-500 flex space-x-1 items-center">
                        <PhWarningDuotone class="h-5 w-5"/>
                        <span id="username-help">Invalid URL</span>
                    </div>

                </div>
            </div>

            <template #footer>
                <Button :disabled="invalidUrl" autofocus label="Submit" @click="addFeed(feedUrl)"/>
            </template>
        </Dialog>
    </div>
</template>

<style scoped>

</style>
