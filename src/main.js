import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import {
  BootstrapVue,
  BIconPlayFill,
  BIconStopFill,
  BIconFront,
  BIconX,
  BIconQuestionCircle,
  BOverlay
} from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./custom.scss";

Vue.config.productionTip = true;
Vue.use(BootstrapVue);
Vue.component("BIconPlayFill", BIconPlayFill);
Vue.component("BIconStopFill", BIconStopFill);
Vue.component("BIconFront", BIconFront);
Vue.component("BIconX", BIconX);
Vue.component("BIconQuestionCircle", BIconQuestionCircle);
Vue.component("b-overlay", BOverlay);

new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
