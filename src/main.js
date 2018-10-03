import Vue from 'vue';
import firebase from 'firebase';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyC9dI6DDUB0hF1iRXhwflYvk-8KnyRc_Ak',
  authDomain: 'home-library-e3cc8.firebaseapp.com',
  databaseURL: 'https://home-library-e3cc8.firebaseio.com',
  projectId: 'home-library-e3cc8',
  storageBucket: '',
  messagingSenderId: '255349747735',
};

firebase.initializeApp(config);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
