import Vue from "vue";
import App from "./App.vue";
import store from './store/store';
import db from './database/db';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
}).$mount("#app");
