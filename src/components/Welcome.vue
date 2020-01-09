<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <clock />
      </v-col>
      <v-col cols="6">
        <weather />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <wind-map />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-1">
          <v-card-title>
            Debug Info
          </v-card-title>
          <v-card-text class="fill-height">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, key) in debugData" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ JSON.stringify(item) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Clock from "./Clock.vue";
import WindMap from "./WindMap.vue";
import Weather from "./SmallWeather.vue";
import { mapGetters, mapMutations } from "vuex";
import { getDistance } from "geolib";
import { getLocation,watchLocation } from "../scripts/geo.js";

export default {
  components: {
    Clock,
    WindMap,
    Weather
  },
  computed: {
    debugData: function() {
      let data = {};
      data = Object.assign(data, this.rawLocation);
      data = Object.assign(data, {error: this.error});
      return data;
    },
    ...mapGetters("location", ["location"])
  },
  data: function() {
    return {
      rawLocation: {},
      error: {},
    };
  },
  mounted() {
    const opts = {
      timeout: 5000,
      enableHighAccuracy: false
    };

    getLocation(opts)
      .then(this.locationUpdated)
      .catch(this.locationError);

    watchLocation(opts, this.locationUpdated, this.locationError);
  },
  methods: {
    locationUpdated: function(pos) {
      this.rawLocation = Object.assign({}, this.rawLocation, pos.coords);
      const dist = Math.abs(getDistance(pos.coords, this.location));

      // update location if we are more than 5km from the last location
      if (dist > 5000) {
        this.setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      }
    },
    locationError: function(e) {
      this.error = e;
    },
    ...mapMutations("location", ["setLocation"])
  }
};
</script>
