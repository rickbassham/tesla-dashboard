const state = {
  vehicleName: 'the Model 3',
  selectedMap: 'wind_speed',
  newABRP: true,
  darkMode: false,
  activeTab: 'home',
  rssFeed: 'http://feeds.bbci.co.uk/news/world/rss.xml'
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
  },
  setRSSFeed(state, rssFeed) {
    state.rssFeed = rssFeed;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
}
