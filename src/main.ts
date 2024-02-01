import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Tooltip from 'primevue/tooltip';
import ToastService  from "primevue/toastservice";
// @ts-ignore
import Lara from '@/presets/lara'; // https://github.com/primefaces/primevue-tailwind/issues/66

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara,
});
app.use(ToastService);
app.directive('tooltip', Tooltip);

app.mount('#app')
