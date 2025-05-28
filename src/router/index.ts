import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/components/common/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('@/views/Detail.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
      return savedPosition;
    } else{
      return { top: 0 }
    }
  }
});

export default router;
