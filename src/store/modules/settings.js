const arrayMove = require('array-move');

const state = {
  vehicleName: 'the Model 3',
  selectedMap: 'wind_speed',
  darkMode: false,
  activeTab: 'home',
  showGuestInstructions: true,
  pages: [{
    link: "https://abetterrouteplanner.com/",
    title: "ABRP",
    icon: "mdi-map",
    enabled: true,
  },{
    link: "https://www.plugshare.com/",
    title: "PlugShare",
    icon: "mdi-power-plug",
    enabled: true,
  },{
    link: "https://teslawaze.azurewebsites.net/",
    title: "Waze",
    icon: "mdi-map",
    enabled: false,
  }],
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
  setShowGuestInstructions(state, showGuestInstructions) {
    state.showGuestInstructions = showGuestInstructions;
  },
  setActiveTab(state, activeTab) {
    state.activeTab = activeTab;
  },
  setPageEnabled(state, {index, enabled}) {
    state.pages[index].enabled = enabled;
  },
  setPageTitle(state, {index, title}) {
    state.pages[index].title = title;
  },
  setPageLink(state, {index, link}) {
    state.pages[index].link = link;
  },
  setPageIcon(state, {index, icon}) {
    state.pages[index].icon = icon;
  },
  movePageUp(state, {index}) {
    state.pages = arrayMove(state.pages, index, index-1);
  },
  movePageDown(state, {index}) {
    state.pages = arrayMove(state.pages, index, index+1);
  },
  addPage(state) {
    state.pages.push({link: "http://example.com", title: "Example", enabled: false, icon: "mdi-map"});
  },
  removePage(state, {index}) {
    state.pages.splice(index, 1);
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
