<template>
  <router-view />
</template>

<script>
export default {
  beforeCreate() {
    if (!sessionStorage.getItem('uid') && this.$route.name !== 'login') {
      this.$router.push({ name: 'login' });
    }

    this.$store.dispatch('onAuthStateChanged')
      .then((uid) => {
        sessionStorage.setItem('uid', uid);
      })
      .catch(() => {
        sessionStorage.removeItem('uid');
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
