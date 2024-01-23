<script lang="ts" setup>
const props = defineProps({
    label: String,
    to: {
        type: String,
        default: "",
        required: false
    },
    icon: Object
})
</script>

<template>
    <div>
        <div v-if="to !== ''">
            <RouterLink :to="to" is="div" class="nav-link">
                <div
                    class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-2 m-2 rounded-md space-x-2">
                    <component :is="icon" class="inline-block"/>
                    <span>{{ label }}</span>
                </div>
            </RouterLink>
        </div>
        <div v-else>
            <div
                class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-2 m-2 rounded-md space-x-2">
                <component :is="icon" class="inline-block"/>
                <span>{{ label }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
