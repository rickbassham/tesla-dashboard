import { getLocation } from "../../scripts/geo.js";
import { getDistance, getSpeed, getGreatCircleBearing, getCompassDirection } from "geolib";

const state = {
  latitude: null,
  longitude: null,
  rawLocation: null,
  locationError: null,
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
  },
  setRawLocation(state, rawLocation) {
    state.locationError = null;

    if (state.rawLocation) {
      const originalLocation = {
        latitude: state.rawLocation.coords.latitude,
        longitude: state.rawLocation.coords.longitude,
        time: state.rawLocation.timestamp,
      }

      const newLocation = {
        latitude: rawLocation.coords.latitude,
        longitude: rawLocation.coords.longitude,
        time: rawLocation.timestamp,
      };

      if (!rawLocation.coords.speed) {
        rawLocation.coords.speed = getSpeed(originalLocation, newLocation);
      }

      if (!rawLocation.coords.heading) {
        rawLocation.coords.heading = getGreatCircleBearing(originalLocation, newLocation);
      }

      rawLocation.coords.compassDirection = getCompassDirection(originalLocation, newLocation);

      const dist = getDistance(newLocation, {
        latitude: state.latitude,
        longitude: state.longitude,
      });

      // update location if we are more than 5km from the last location
      if (dist > 5000) {
        state.latitude = rawLocation.coords.latitude;
        state.longitude = rawLocation.coords.longitude;
      }
    }

    state.rawLocation = rawLocation;
    if (!state.latitude || !state.longitude) {
      state.latitude = rawLocation.coords.latitude;
      state.longitude = rawLocation.coords.longitude;
    }
  },
  setLocationError(state, err) {
    state.locationError = err;
  }
}

const actions = {
  startPollingLocation({ commit }) {
    setInterval(function () {
      getLocation().then(
        pos => commit('setRawLocation', pos)
        ).catch(
          e => commit('setLocationError', e)
        );
    }, 5000);
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
