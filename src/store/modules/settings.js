const state = {
  vehicleName: 'the Model 3',
  selectedMap: 'wind_speed',
  newABRP: true,
  darkMode: false,
  activeTab: 'home',
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
  setActiveTab(state, activeTab) {
    state.activeTab = activeTab;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
