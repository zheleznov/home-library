<template>
  <div class="container">
    <div class="row justify-content-center" v-if="user">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <strong>User Profile</strong>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="name">User Name</label>
                  <input class="form-control" id="name" type="text" placeholder="Enter your name" :value="user.displayName">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input class="form-control" id="email" type="text" placeholder="Email" :value="user.email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="password">Password</label>
                  <input class="form-control" id="password" type="password" placeholder="Password">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-sm-12">
                <div class="form-group">
                  <label for="file">User Avatar</label>
                  <div class="custom-file">
                    <input type="file" class="custom-file-input" id="file">
                    <label class="custom-file-label" for="file">Choose file</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <button class="btn btn-sm btn-primary" type="submit" @click="updateUserProfile">
              <i class="fa fa-dot-circle-o"></i> Save</button>
            <button class="btn btn-sm btn-danger" type="reset" @click="cancel">
              <i class="fa fa-ban"></i> Cancel</button>
          </div>
        </div>
      </div>
    </div>
    <TheSpinner v-if="!user || isLoading"/>
    <TheModal v-if="modalData" :modalData="modalData" @modalClose="closeModal"/>
  </div>
</template>

<script>
/* eslint-disable no-trailing-spaces */
// TODO: cases with fail during update, what to do. to think
import TheSpinner from '../components/TheSpinner.vue';
import TheModal from '../components/TheModal.vue';

export default {
  name: 'UserAccount',

  components: {
    TheSpinner,
    TheModal,
  },

  data() {
    return {
      modalData: null,
      isUserDataUpdated: false,
      isLoading: false,
    };
  },

  computed: {
    user() {
      return this.$store.state.authUser;
    },
  },

  methods: {
    cancel() {
      this.$router.push({ name: 'home' });
    },

    async updateUserProfile() {
      const name = this.$el.querySelector('#name').value;
      const email = this.$el.querySelector('#email').value;
      const password = this.$el.querySelector('#password').value;
      const file = this.$el.querySelector('#file').files;

      this.isLoading = true;

      try {
        if (this.user.displayName !== name) {
          await this.$store.dispatch('updateUserName', name);
        }

        if (this.user.email !== email) {
          await this.$store.dispatch('updateUserEmail', email);
        }

        if (password !== '') {
          await this.$store.dispatch('updateUserPassword', password);
        }

        if (file.length) {
          await this.$store.dispatch('saveUserAvatar', file[0]);
        }

        this.modalData = {};
        this.modalData.title = 'Account has been updated';
        this.modalData.message = 'New user info was successfully saved. You will be redirected to main page';
        this.modalData.type = 'modal-success';
        this.isLoading = false;
        this.isUserDataUpdated = true;
      } catch (error) {
        this.modalData = {};
        this.modalData.title = error.code;
        this.modalData.message = error.message;
        this.modalData.type = 'modal-danger';
        console.log(error);
      }
    },

    closeModal() {
      if (this.isUserDataUpdated) {
        this.$router.push({ name: 'home' });
      }
      this.modalData = null;
    },
  },

  beforeCreate() {
    document.body.classList.add('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
  .btn-primary {
    margin-right: 15px;
  }
</style>
