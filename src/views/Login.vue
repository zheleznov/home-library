<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group">
          <div class="card p-4">

            <!--LOGIN SECTION-->
            <div class="card-body" v-if="!isForgetPassword">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    @
                  </span>
                </div>
                <input class="form-control" :class="{'is-invalid': $v.userInfo.email.$error}"
                       type="email" placeholder="Email" autocomplete="off" v-model="userInfo.email" @blur="$v.userInfo.email.$touch()">
                <TheInputError v-if="$v.userInfo.email.$error">
                  <p v-show="!$v.userInfo.email.required">This field is required</p>
                  <p v-show="!$v.userInfo.email.email">Field should have email format</p>
                </TheInputError>
              </div>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-lock"></i>
                    </span>
                </div>
                <input class="form-control" :class="{'is-invalid': $v.userInfo.password.$error}"
                       type="password" placeholder="Password" autocomplete="off" @blur="$v.userInfo.password.$touch()" v-model="userInfo.password">
                <TheInputError v-if="$v.userInfo.password.$error">
                  <p v-show="!$v.userInfo.password.required">This field is required</p>
                  <p v-show="!$v.userInfo.password.minLength">Field should have at least 6 symbols</p>
                </TheInputError>
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button" :disabled="$v.userInfo.$invalid" @click="loginClick">Login</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0 forget-password" type="button" @click="isForgetPassword = !isForgetPassword">Forgot password?</button>
                </div>
              </div>
            </div>

            <!--FORGET PASSWORD SECTION-->
            <div class="card-body forget-password-section" v-else>
              <h1>Forget password</h1>
              <p class="text-muted">Fill email to reset password</p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    @
                  </span>
                </div>
                <input class="form-control" :class="{'is-invalid': $v.userInfo.email.$error}"
                       type="email" placeholder="Email" autocomplete="off" v-model="userInfo.email" @blur="$v.userInfo.email.$touch()">
                <TheInputError v-if="$v.userInfo.email.$error">
                  <p v-show="!$v.userInfo.email.required">This field is required</p>
                  <p v-show="!$v.userInfo.email.email">Field should have email format</p>
                </TheInputError>
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4 reset-button" type="button" @click="resetPassword" :disabled="$v.userInfo.email.$invalid">Reset</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0" type="button" @click="isForgetPassword = !isForgetPassword">Login</button>
                </div>
              </div>
            </div>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none">
            <div class="card-body text-center">
              <div>
                <h2>Sign up</h2>
                <p>Please register If you don't have an account. It's absolutely FREE.</p>
                <router-link :to="{name: 'registration'}" class="btn btn-primary active mt-3 register-button">Register Now!</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheModal v-if="modalData" :modalData="modalData" @modalClose="closeModal"/>
    <TheSpinner v-if="isLoading"/>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import { required, email, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import TheModal from '../components/TheModal.vue';
import TheInputError from '../components/TheInputError.vue';
import TheSpinner from '../components/TheSpinner.vue';
import modalMessages from '../helpers/modalMessages';


export default {
  name: 'Login',

  components: {
    TheModal,
    TheInputError,
    TheSpinner,
  },

  data() {
    return {
      userInfo: {
        email: '',
        password: '',
      },
      modalData: null,
      isForgetPassword: false,
      isLoading: false,
    };
  },

  validations: {
    userInfo: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },

  methods: {
    ...mapActions('users', [
      'login',
    ]),

    loginClick() {
      this.isLoading = true;
      this.login(this.userInfo)
        .then((uid) => {
          this.isLoading = false;
          sessionStorage.setItem('uid', uid);
          this.$router.push({ name: 'home' });
        })
        .catch((error) => {
          this.isLoading = false;
          this.modalData = modalMessages.getErrorMessage(error);
        });
    },

    closeModal() {
      this.modalData = null;
    },

    resetPassword() {
      this.isLoading = true;
      firebase.auth().sendPasswordResetEmail(this.userInfo.email).then(() => {
        // Email sent.
        this.isLoading = false;
        this.modalData = modalMessages.passwordReset;
      }).catch((error) => {
        // An error happened.
        this.isLoading = false;
        this.modalData = modalMessages.getErrorMessage(error);
      });
    },
  },

  beforeCreate() {
    document.body.classList.add('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
  button[disabled="disabled"] {
    cursor: default;
  }
</style>
