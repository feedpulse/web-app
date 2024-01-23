<script lang="ts" setup>
import {useFeedStore} from "@/stores/useFeedStore";

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';

import {computed, ref} from "vue";

const feedStore = useFeedStore()
const feedUrl = ref("")


</script>

<template>
    <div>
        <Dialog v-model:visible="feedStore.isAddFeedDialogOpen" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :style="{ width: '32rem' }" header="Add Feed" modal>
<!--            <template #header>-->
<!--                <div class="inline-flex items-center justify-center gap-2">-->
<!--                    <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle"/>-->
<!--                    <span class="font-bold white-space-nowrap">Amy Elsner</span>-->
<!--                </div>-->
<!--            </template>-->

                <div class="card flex justify-center w-full">
                    <div class="flex flex-col gap-2 w-full">
                        <label for="username">Enter the URL of the feed you want to add</label>
                        <InputText id="username" v-model="feedUrl" aria-describedby="username-help" />
                    </div>
                </div>

            <template #footer>
                <Button autofocus label="Submit" @click="feedStore.addFeed(feedUrl)"/>
            </template>
        </Dialog>
    </div>
</template>

<style scoped>

</style>
