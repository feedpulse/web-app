import {fileURLToPath, URL} from 'node:url'


import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import Info from 'unplugin-info/vite';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Icons({compiler: 'vue3'}),
        Info(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
