import Vue from 'vue';
import Router from 'vue-router';

import Welcome from './components/Welcome.vue'
import Guest from './components/model3/GuestInstructions.vue'
import ABRP from './components/ABRP.vue'
import Waze from './components/Waze.vue'
import Setup from './components/Setup.vue'
import PlugShare from './components/PlugShare.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        { path: '/', component: Welcome },
        { path: '/guest', component: Guest },
        { path: '/abrp', component: ABRP },
        { path: '/waze', component: Waze },
        { path: '/plugshare', component: PlugShare },
        { path: '/setup', component: Setup },
    ],
});
