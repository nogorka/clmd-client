import '@/assets/main.css'

import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index.js'

import 'leaflet.fullscreen/Control.FullScreen.css';
import 'leaflet/dist/leaflet.css'
import 'primeicons/primeicons.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus)

app.mount('#app')
