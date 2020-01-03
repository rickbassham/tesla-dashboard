<template>
  <v-card class="mx-auto my-1" height="510">
    <v-card-text class="fill-height">
      <div :id="uuid" class="container fill-height">
        <iframe
          width="100%"
          height="100%"
          style="border: 0;"
          :src="`https://maps.darksky.net/@${this.selectedMap},${now},19,${this.location.latitude},${this.location.longitude},7`"
        ></iframe>
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
      return new Date() | this.$moment("YYYY-MM-DD");
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
