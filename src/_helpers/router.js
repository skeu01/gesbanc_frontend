import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage'
import LoginPage from '../login/LoginPage'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/home', component: HomePage },
    { path: '/login', component: LoginPage },

    // otherwise redirect to home
    { path: '*', redirect: '/login' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})