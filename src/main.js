import Vue from 'vue';
import vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

import filters from './helpers/filters';

Vue.config.productionTip = false;

Vue.use(vuelidate);

Object.keys(filters).forEach(name => Vue.filter(name, filters[name]));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
