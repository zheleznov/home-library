<template>
  <div>
    <TheHeader/>
    <div class="app-body">
      <TheSidebar/>
      <main class="main">
        <TheBreadCrumbs/>
        <router-view></router-view>
      </main>
    </div>
    <footer class="app-footer">
      <div>
        <a href="#">Home Library </a>
        <span>&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span>Powered by </span>
        <a href="#">Roman Zhelieznov</a>
      </div>
    </footer>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader.vue';
import TheSidebar from '../components/TheSidebar.vue';
import TheBreadCrumbs from '../components/TheBreadCrumbs.vue';


export default {
  components: {
    TheHeader,
    TheSidebar,
    TheBreadCrumbs,
  },

  beforeCreate() {
    document.body.classList.remove('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
  html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .main,
  html:not([dir="rtl"]) .sidebar-lg-show.sidebar-fixed .app-footer {
    margin-left: 215px;
  }
</style>
