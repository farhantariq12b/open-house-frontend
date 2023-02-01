<template>
  <div class="justify-center">
    <section>
      <h3 class="title has-text-centered has-text-dark">User Login</h3>
      <div class="box">
        <b-field label="name">
          <b-input v-model="user.name" required placeholder="user name">
          </b-input>
        </b-field>

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

        <b-field>
          <b-checkbox v-model="user.isAdmin">
            Is Admin?
          </b-checkbox>
        </b-field>
        
        <button class="button is-dark is-large is-fullwidth" @click="registerUser()">
          Signup
        </button>
      </div>
      <div class="has-text-centered">
        <router-link to="/login">Login!</router-link>
      </div>
    </section>
  </div>
</template>

<script>
import AuthService from "@/service/modules/auth";

export default {
  name: "login-1",
  data() {
    return {
      user: {},
    };
  },
  methods: {
    async registerUser() {
      try {
        const resp = await AuthService.signUp(this.user);

        const {
          data: { user },
        } = resp;

        localStorage.setItem("token", user.token);
        this.$root.isLoggedIn = true;
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
