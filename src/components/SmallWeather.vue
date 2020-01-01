<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-text>
      <div :id="uuid">
      </div>
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
      this.updateMap()
    }
  },
  computed: {
    colors: function() {
      const fg = this.darkMode ? 'FFFFFF' : '333333';
      return {
          textColor: fg,
          skyColor: fg
        };
    },
    scriptTag: function() {
      return `<script type="text/javascript" src="https://darksky.net/widget/small/${this.location.latitude},${this.location.longitude}/us12/en.js?textColor=${this.colors.textColor}&bgColor=transparent&skyColor=${this.colors.skyColor}&fontFamily=Default&customFont=&units=us"></scr` + 'ipt>'
    },
    ...mapGetters("location", ["location"]),
    ...mapState("settings", ["darkMode"]),
  },
  data() {
    return {
      uuid: uuidv4(),
    };
  },
  mounted() {
    postscribe("#" + this.uuid, this.scriptTag);
  },
  methods: {
    updateMap() {
      const el = document.getElementById(this.uuid);
      if (el.lastChild) {
        el.lastChild.remove()
      }

      postscribe("#" + this.uuid, this.scriptTag);
    }
  }
};
</script>
