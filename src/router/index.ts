import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Index.vue'),
      meta: {
        title: '数据平台'
      }
    }
  ]
})

export default router
