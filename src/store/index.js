import Vue from 'vue'
import Vuex from 'vuex'
import location from './modules/location'
import settings from './modules/settings'
import version from './modules/version'

const merge = require('deepmerge')

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    location,
    settings,
    version,
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem('store')) {
        // Replace the state object with the stored item
        const overwriteMerge = (_, sourceArray) => sourceArray;
        const newState = merge(
          state,
          JSON.parse(localStorage.getItem('store')),
          { arrayMerge: overwriteMerge }
        );
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
  const data = Object.assign({}, state);
  delete data.version; // don't save version to local storage
  localStorage.setItem('store', JSON.stringify(data));
});

store.dispatch('location/startPollingLocation')

export default store;
