<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-text>
      <div :id="uuid"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import postscribe from "postscribe";
const uuidv4 = require("uuid/v4");
const tags = require('../scripts/tag.js')

export default {
  props: {
    location: Object,
  },
  watch: {
    location: function() {
      this.updateMap()
    },
  },
  methods: {
    updateMap() {
      if (this.location && this.location.latitude && this.location.longitude) {
        const el = document.getElementById(this.uuid);
        if (el.lastChild) {
          el.lastChild.remove()
        }

        const weatherTag = tags.scriptTag(`https://darksky.net/widget/small/${this.location.latitude},${this.location.longitude}/us12/en.js?width=undefined&title=Full Forecast&textColor=333333&bgColor=FFFFFF&skyColor=333&fontFamily=Default&customFont=&units=us`);
        postscribe("#" + this.uuid, weatherTag);
      }
    },
  },
  data() {
    return {
      uuid: uuidv4(),
    };
  },
};
</script>
