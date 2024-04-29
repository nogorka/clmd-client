import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:catchAll(.*)',
      name: 'notFound',
      component: NotFound
    }
  ]
})

router.afterEach((to, from, failure) => {
  console.log(to, from, failure)
  if (failure) {
    router.push({ name: 'notFound' })
  }
})

export default router
