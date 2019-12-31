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
    <ul>
      <li>Window Inner {{ windowInnerWidth}} x {{ windowInnerHeight }}</li>
      <li>Window Outer {{ windowOuterWidth}} x {{ windowOuterHeight }}</li>
      <li>Document {{ documentWidth}} x {{ documentHeight }}</li>
    </ul>
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
      windowInnerHeight: window.innerHeight,
      windowInnerWidth: window.innerWidth,
      windowOuterHeight: window.outerHeight,
      windowOuterWidth: window.outerWidth,
      documentWidth: document.documentElement.clientWidth,
      documentHeight: document.documentElement.clientHeight,
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
