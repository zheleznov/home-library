<template>
  <nav class="breadcrumb">
    <router-link class="breadcrumb-item" :to="{name: 'home'}">Main</router-link>
    <a class="breadcrumb-item" href="#" @click.prevent v-if="breadCrumbs.section">{{ breadCrumbs.section | firstLetterCapitalize }}</a>
    <span class="breadcrumb-item active" v-if="breadCrumbs.name">{{ breadCrumbs.name | replaceLineToSpace | firstLetterCapitalize }}</span>

    <ThePagesFilter/>

  </nav>
</template>

<script>
// TODO:: path not users
import ThePagesFilter from './ThePagesFilter.vue';

export default {
  name: 'TheBreadCrumbs',

  components: {
    ThePagesFilter,
  },

  computed: {
    breadCrumbs() {
      return this.$store.state.users.pathInfo;
    },
  },
};
</script>

<style scoped>

</style>
