<template>
  <div id="app">
    <nav-bar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/shared/Navbar.vue';

export default {
  components: { 'nav-bar': Navbar },
  name: "App",
};
</script>

<style>
.justify-center {
  display: flex;
  justify-content: center;
}
</style>