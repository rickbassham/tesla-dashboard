import Vue from 'vue'
import VueGtag from "vue-gtag";
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store'

Vue.use(require('vue-moment'));
Vue.use(VueGtag, {
  config: { id: "UA-156100161-1" }
});

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  render: h => h(App),
}).$mount('#app')
