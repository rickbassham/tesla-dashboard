<template>
  <v-app id="inspire" :dark="darkMode">
    <v-app-bar app class="appbar">
      <v-toolbar-title>Tesla Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" :color="getColor('Home')" v-on:click="btnClick({title: 'Home'})">
        <v-icon left>mdi-home</v-icon>Home
      </v-btn>
      <v-btn class="mx-2" :color="getColor('Spotify')" v-on:click="btnClick({title: 'Spotify'})">
        <v-icon left>mdi-spotify</v-icon>Spotify
      </v-btn>

      <v-btn class="mx-2" v-for="page in enabledPages" :key="page.title" :color="getColor(page.title)" v-on:click="btnClick(page)">
        <v-icon left>{{page.icon}}</v-icon>{{page.title}}
      </v-btn>

      <v-btn v-if="showGuestInstructions" class="mx-2" :color="getColor('Guest')" v-on:click="btnClick({title: 'Guest'})">
        <v-icon left>mdi-account</v-icon>Guest
      </v-btn>
      <v-btn class="mx-2" :color="getColor('Settings')" v-on:click="btnClick({title: 'Settings'})">
        <v-icon left>mdi-settings</v-icon>Settings
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height align-start" fluid>
        <v-container :class="getClass('Home')" fluid>
          <welcome />
        </v-container>
        <v-container :class="getClass('Spotify')" fluid>
          <spotify />
        </v-container>
        <v-container v-for="page in enabledPages" :key="page.title" :class="getClass(page.title)" fluid>
          <frame :src="frameSrc[page.title]" />
        </v-container>
        <v-container v-if="showGuestInstructions" :class="getClass('Guest')" fluid>
          <guest-instructions />
        </v-container>
        <v-container :class="getClass('Settings')" fluid>
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
import Spotify from "./components/Spotify.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Welcome,
    GuestInstructions,
    Settings,
    Frame,
    Spotify
  },
  data: function() {
    return {
      frameSrc: {
      },
    };
  },
  props: {
    source: String
  },
  computed: {
    ...mapState("settings", ["showGuestInstructions", "pages"]),
    ...mapGetters("version", ["appVersion"]),
    darkModeText: function() {
      return this.darkMode ? "Light" : "Dark";
    },
    enabledPages: function() {
      return this.pages.filter(page => page.enabled);
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
  },
  methods: {
    btnClick: function(page) {
      this.activeTab = page.title;

      window.history.pushState({"page": page.title}, "", `/${page.title}`);
      this.$matomo.setCustomUrl(`/${page.title}`);
      this.$matomo.trackPageView();

      if (page.link && !this.frameSrc[page.title]) {
        this.frameSrc[page.title] = page.link;
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
    const match = navigator.userAgent.match(/Tesla\/(.*?)($|\s)/);
    if (this.$matomo && match && match.length > 1) {
      this.$matomo.setCustomDimension(1, match[1]);
    }

    if (window.location.pathname.match(/spotify_login/)) {
      this.activeTab = "Spotify";
    }

    if (!this.activeTab) {
      this.activeTab = "Home";
    }

    const page = this.pages.find(page => page.title == this.activeTab);
    if (page) {
      this.frameSrc[page.title] = page.link;
    } else {
      if (!["Home", "Spotify", "Guest", "Settings"].find(e => e === this.activeTab)) {
        this.activeTab = "Home";
      }
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
