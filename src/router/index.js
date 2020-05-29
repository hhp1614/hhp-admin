import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
