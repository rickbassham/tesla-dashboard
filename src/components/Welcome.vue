<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <clock />
      </v-col>
      <v-col cols="6">
        <weather v-bind:location="{ latitude, longitude }" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <wind-map v-bind:location="{ latitude, longitude }" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Clock from './Clock.vue';
import WindMap from './WindMap.vue';
import Weather from './SmallWeather.vue';

export default {
  components: {
    Clock,
    WindMap,
    Weather,
  },
  data() {
    return {
      latitude: null,
      longitude: null,
    }
  },
  mounted() {
    const self = this;

    window.navigator.geolocation.getCurrentPosition((pos) => {
      self.latitude = pos.coords.latitude;
      self.longitude = pos.coords.longitude;
    }, (e) => {
      console.log(e);
    }, {
      timeout: 10000,
      enableHighAccuracy: true,
    })
  }
};
</script>
