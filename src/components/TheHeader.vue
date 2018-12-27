<template>
  <header class="app-header navbar">
    <button class="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="navbar-brand" :to="{name: 'home'}">
      <img class="navbar-brand-full" src="../assets/images/bookshelf.png" alt="Home Library">
      <span>Home Library</span>
    </router-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show" @click="toggleSidebar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <ul class="nav navbar-nav ml-auto">
      <li class="nav-item dropdown">
        <a v-if="user" class="nav-link nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false" @click="isUserMenuVisible = !isUserMenuVisible">
          <img class="img-avatar" :src="user.photoURL" :alt="user.displayName||'user'"> <!-- TODO: User avatar-->
        </a>
        <TheUserMenu v-if="isUserMenuVisible"/>
      </li>
    </ul>
  </header>
</template>

<script>
import TheUserMenu from '../components/TheUserMenu.vue';

export default {
  name: 'Header',

  components: {
    TheUserMenu,
  },

  data() {
    return {
      isUserMenuVisible: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.users.authUser;
    },
  },

  methods: {
    toggleSidebar() {
      document.body.classList.toggle('sidebar-lg-show');
    },
  },
};
</script>

<style scoped>
  .app-header .navbar-brand {
    width: 180px;
  }

  .navbar-brand-full {
    width: 32px;
    height: auto;
  }

  .navbar-brand span {
    margin-left: 15px;
  }

  .nav.navbar-nav {
    margin-right: 20px;
  }
</style>
