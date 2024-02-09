<script lang="ts" setup>

import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';

// @ts-ignore
import PhGearDuotone from '~icons/ph/gear-duotone'
// @ts-ignore
import PhCircleWavyQuestionDuotone from '~icons/ph/circle-wavy-question-duotone'
// @ts-ignore
import PhSignOutDuotone from '~icons/ph/sign-out-duotone'
// @ts-ignore
import PhBuildingsDuotone from '~icons/ph/buildings-duotone'


import {ref} from "vue";
import {useUserStore} from "@/stores/useUserStore";

const userStore = useUserStore();

const menu = ref();
const items = ref([
    {
        label: 'Settings',
        icon: PhGearDuotone,
        url: '/settings'
    },
    {
        label: 'Help',
        icon: PhCircleWavyQuestionDuotone,
        url: '/help'
    },
    {
        label: 'About',
        icon: PhBuildingsDuotone,
        url: '/about'
    },
    {
        label: 'Logout',
        icon: PhSignOutDuotone,
        url: '/logout'
    },

]);

const toggle = (event: any) => {
    console.log("Toggling menu")
    menu.value.toggle(event);
};

</script>

<template>
    <div class="h-16 flex justify-end items-center mx-4">
        <Avatar aria-controls="overlay_menu" aria-haspopup="true" class="hover:cursor-pointer !bg-primary-500 text-white" :label="userStore.initials" shape="circle"
                size="large"
                type="button" @click="toggle"/>
        <Menu id="overlay_menu" ref="menu" :model="items" :popup="true">
            <template #start>
                <RouterLink to="/profile"
                        class="relative text-start overflow-hidden w-full p-link flex items-center p-2 pl-3 text-surface-700 dark:text-surface-0/80 hover:bg-surface-200 dark:hover:bg-surface-600 rounded-none">
                    <Avatar class="mr-2 !bg-primary-500 text-white" :label="userStore.initials"
                            shape="circle"/>
                    <span class="inline-flex flex-col justify-start">
                <span class="font-bold">{{userStore.user?.email}}</span>
                <span class="text-sm" v-for="(role, index) in userStore.roles" :key="index">{{ role }}</span>
                    </span>
                </RouterLink>
            </template>
            <template #item="{ item, props }">
                <RouterLink :to="item.url" class="flex items-center !py-2" v-bind="props.action">
                    <component :is="item.icon" class="inline-block"/>
                    <span class="ml-2">{{ item.label }}</span>
                </RouterLink>
            </template>
        </Menu>
    </div>

</template>

<style scoped>

</style>
