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

const debounce = require('lodash.debounce');
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
    scriptTag: function() {
      return (
        `<script type="text/javascript" src="https://darksky.net/widget/small/${this.location.latitude},${this.location.longitude}/us12/en.js?bgColor=transparent&fontFamily=Default&customFont=&units=us&${this.colors}"></scr` +
        "ipt>"
      );
    },
    ...mapGetters("location", ["location"]),
    ...mapState("settings", ["darkMode"])
  },
  data() {
    return {
      uuid: uuidv4(),
      updating: false,
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
        if (el.lastChild) {
          el.lastChild.remove();
        }

        if (self.location.latitude && self.location.longitude)
          postscribe("#" + self.uuid, self.scriptTag);
      }, 100)()
    }
  }
};
</script>
