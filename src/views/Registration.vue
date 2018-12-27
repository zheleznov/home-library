<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mx-4">
          <div class="card-body p-4">
            <router-link :to="{name: 'login'}" class="back-login">Login</router-link>
            <h1>Register</h1>
            <p class="text-muted">Create your account</p>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="icon-user"></i>
                </span>
              </div>
              <input class="form-control" :class="{'is-invalid': $v.userInfo.displayName.$error}"
                     type="text" placeholder="Username" v-model="userInfo.displayName" @blur="$v.userInfo.displayName.$touch()">
              <TheInputError v-if="$v.userInfo.displayName.$error">
                <p v-show="!$v.userInfo.displayName.required">This field is required</p>
                <p v-show="!$v.userInfo.displayName.minLength">Field should have least 5 letters</p>
              </TheInputError>
            </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">@</span>
                </div>
                <input class="form-control" :class="{'is-invalid': $v.userInfo.email.$error}" type="text" placeholder="Email" v-model="userInfo.email" @blur="$v.userInfo.email.$touch()">
                <TheInputError v-if="$v.userInfo.email.$error">
                  <p v-show="!$v.userInfo.email.required">This field is required</p>
                  <p v-show="!$v.userInfo.email.email">Field should have email format</p>
                </TheInputError>
            </div>
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-lock"></i>
                    </span>
                  </div>
                  <input class="form-control" :class="{'is-invalid': $v.userInfo.password.$error}"
                         type="password" placeholder="Password" v-model="userInfo.password" @blur="$v.userInfo.password.$touch()">
                  <TheInputError v-if="$v.userInfo.password.$error">
                    <p v-show="!$v.userInfo.password.required">This field is required</p>
                    <p v-show="!$v.userInfo.password.minLength">Field should have at least 6 symbols</p>
                  </TheInputError>
            </div>
                  <div class="input-group mb-4">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <i class="icon-lock"></i>
                      </span>
                    </div>
                    <input class="form-control" :class="{'is-invalid': $v.userInfo.repeatPassword.$error}"
                           type="password" placeholder="Repeat password" v-model="userInfo.repeatPassword" @blur="$v.userInfo.repeatPassword.$touch()">
                    <TheInputError v-if="$v.userInfo.repeatPassword.$error">
                      <p v-show="!$v.userInfo.repeatPassword.sameAs">This field should be the same as password</p>
                    </TheInputError>
            </div>
                    <button class="btn btn-block btn-success"
                            type="button" :class="{'is-invalid': $v.userInfo.$invalid}" :disabled="$v.userInfo.$invalid" @click="createAccount">Create Account</button>
                  </div>
                  <!--<div class="card-footer p-4">
                    <div class="row">
                      <div class="col-6">
                        <button class="btn btn-block btn-facebook" type="button">
                          <span>facebook</span>
                        </button>
                      </div>
                      <div class="col-6">
                        <button class="btn btn-block btn-twitter" type="button">
                          <span>twitter</span>
                        </button>
                      </div>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
          <TheSpinner v-if="isLoading"/>
          <TheModal v-if="modalData" :modalData="modalData" @modalClose="modalClose"/>
          </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import TheInputError from '../components/TheInputError.vue';
import TheSpinner from '../components/TheSpinner.vue';
import TheModal from '../components/TheModal.vue';
import modalMessages from '../helpers/modalMessages';

// TODO: create and work users database with users info
// TODO: create registration via social networks

export default {
  name: 'Registration',

  components: {
    TheInputError,
    TheSpinner,
    TheModal,
  },

  data() {
    return {
      isLoading: false,
      modalData: null,
      userCreated: false,
      userInfo: {
        displayName: '',
        email: '',
        password: '',
        repeatPassword: '',
      },
    };
  },

  validations: {
    userInfo: {
      displayName: {
        required,
        minLength: minLength(5),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        sameAs: sameAs('password'),
      },
    },
  },

  methods: {
    ...mapActions({
      createUserAccount: 'users/createAccount',
    }),

    createAccount() {
      this.isLoading = true;

      this.createUserAccount(this.userInfo)
        .then((data) => {
          this.isLoading = false;
          this.modalData = modalMessages.completeRegistration;
          this.userCreated = true;
        })
        .catch((error) => {
          this.isLoading = false;
          this.modalData = modalMessages.getErrorMessage(error);
        });
    },

    modalClose() {
      this.modalData = null;
      if (this.userCreated) {
        this.$router.push({ name: 'home' });
      }
    },
  },

  beforeCreate() {
    document.body.classList.add('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
.back-login {
  float: right;
}

button[disabled="disabled"] {
  cursor: default;
}
</style>
