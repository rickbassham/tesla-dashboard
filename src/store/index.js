import Vue from 'vue'
import Vuex from 'vuex'
import location from './modules/location'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    location,
    settings,
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        const newState = Object.assign(state, JSON.parse(localStorage.getItem('store')));
        this.replaceState(
          newState
        );
      }
    }
  },
  strict: debug,
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

store.dispatch('location/startPollingLocation')

export default store;
