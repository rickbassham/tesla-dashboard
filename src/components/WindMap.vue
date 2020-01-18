<template>
  <v-card class="mx-auto my-1" height="510">
    <v-card-text class="fill-height">
      <div :id="uuid" class="container fill-height">
        <iframe width="100%" height="100%" style="border: 0;" :src="src"></iframe>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
const uuidv4 = require("uuid/v4");

export default {
  computed: {
    now: function() {
      return this.$moment().format("YYYY-MM-DD");
    },
    src: function() {
      return `https://maps.darksky.net/@${this.selectedMap},${this.now},19,${this.lat},${this.lng},8`;
    },
    lat: function() {
      return this.location.latitude;
    },
    lng: function() {
      return this.location.longitude;
    },
    ...mapGetters("location", ["location"]),
    ...mapState("settings", ["selectedMap"])
  },
  data() {
    return {
      uuid: uuidv4()
    };
  }
};
</script>
