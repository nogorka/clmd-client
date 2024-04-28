import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'leaflet/dist/leaflet.css'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
