const state = {
  vehicleName: 'the Model 3',
  selectedMap: 'wind_speed',
  darkMode: false,
};

const mutations = {
  setVehicleName(state, vehicleName) {
    state.vehicleName = vehicleName;
  },
  setSelectedMap(state, selectedMap) {
    state.selectedMap = selectedMap;
  },
  setDarkMode(state, darkMode) {
    state.darkMode = darkMode;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
