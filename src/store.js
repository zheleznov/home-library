import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    authUser: null,
  },
  mutations: {
    saveUser(state, user) {
      state.authUser = user;
    },

  },
  actions: {
    login(context, userInfo) {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .signInWithEmailAndPassword(userInfo.email, userInfo.password)
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
