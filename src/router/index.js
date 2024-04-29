import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import FileImport from '@/views/FileImport.vue'
import ManualInput from '@/views/ManualInput.vue'
import ScanQr from '@/views/ScanQr.vue'
import MapDisplay from '@/views/MapDisplay.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/import-file',
      name: 'fileImport',
      component: FileImport
    },
    {
      path: '/manual-input',
      name: 'manualInput',
      component: ManualInput
    },
    {
      path: '/scan-qr',
      name: 'scanQR',
      component: ScanQr
    },
    {
      path: '/map',
      name: 'map',
      component: MapDisplay
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
