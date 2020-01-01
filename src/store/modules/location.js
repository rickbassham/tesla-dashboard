const state = {
  latitude: null,
  longitude: null,
};

const getters = {
  location: (state) => {
    return {
      latitude: state.latitude,
      longitude: state.longitude,
    };
  },
};

const mutations = {
  setLocation(state, { latitude, longitude }) {
    state.latitude = latitude;
    state.longitude = longitude;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}