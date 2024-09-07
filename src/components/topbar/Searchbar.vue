<script setup lang="ts">
//@ts-ignore
import PhMagnifyingGlassDuotone from '~icons/ph/magnifying-glass-duotone'

import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import {ref} from "vue";
import {useRouter} from "vue-router";

const searchInput = ref('')
const router = useRouter()

function redirectToSearch() {
    console.log(searchInput.value)
    if (searchInput.value.length <= 0) return
    router.push({path: "/search", query: {query: searchInput.value}})
    // searchInput.value = ''
}

</script>

<template>
    <InputGroup unstyled iconPosition="left">
        <InputGroupAddon class="h-10">
            <PhMagnifyingGlassDuotone class="text-white"/>
        </InputGroupAddon>
        <InputText v-model="searchInput" @keyup.enter="redirectToSearch" class="h-10 text-white grow" placeholder="Search" />
    </InputGroup>
</template>

<style scoped>

</style>
