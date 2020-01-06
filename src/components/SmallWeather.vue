<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-text>
      <div :id="uuid"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import postscribe from "postscribe";

import { scriptTag } from "../scripts/tag";

const debounce = require("lodash.debounce");
const uuidv4 = require("uuid/v4");

export default {
  watch: {
    darkMode: function() {
      this.updateMap();
    },
    location: function() {
      this.updateMap();
    }
  },
  computed: {
    colors: function() {
      const fg = this.darkMode ? "ffffff" : "333333";
      const params = {
        textColor: fg,
        htColor: fg,
        ltColor: fg,
        timeColor: fg,
        tempColor: fg,
        lineColor: fg,
        markerColor: fg,
        rangeColor: fg,
        skyColor: fg
      };
      return Object.keys(params)
        .map(key => key + "=" + params[key])
        .join("&");
    },
    src: function() {
      return `https://darksky.net/widget/small/${this.lat},${this.lng}/us12/en.js?bgColor=transparent&fontFamily=Default&customFont=&units=us&${this.colors}`;
    },
    lat: function() {
      return this.location.latitude;
    },
    lng: function() {
      return this.location.longitude;
    },
    ...mapGetters("location", ["location"]),
    ...mapState("settings", ["darkMode"])
  },
  data() {
    return {
      uuid: uuidv4(),
      updating: false
    };
  },
  mounted() {
    this.updateMap();
  },
  methods: {
    updateMap() {
      const self = this;
      debounce(function() {
        const el = document.getElementById(self.uuid);
        while (el.lastChild) {
          el.lastChild.remove();
        }

        if (self.location.latitude && self.location.longitude)
          postscribe("#" + self.uuid, scriptTag(self.src));
      }, 100)();
    }
  }
};
</script>
