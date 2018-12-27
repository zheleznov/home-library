import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Registration from './views/Registration.vue';
import Login from './views/Login.vue';
import PageNotFound from './views/PageNotFound.vue';
import UserProfile from './views/UserProfile.vue';
import BookEditor from './components/TheBookEditor.vue';
import AllBooks from './components/TheAllBooks.vue';

import store from './store';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home,
    children: [
      { path: 'library/add-book', name: 'add-book', component: BookEditor },
      { path: 'library/all-books', name: 'all-books', component: AllBooks },
      { path: 'library/book-details/:id', name: 'book-details', props: { id: true }, component: BookEditor },
    ],
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
  linkExactActiveClass: 'active',
});

router.afterEach((to) => {
  store.commit('users/savePathInfo', to.path);
});

export default router;
