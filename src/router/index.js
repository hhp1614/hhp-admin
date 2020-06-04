import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import Dashboard from '../views/dashboard/Dashboard';
import User from '../views/user/User';
import Article from '../views/article/Article';
import Tag from '../views/tag/Tag';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home,
    redirect: '/dashboard',
    children: [
      { path: '/dashboard', component: Dashboard, meta: { title: '仪表盘', icon: 'mdi-view-dashboard' } },
      { path: '/user', component: User, meta: { title: '用户管理', icon: 'mdi-account-box-multiple' } },
      { path: '/article', component: Article, meta: { title: '标签管理', icon: 'mdi-tag-multiple' } },
      { path: '/tag', component: Tag, meta: { title: '文章管理', icon: 'mdi-text-box-multiple' } }
    ]
  },
  { path: '/login', component: Login }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login' && !localStorage.token) {
    next('/login');
  } else {
    next();
  }
});

export default router;
