import { createRouter, createWebHistory } from "vue-router";
import Edit from '../views/Edit.vue';
import Home from '../views/Home.vue';
import Menu from '../views/Menu.vue';
import Create from '../views/Create.vue';
import Login from '../views/Login.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit',
    name: 'Editor',
    component: Edit
  },
  {
    path: '/menu',
    name: 'ViewMenu',
    component: Menu
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;