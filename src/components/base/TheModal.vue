<template>
  <div class="modal fade" tabindex="-1" role="dialog" v-if="!isDestroy">
    <div class="modal-dialog modal-danger" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{title}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
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
    <div class="modal-backdrop fade show"></div>
  </div>
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

  data() {
    return {
      isDestroy: null,
    };
  },

  methods: {
    close() {
      this.$emit('modalClose');
    },
  },

  mounted() {
    this.isDestroy = null;
    this.$el.classList.add('show');
    this.$el.style.display = 'block';
  },
};
</script>

<style scoped>
  .modal-dialog {
    z-index: 10000;
  }
</style>
