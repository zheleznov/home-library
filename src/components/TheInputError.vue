<template>
  <div class="popover fade bs-popover-right show" role="tooltip">
    <div class="arrow"></div>
    <h3 class="popover-header"></h3>
    <div class="popover-body"><slot></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TheInputError',

  mounted() {
    this.setPosition();
  },

  updated() {
    this.setPosition();
  },

  methods: {
    setPosition() {
      const parent = this.$el.parentNode;
      const parentHeight = parent.offsetHeight / 2;
      const elementWidth = this.$el.offsetWidth + 8;

      this.$el.style.cssText = `right: ${-elementWidth}px`;
      this.$el.querySelector('.arrow').style.cssText = `top: ${parentHeight}px`;
    },
  },
};
</script>

<style scoped>
  .popover {
    left: unset;
    right: 0;
  }

  .arrow {
    margin-top: -8px;
  }

  .popover-body p {
    margin: 0;
  }
</style>
