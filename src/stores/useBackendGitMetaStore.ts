import {defineStore} from "pinia";
import {ref} from "vue";
import ApiService from "@/services/apiService";
import type BackendGitMetaProperties from "@/models/BackendGitMetaProperties";

export const useBackendGitMetaStore = defineStore('backendGitMetaStore', () => {
    const properties = ref<BackendGitMetaProperties | null>(null);

    const fetchProperties = () => {
        ApiService.BackendGitMetaAPI.getProperties().then((response) => {
            properties.value = response.data;
        }).catch((error) => {
            properties.value = null;
            console.log(error)
        });
    }

    const fetchPropertiesAsync = async() => {
        try {
            const response = await ApiService.BackendGitMetaAPI.getProperties();
            properties.value = response.data;
            return response.data;
        } catch (error) {
            properties.value = null;
            console.log(error)
            return null;
        }
    }

    const getProperties = () => {
        if (!properties.value) {
            fetchProperties();
        } else {
            return properties.value;
        }
    };

    return {
        fetchProperties,
        fetchPropertiesAsync,
        getProperties
    }
})
