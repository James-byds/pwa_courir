import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/parcours',
      name: 'Parcours',
      component: () => import('@/views/ParcoursView.vue'),
    },
    {
      path: '/training',
      name: 'Training',
      component: () => import('@/views/TrainingView.vue'),
    },
    {
      path: '/running',
      name: 'Running',
      component: () => import('@/views/RunningView.vue'),
    },
  ],
})

export default router
