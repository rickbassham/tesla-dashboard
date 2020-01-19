import Vue from 'vue'
import App from './App.vue'
import VueMatomo from 'vue-matomo';
import vuetify from './plugins/vuetify';
import store from './store'

Vue.use(require('vue-moment'));
Vue.use(VueMatomo, {
  host: "https://analytics.rickbassham.com",
  siteId: 1,
  enableHeartBeatTimer: true,
});

Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: h => h(App),
}).$mount('#app')
