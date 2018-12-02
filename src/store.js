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

    removeUser(state) {
      state.authUser = null;
    },
  },

  actions: {
    login(context, userInfo) {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .signInWithEmailAndPassword(userInfo.email, userInfo.password)
          .then((userData) => {
            resolve(userData);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    logout() {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .signOut()
          .then((data) => {
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    createAccount(context, userInfo) {
      return new Promise((resolve, reject) => {
        firebase.auth()
          .createUserWithEmailAndPassword(userInfo.email, userInfo.password)
          .then((userData) => {
            resolve(userData);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
