import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import FileImport from '@/views/FileImport.vue'
import ManualInput from '@/views/ManualInput.vue'
import ScanQr from '@/views/ScanQr.vue'

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
      name: 'FileImport',
      component: FileImport
    },
    {
      path: '/manual-input',
      name: 'ManualInput',
      component: ManualInput
    },
    {
      path: '/scan-qr',
      name: 'ScanQR',
      component: ScanQr
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
