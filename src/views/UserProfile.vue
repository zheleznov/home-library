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
            <button class="btn btn-primary" type="submit" @click="updateUserProfile">
              <i class="fa fa-dot-circle-o"></i> Save</button>
            <button class="btn btn-danger" type="reset" @click="cancel">
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
import { mapActions } from 'vuex';
import TheSpinner from '../components/TheSpinner.vue';
import TheModal from '../components/TheModal.vue';
import modalMessages from '../helpers/modalMessages';


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
      return this.$store.state.users.authUser;
    },
  },

  methods: {
    ...mapActions({
      updateUserName: 'users/updateUserName',
      updateUserEmail: 'users/updateUserEmail',
      updateUserPassword: 'users/updateUserPassword',
      saveUserAvatar: 'users/saveUserAvatar',
    }),

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
          await this.updateUserName(name);
        }

        if (this.user.email !== email) {
          await this.updateUserEmail(email);
        }

        if (password !== '') {
          await this.updateUserPassword(password);
        }

        if (file.length) {
          await this.updateUserAvatar(file[0]);
        }

        this.modalData = modalMessages.accountUpdated;
        this.isLoading = false;
        this.isUserDataUpdated = true;
      } catch (error) {
        this.modalData = modalMessages.getErrorMessage(error);
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
