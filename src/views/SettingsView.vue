<script lang="ts" setup>

import SettingsItem from "@/components/settings/SettingsItem.vue";
// @ts-ignore
import PhInfoDuotone from '~icons/ph/info-duotone'
// @ts-ignore
import PhUserCirclePlusDuotone from '~icons/ph/user-circle-plus-duotone'
</script>

<template>
    <div class="w-full flex justify-center">
        <div class="flex flex-row w-full 2xl:w-3/5 p-12  ">
            <div class="flex flex-col max-w-5xl min-w-max bg-body-light dark:bg-body-dark p-4 rounded-lg h-fit">
                <div class="flex flex-row justify-between mb-4">
                    <div class="flex flex-row gap-4">
                        <div class="flex flex-col duration-300">
                            <h1 class="text-2xl font-bold mb-2 dark:text-white duration-300">Settings</h1>
                            <p class="text-gray-500">Here you can change your settings</p>
                        </div>
                    </div>
                </div>

<!--                <SettingsItem :icon="PhInfoDuotone" label="Interface" to="/settings/interface"/>-->
<!--                <SettingsItem :icon="PhInfoDuotone" label="Integrations" to="/settings/integrations"/>-->
<!--                <SettingsItem :icon="PhInfoDuotone" label="Exceptions" to="/settings/exceptions"/>-->
                <SettingsItem :icon="PhInfoDuotone" label="Info" to="/settings/info"/>
                <SettingsItem :icon="PhUserCirclePlusDuotone" label="Account Requests" to="/settings/account-requests"/>
            </div>

            <RouterView class="grow ml-8 bg-body-light dark:bg-body-dark p-4 rounded-lg h-fit"/>
        </div>
    </div>
</template>

<style scoped>

</style>
