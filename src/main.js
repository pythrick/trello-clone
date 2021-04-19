import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$http = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:8000`,
});

new Vue({
  router,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount("#app");
