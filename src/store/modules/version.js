const state = {
  packageVersion: process.env.PACKAGE_VERSION || 'dev'
};

const getters = {
  appVersion: (state) => {
    return state.packageVersion
  }
}

export default {
  namespaced: true,
  state,
  getters,
}
