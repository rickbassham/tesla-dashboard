<template>
  <v-card class="mx-auto my-1" height="300">
    <v-card-text class="fill-height">
      <div :id="uuid" class="container fill-height"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import postscribe from "postscribe";
const uuidv4 = require("uuid/v4");

export default {
  props: {
    location: Object
  },
  watch: {
    location: function() {
      this.updateMap();
    }
  },
  methods: {
    updateMap() {
      if (this.location && this.location.latitude && this.location.longitude) {
        const el = document.getElementById(this.uuid);
        if (el.lastChild) {
          el.lastChild.remove();
        }

        const self = this;

        const now = new Date() | this.$moment("YYYY-MM-DD");
        const windMapURL =
          '<iframe width="100%" height="100%" style="border: 0;" src="https://maps.darksky.net/@wind_speed,' +
          now +
          ",19," +
          this.location.latitude +
          "," +
          this.location.longitude +
          ',7"></iframe>';
        postscribe("#" + this.uuid, windMapURL, {
          done: function() {
            const el = document.getElementById(self.uuid);
            const frameDoc = el.firstElementChild.contentDocument;
            frameDoc.onload = function() {
              console.log('loaded!');
              console.log(frameDoc);
              frameDoc.getElementById("content").style.display = 'none';
            }
          }
        });
      }
    }
  },
  data() {
    return {
      uuid: uuidv4()
    };
  }
};
</script>
