import '@/styles/reset.css'
import '@/styles/index.scss'
import 'uno.css'

import { createApp } from 'vue'
import { setupStore } from './store'
import App from './App.vue'

import moduleName from '@/types/user';

function setupApp(){
    const app = createApp(App);
    setupStore(app)
    app.mount('#app');
}

setupApp()