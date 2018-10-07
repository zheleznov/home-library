<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body" v-if="!isForgetPassword">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    @
                  </span>
                </div>
                <input class="form-control" type="email" placeholder="Email" autocomplete="off" v-model="userInfo.email">
              </div>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-lock"></i>
                    </span>
                </div>
                <input class="form-control" type="password" placeholder="Password" autocomplete="off" v-model="userInfo.password">
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button" @click="loginClick">Login</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0" type="button" @click="isForgetPassword = !isForgetPassword">Forgot password?</button>
                </div>
              </div>
            </div>
            <div class="card-body" v-else>
              <h1>Forget password</h1>
              <p class="text-muted">Fill email to reset password</p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    @
                  </span>
                </div>
                <input class="form-control" type="email" placeholder="Email" autocomplete="off" v-model="userInfo.email">
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button" @click="resetPassword">Reset</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0" type="button" @click="isForgetPassword = !isForgetPassword">Back to login</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none">
            <div class="card-body text-center">
              <div>
                <h2>Sign up</h2>
                <p>Please register If you don't have an account. It's absolutely FREE.</p>
                <router-link :to="{name: 'registration'}" class="btn btn-primary active mt-3">Register Now!</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheModal v-if="modalData" :modalData="modalData" @modalClose="closeModal"/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import TheModal from '../components/base/TheModal.vue';

export default {
  name: 'Login',

  components: {
    TheModal,
  },

  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      modalData: null,
      isForgetPassword: false,
    };
  },

  methods: {
    loginClick() {
      this.$store.dispatch('login', this.userInfo)
        .catch((error) => {
          this.modalData = {};
          this.modalData.title = error.code;
          this.modalData.message = error.message;
          this.modalData.type = 'modal-danger';
        });
    },

    closeModal() {
      this.modalData = null;
    },

    resetPassword() {
      firebase.auth().sendPasswordResetEmail(this.userInfo.email).then(() => {
        // Email sent.
        this.modalData = {};
        this.modalData.title = 'Password reset';
        this.modalData.message = 'Email to recover your password was sent';
        this.modalData.type = 'modal-success';
      }).catch((error) => {
        // An error happened.
        this.modalData = {};
        this.modalData.title = error.code;
        this.modalData.message = error.message;
        this.modalData.type = 'modal-danger';
      });
    },
  },

  beforeCreate() {
    document.body.classList.add('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
</style>
