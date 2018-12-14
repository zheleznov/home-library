import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Registration from './views/Registration.vue';
import Login from './views/Login.vue';
import PageNotFound from './views/PageNotFound.vue';
import UserProfile from './views/UserProfile.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: UserProfile,
  },
  {
    path: '*',
    name: 'page-not-found',
    component: PageNotFound,
  },
    /* {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( webpackChunkName: "about"  './views/About.vue'),
}, */
  ],
  mode: 'history',
});
