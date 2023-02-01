<template>
  <div class="justify-center">
    <section>
      <h3 class="title has-text-centered has-text-dark">User Login</h3>
      <div class="box">
        <b-field label="E-Mail">
          <b-input
            v-model="user.email"
            required
            type="email"
            placeholder="E-Mail"
          >
          </b-input>
        </b-field>

        <b-field label="Password">
          <b-input
            v-model="user.password"
            type="password"
            placeholder="Password"
            required
            password-reveal
          >
          </b-input>
        </b-field>
        <button class="button is-dark is-large is-fullwidth" @click="doLogin()">
          Login
        </button>
      </div>
      <div class="has-text-centered">
        <router-link to="/register">Signup!</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import AuthService from "../service/modules/auth";

export default {
  name: "login-user",
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.$root.isLoggedIn = false;
    localStorage.setItem("token", null);
  },
  methods: {
    async doLogin() {
      try {
        const resp = await AuthService.login(this.user);

        const {
          data: { user },
        } = resp;

        this.$root.isLoggedIn = true;

        localStorage.setItem("token", user.token);
        this.$router.push("/");
      } catch (error) {
        if (error?.response?.data) {
          this.$buefy.toast.open({
            message:
              error.response.data.message ||
              "Something went wrong. Please try again!",
            type: "is-danger",
          });
        }

        console.log(error);
      }
    },
  },
};
</script>
