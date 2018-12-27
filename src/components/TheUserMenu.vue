<template>
  <div class="dropdown-menu dropdown-menu-right show">
    <router-link class="dropdown-item" title="User Profile" :to="{name: 'user-profile'}">
      <i class="fa fa-user"></i> Profile
    </router-link>
    <!-- <router-link class="dropdown-item" title="User Profile" :to="{name: 'user-profile'}">
      <i class="fa fa-wrench"></i> Settings
    </router-link> -->
    <a class="dropdown-item" href="#" @click="logout" title="Logout from Home Library">
      <i class="icon-logout icons"></i> Logout
    </a>
    <TheSpinner v-if="isLoading"/>
  </div>
</template>

<script>
// TODO: settings
import TheSpinner from '../components/TheSpinner.vue';

export default {
  name: 'TheUserMenu',

  components: {
    TheSpinner,
  },

  data() {
    return {
      isLoading: false,
      userId: sessionStorage.getItem('userId'),
    };
  },

  methods: {
    logout() {
      this.$store.dispatch('users/logout')
        .then(() => {
          sessionStorage.removeItem('uid');
          this.$router.push({ name: 'login' });
        });
    },
  },
};
</script>

<style scoped>

</style>
