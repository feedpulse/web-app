<script lang="ts" setup>
import {useBackendGitMetaStore} from "@/stores/useBackendGitMetaStore";
import {sha, version, buildTime, name, commitAuthor} from "@/const/GitMetaProperties"
import {computed, ref} from "vue";
import {useDateFormat} from "@vueuse/shared";

const backendGitMetaStore = useBackendGitMetaStore()

const backendProps = ref({
    version: "",
    commitId: "",
    buildTime: ""
})

const fullstack = computed(() => [
    {
        stack: "Frontend",
        version: version,
        sha: sha,
        buildTime: useDateFormat(buildTime, 'YYYY-MM-DD HH:mm:ss').value,
    },
    {
        stack: "Backend",
        version: backendProps.value.version,
        sha: backendProps.value.commitId,
        buildTime: useDateFormat(backendProps.value.buildTime, 'YYYY-MM-DD HH:mm:ss').value,
    }
])


backendGitMetaStore.fetchPropertiesAsync().then((response) => {
    console.log("Fetched backend git meta properties")
    console.log(response?.version)
    backendProps.value.version = response?.version ?? ""
    console.log(backendProps.value)
    backendProps.value.commitId = response?.commitId ?? ""
    backendProps.value.buildTime = response?.buildTime ?? ""
    console.log("Fetched backend git meta properties")
})
</script>

<template>
    <div>
        <div v-for="stack in fullstack" class="mt-4">
            <h3 class="dark:text-white font-semibold mb-2">
                {{ stack.stack }}
            </h3>
            <div class="m-2">
                <div class="p-3 flex rounded-lg">
                    <p class="grow dark:text-white">Version</p>
                    <p class="dark:text-white">{{ stack.version }}</p>
                </div>
                <div class="p-3 flex rounded-lg">
                    <p class="grow dark:text-white">SHA</p>
                    <p class="dark:text-white">{{ stack.sha }}</p>
                </div>
                <div class="p-3 flex rounded-lg">
                    <p class="grow dark:text-white">Build Time</p>
                    <p class="dark:text-white">{{ stack.buildTime }}</p>
                </div>
            </div>
            <hr> <!-- dat ist dieser horizontale Strich-->
        </div>
    </div>
</template>

<style scoped>

</style>
