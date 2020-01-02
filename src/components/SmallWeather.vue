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
      const fg = this.darkMode ? "ababab" : "333333";
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
      uuid: uuidv4()
    };
  },
  mounted() {
    if (this.location.latitude && this.location.longitude)
      postscribe("#" + this.uuid, this.scriptTag);
  },
  methods: {
    updateMap() {
      const el = document.getElementById(this.uuid);
      if (el.lastChild) {
        el.lastChild.remove();
      }

      if (this.location.latitude && this.location.longitude)
        postscribe("#" + this.uuid, this.scriptTag);
    }
  }
};
</script>
