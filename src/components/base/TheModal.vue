<template>
  <transition name="modal-fade">
    <div class="modal fade" tabindex="-1" role="dialog">
      <div class="modal-dialog" :class="type ? type : ''" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" @click="close">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{message}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="close">Close</button>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show" @click="close"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheModal',

  props: {
    title: {
      required: true,
      type: String,
    },
    message: {
      required: true,
      type: String,
    },
    type: {
      type: String,
    },
  },

  methods: {
    close() {
      this.$emit('modalClose');
    },
  },

  mounted() {
    this.$el.classList.add('show');
    this.$el.style.display = 'block';
  },
};
</script>

<style scoped>
  .modal-dialog {
    z-index: 10000;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal.show .modal-dialog {
    transform: translate(0, 50%);
  }
</style>
