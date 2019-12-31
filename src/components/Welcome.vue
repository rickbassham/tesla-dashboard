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
    this.$getLocation({
      enableHighAccuracy: true
    }).then(coord => {
      this.latitude = coord.lat;
      this.longitude = coord.lng;
    });
  }
};
</script>
