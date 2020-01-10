const state = {
  vehicleName: 'the Model 3',
  selectedMap: 'wind_speed',
  newABRP: true,
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
  setNewABRP(state, newABRP) {
    state.newABRP = newABRP;
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
