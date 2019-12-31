import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'

import VueGeolocation from 'vue-browser-geolocation';

Vue.use(VueGeolocation);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
