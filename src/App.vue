<template>
  <router-view />
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.$store.commit('saveUser', user);
        sessionStorage.setItem('userId', user.uid);
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  },
};
</script>

<style>
@import url('https://coreui.io/demo/vendors/@coreui/icons/css/coreui-icons.min.css');
@import url('https://coreui.io/demo/vendors/flag-icon-css/css/flag-icon.min.css');
@import url('https://coreui.io/demo/vendors/font-awesome/css/font-awesome.min.css');
@import url('https://coreui.io/demo/vendors/simple-line-icons/css/simple-line-icons.css');
@import url('https://coreui.io/demo/vendors/pace-progress/css/pace.min.css');
@import url('./assets/styles/style.css');
</style>
