import Vue from "vue";
import VueRouter from "vue-router";
import Properties from '../views/Properties'
import PropertyDetail from '../views/PropertyDetail'
import NotFound from '../views/NotFound'
import Login from '../views/Login'
import Register from '../views/Register'
import RegisterProperty from '../views/RegisterProperty'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Properties,
    name: "properties",
  },
  {
    path: "/property/:id",
    component: PropertyDetail,
    name: "property_detail",
  },
  {
    path: "/property",
    component: RegisterProperty,
    name: "Create Property",
  },
  {
    path: "/edit-property/:id",
    component: RegisterProperty,
    name: "Edit Property",
  },
  {
    path: '/login',
    component: Login,
    name: "login",
  },
  {
    path: '/register',
    component: Register,
    name: "register",
  },
  {
    path: '*',
    component: NotFound,
    name: "404",
  }

];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
