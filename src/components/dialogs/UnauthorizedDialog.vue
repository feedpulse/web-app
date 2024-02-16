<script lang="ts" setup>

import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import {ref} from "vue";
import {useEventBus} from "@vueuse/core";

const visible = ref(false);
const unauthEventBus = useEventBus<boolean>('unauth')
unauthEventBus.on((e) => {
    if (e) {
        visible.value = true
    }
})

</script>

<template>
    <div class="card flex justify-center">
        <Dialog v-model:visible="visible" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }" :closable="false"
                :dismissable-mask="false" :style="{ width: '50rem' }" header="Header"
                modal>
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <span class="font-bold white-space-nowrap">Unauthorized</span>
                </div>
            </template>
            <p class="m-0">
                It seems like you are no longer authorized on our server. Please login again.
            </p>
            <template #footer>
                <RouterLink to="/login">
                    <Button class="mr-2" label="Login"/>
                </RouterLink>
            </template>
        </Dialog>
    </div>
</template>

<style scoped>

</style>
