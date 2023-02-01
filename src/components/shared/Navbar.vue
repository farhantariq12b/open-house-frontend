<template>
  <b-navbar>
    <template #brand>
      <router-link to="/">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </router-link>
    </template>
    <template #start v-if="$root.isLoggedIn">
      <router-link to="/">
        <b-navbar-item href="#"> Home </b-navbar-item>
      </router-link>
      <router-link to="/property">
        <b-navbar-item href="#"> Register Property </b-navbar-item>
      </router-link>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons" v-if="!$root.isLoggedIn">
          <router-link to="/register">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
          </router-link>
          <router-link to="/login">
            <a class="button is-light"> Log in </a>
          </router-link>
        </div>
        <div class="buttons" v-else>
          <router-link to="/login">
            <a class="button is-light"> Logged out</a>
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "nav-bar",
  data: () => ({
    isLoggedIn: false
  }),
  mounted() {
    this.isLoggedIn = localStorage.getItem('token');
  }
};
</script>
