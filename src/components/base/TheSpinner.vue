<template>
  <div class="loader-container">
    <div class="loader">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'TheSpinner',
};
</script>

<style scoped>
  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.5);
  }

  .loader,
  .loader:after {
    border-radius: 50%;
    width: 10em;
    height: 10em;
  }
  .loader {
    font-size: 10px;
    position: fixed;
    text-indent: -9999em;
    border-top: 1.1em solid rgba(255, 255, 255, 0.2);
    border-right: 1.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
    border-left: 1.1em solid #ffffff;
    transform: translateZ(0);
    animation: load8 1.1s infinite linear;
    top: calc(50% - 5em);
    left: calc(50% - 5em);
  }
  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
