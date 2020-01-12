<template>
  <v-app id="inspire" :dark="darkMode">
    <v-app-bar app class="appbar">
      <v-toolbar-title>Tesla Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :color="getColor('home')" v-on:click="btnClick('home')">
        <v-icon left>mdi-home</v-icon>Home
      </v-btn>
      <v-btn class="mx-2" :color="getColor('guest')" v-on:click="btnClick('guest')">
        <v-icon left>mdi-account</v-icon>Guest Instructions
      </v-btn>
      <v-btn class="mx-2" :color="getColor('abrp')" v-on:click="btnClick('abrp')">
        <v-icon left>mdi-map</v-icon>A Better Route Planner
      </v-btn>
      <v-btn class="mx-2" :color="getColor('waze')" v-on:click="btnClick('waze')">
        <v-icon left>mdi-map</v-icon>Waze
      </v-btn>
      <v-btn class="mx-2" :color="getColor('plugshare')" v-on:click="btnClick('plugshare')">
        <v-icon left>mdi-power-plug</v-icon>PlugShare
      </v-btn>
      <v-btn class="mx-2" :color="getColor('settings')" v-on:click="btnClick('settings')">
        <v-icon left>mdi-settings</v-icon>Settings
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height align-start" fluid>
        <v-container :class="getClass('home')" fluid>
          <welcome />
        </v-container>
        <v-container :class="getClass('guest')" fluid>
          <guest-instructions />
        </v-container>
        <v-container :class="getClass('abrp')" fluid>
          <frame :src="this.frameSrc['abrp']" />
        </v-container>
        <v-container :class="getClass('waze')" fluid>
          <frame :src="this.frameSrc['waze']" />
        </v-container>
        <v-container :class="getClass('plugshare')" fluid>
          <frame :src="this.frameSrc['plugshare']" />
        </v-container>
        <v-container :class="getClass('settings')" fluid>
          <settings />
        </v-container>
      </v-container>
    </v-content>
    <v-footer app>
      <v-btn text>&copy; 2019 Rick Bassham</v-btn>
      <v-btn text href="https://github.com/rickbassham/tesla-dashboard" target="_blank">
        <v-icon left>mdi-github-circle</v-icon>GitHub
      </v-btn>
      <v-btn text>{{ appVersion }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="() => (this.darkMode = !this.darkMode)">{{ this.darkModeText }}</v-btn>
      <v-btn text href="https://ts.la/brodrick17858">Tesla Referral Link</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import Welcome from "./components/Welcome.vue";
import GuestInstructions from "./components/model3/GuestInstructions.vue";
import Settings from "./components/Setup.vue";
import Frame from "./components/Frame.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Welcome,
    GuestInstructions,
    Settings,
    Frame
  },
  props: {
    source: String
  },
  data: function() {
    return {
      frameSrc: {
        abrp: "",
        waze: "",
        plugshare: ""
      }
    };
  },
  computed: {
    ...mapState("settings", ["newABRP"]),
    ...mapGetters("version", ["appVersion"]),
    darkModeText: function() {
      return this.darkMode ? "Light" : "Dark";
    },
    darkMode: {
      get() {
        return this.$store.state.settings.darkMode;
      },
      set(val) {
        this.$store.commit("settings/setDarkMode", val);
        this.$vuetify.theme.dark = val;
      }
    },
    activeTab: {
      get() {
        return this.$store.state.settings.activeTab;
      },
      set(val) {
        this.$store.commit("settings/setActiveTab", val);
      }
    },
    defaultFrameSrc: function() {
      return {
        abrp: this.newABRP
          ? "https://new.abetterrouteplanner.com/"
          : "https://abetterrouteplanner.com/",
        waze: "https://teslawaze.azurewebsites.net/",
        plugshare: "https://www.plugshare.com/"
      };
    }
  },
  watch: {
    newABRP: function(val) {
      if (val) {
        if (this.frameSrc["abrp"]) {
          this.frameSrc["abrp"] = "https://new.abetterrouteplanner.com/";
        }
      } else {
        if (this.frameSrc["abrp"]) {
          this.frameSrc["abrp"] = "https://abetterrouteplanner.com/";
        }
      }
    }
  },
  methods: {
    btnClick: function(id) {
      this.activeTab = id;

      this.$gtag.event("navclicked", {
        event_label: id
      });

      if (this.defaultFrameSrc[id] && !this.frameSrc[id]) {
        this.frameSrc[id] = this.defaultFrameSrc[id];
      }
    },
    getClass: function(id) {
      return this.activeTab === id ? "fill-height align-start" : "d-none";
    },
    getColor: function(id) {
      return this.activeTab === id ? "primary" : "";
    }
  },
  beforeMount() {
    if (!this.activeTab) {
      this.activeTab = "home";
    }

    if (matchMedia) {
      const match = matchMedia("(prefers-color-scheme: dark)");

      this.darkMode = match.matches;

      if (match.addEventListener) {
        const self = this;
        match.addEventListener("change", function(e) {
          self.darkMode = e.matches;
        });
      }
    }
  }
};
</script>
