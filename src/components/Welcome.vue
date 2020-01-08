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
  </v-container>
</template>

<script>
import Clock from "./Clock.vue";
import WindMap from "./WindMap.vue";
import Weather from "./SmallWeather.vue";
import { mapGetters, mapMutations } from "vuex";
import { getDistance } from "geolib";

export default {
  components: {
    Clock,
    WindMap,
    Weather
  },
  computed: {
    ...mapGetters("location", ["location"])
  },
  mounted() {
    const self = this;

    window.navigator.geolocation.watchPosition(
      pos => {
        const dist = Math.abs(getDistance(pos.coords, self.location));

        // update location if we are more than 5km from the last location
        if (dist > 5000) {
          self.setLocation({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          });
        }
      },
      e => {
        console.log(e);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true
      }
    );
  },
  methods: {
    ...mapMutations("location", ["setLocation"])
  }
};
</script>
