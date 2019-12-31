<template>
  <div :id="uuid"></div>
</template>

<script>
import postscribe from "postscribe";
const uuidv4 = require("uuid/v4");

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

        const weatherURL =
            '<script type="text/javascript" src="https://darksky.net/widget/graph-bar/' +
            this.location.latitude +
            "," +
            this.location.longitude +
            '/us12/en.js?width=100%&height=400&title=Full Forecast&bgColor=transparent&transparency=true&fontFamily=Default&currentDetailsOption=true"></scri' +
            "pt>";
        postscribe("#" + this.uuid, weatherURL);
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
