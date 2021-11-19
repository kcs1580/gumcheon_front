import "babel-polyfill";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMoment from "vue-moment";
import i18n from "./i18n";

Vue.use(VueMoment);

Vue.config.productionTip = false;

window.App = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
