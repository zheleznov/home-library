<template>
  <div class="dropdown-menu dropdown-menu-right show">
    <a class="dropdown-item" href="#">
      <i class="fa fa-user"></i> Profile
    </a>
    <a class="dropdown-item" href="#">
      <i class="fa fa-wrench"></i> Settings
    </a>
    <a class="dropdown-item" href="#" @click="logout">
      <i class="fa fa-lock"></i> Logout
    </a>
    <TheSpinner v-if="isLoading"/>
  </div>
</template>

<script>
import TheSpinner from '../components/TheSpinner.vue';

export default {
  name: 'TheUserMenu',

  components: {
    TheSpinner,
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    logout() {
      this.isLoading = true;
      this.$store.dispatch('logout')
        .then(() => {
          // this.$router.push({ name: 'login' });
        });
    },
  },
};
</script>

<style scoped>

</style>
