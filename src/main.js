import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data: () => ({
    isLoggedIn: false
  }),
  mounted() {
    this.isLoggedIn = localStorage.getItem('token') !== 'null';
  },
  router
}).$mount('#app')
