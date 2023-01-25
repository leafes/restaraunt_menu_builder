import { createRouter, createWebHistory } from "vue-router";
import Editor from '../views/Editor.vue';
import Home from '../views/Home.vue';
import ViewMenu from '../views/ViewMenu.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  {
    path: '/menu',
    name: 'ViewMenu',
    component: ViewMenu
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;