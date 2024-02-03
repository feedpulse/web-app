<script lang="ts" setup>
import {useRouter} from "vue-router";

const props = defineProps({
    name: String,
    to: {
        type: String,
        default: "",
    },
    // url: String,
})
const router = useRouter()
const isCurrentRoute = () => {
    return router.currentRoute.value.path === props.to
}

</script>

<template>
    <RouterLink :to="to">
        <div :class="{'border-primary-500 border-2': isCurrentRoute()}"
             class="cursor-pointer bg-surface-700 hover:bg-surface-600 duration-150 text-white flex items-center text-center p-2 m-2 rounded-md space-x-2">
            <span>{{ name }}</span>
        </div>
    </RouterLink>
</template>

<style scoped>

</style>
