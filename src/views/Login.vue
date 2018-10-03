<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group">
          <div class="card p-4">
            <div class="card-body">
              <h1>Login</h1>
              <p class="text-muted">Sign In to your account</p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    @
                  </span>
                </div>
                <input class="form-control" type="email" placeholder="Email" autocomplete="off" v-model="email">
              </div>
              <div class="input-group mb-4">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="icon-lock"></i>
                    </span>
                </div>
                <input class="form-control" type="password" placeholder="Password" autocomplete="off" v-model="password">
              </div>
              <div class="row">
                <div class="col-6">
                  <button class="btn btn-primary px-4" type="button" @click="loginClick">Login</button>
                </div>
                <div class="col-6 text-right">
                  <button class="btn btn-link px-0" type="button">Forgot password?</button>
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
  </div>
</template>

<script>
import firebase from 'firebase';
import errors from '@/enums/errors';

export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    loginClick() {
      this.$store.dispatch('login', { email: this.email, password: this.password }).catch(error => console.log(error));
    },
  },

  beforeCreate() {
    document.body.classList.add('flex-row', 'align-items-center');
  },
};
</script>

<style scoped>
</style>
