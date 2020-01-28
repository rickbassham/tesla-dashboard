<template>
  <v-container fluid>
    <v-dialog persistent v-model="showDialog">
      <v-list>
        <v-list-item-group v-model="deviceIndex">
          <v-list-item v-for="d in devices" :key="d.name">
            <v-list-item-icon>
              <v-icon v-text="deviceIcon(d.type)" ></v-icon>
            </v-list-item-icon>
            <v-list-item-title v-text="d.name"></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-dialog>
    <v-card tile v-if="showInstructions">
      <v-card-title>Instructions</v-card-title>
      <v-card-text>
        Please start playback using the vehicle's Sp&ouml;tify app and then click the button
        below.
      </v-card-text>
      <v-card-actions>
        <v-btn v-on:click="checkForDevices">
          Check Again
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-row
      v-if="playback && playback.track"
      style="position: fixed; top: 52px; left: 0; right: 0; z-index: 99;"
    >
      <v-col cols="12">
        <player
          v-bind:progress="(playback.progress / playback.track.duration) * 100"
          v-bind:track="playback.track"
          v-bind:repeatState="playback.repeatState"
          v-bind:shuffleState="playback.shuffleState"
          v-bind:isPlaying="playback.isPlaying"
          v-on:previousClicked="previousClicked"
          v-on:playPauseClicked="playPauseClicked"
          v-on:nextClicked="nextClicked"
          v-on:shuffleClicked="shuffleClicked"
          v-on:repeatClicked="repeatClicked"
        />
      </v-col>
    </v-row>
    <v-container :style="playerStyle" fluid>
      <v-container v-if="this.activePage === 'current' && this.playback" fluid>
        <track-list
          v-bind:title="'Currently Playing'"
          v-bind:context="currentContext"
          v-bind:currentTrackIndex="currentTrackIndex"
          v-on:trackSelected="trackSelected"
        />
      </v-container>
      <v-container v-if="this.activePage === 'playlists'" fluid>
        <context-list
          v-bind:currentContextUri="currentContext ? currentContext.uri : ''"
          v-bind:list="playlists"
          v-on:playContextClicked="playContextClicked"
        />
      </v-container>
      <v-container v-if="this.activePage === 'albums'" fluid>
        <context-list
          v-bind:currentContextUri="currentContext ? currentContext.uri : ''"
          v-bind:list="albums"
          v-on:playContextClicked="playContextClicked"
        />
      </v-container>
    </v-container>
    <v-bottom-navigation fixed v-model="activePage">
      <v-btn value="current" v-if="this.playback">
        Currently Playing
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>
      <v-btn value="playlists">
        Playlists
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>
      <v-btn value="albums">
        Albums
        <v-icon>mdi-album</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import spotify from "../scripts/spotify.js";

import TrackList from "./spotify/TrackList.vue";
import ContextList from "./spotify/ContextList.vue";
import Player from "./spotify/Player.vue";

export default {
  components: {
    TrackList,
    ContextList,
    Player
  },
  data: function() {
    return {
      clientID: "c4684e2196844a0dbd9e2de0b5051084",
      accessToken: "",
      scopes: [
        "user-read-playback-state",
        "streaming",
        "playlist-read-collaborative",
        "user-modify-playback-state",
        "playlist-modify-public",
        "user-library-modify",
        "user-top-read",
        "user-read-currently-playing",
        "playlist-read-private",
        "user-follow-read",
        "user-read-recently-played",
        "playlist-modify-private",
        "user-follow-modify",
        "user-library-read",
        "user-read-private"
      ],
      user: null,
      playlists: null,
      albums: null,
      playback: null,
      client: null,
      currentContext: null,
      activePage: null,
      devices: null,
      playbackInterval: null
    };
  },
  computed: {
    ...mapState("settings", ["activeTab"]),
    host: function() {
      return window.location.origin;
    },
    playerStyle: function() {
      return this.playback && this.playback.track ? "top: 40px; position: relative" : "";
    },
    spotifyDevice: {
      get() {
        return this.$store.state.settings.spotifyDevice;
      },
      set(val) {
        this.$store.commit("settings/setSpotifyDevice", val);
      }
    },
    currentTrackIndex: function() {
      if (
        this.playback &&
        this.playback.track &&
        this.currentContext &&
        this.currentContext.tracks &&
        this.currentContext.tracks.findIndex
      ) {
        return this.currentContext.tracks.findIndex(t => t.uri === this.playback.track.uri);
      }
      return -1;
    },
    deviceIndex: {
      get() {
        if (this.devices && this.spotifyDevice) {
          return this.devices.findIndex(d => d.id === this.spotifyDevice);
        }
        return -1;
      },
      set(val) {
        this.spotifyDevice = this.devices[val].id;
      }
    },
    showDialog: function() {
      return (
        !this.loading &&
        this.isActive &&
        !(this.spotifyDevice && this.devices && this.devices.length > 0) &&
        !this.showInstructions
      );
    },
    showInstructions: function() {
      return !this.loading && this.isActive && !(this.devices && this.devices.length > 0);
    },
    isActive: function() {
      return this.activeTab === "Spotify";
    },
    loading: function() {
      return this.isActive && !this.accessToken && !this.client;
    }
  },
  watch: {
    playback: function(val) {
      if (val && val.device) {
        if (!this.spotifyDevice || val.device.id !== this.spotifyDevice) {
          this.spotifyDevice = val.device.id;
        }
      }
    },
    currentContext: function(newVal, oldVal) {
      if (newVal && (!oldVal || newVal.uri !== oldVal.uri)) {
        this.$nextTick().then(() => {
          this.$nextTick().then(() => {
            this.activePage = "current";
          });
        });
      }
    },
    currentTrackIndex: function() {
      this.$nextTick().then(() => {
        if (this.activePage === "current" && this.playback)
          this.$vuetify.goTo("#" + this.playback.track.uri.replace(/:/g, "_"), { offset: 200 });
      });
    },
    activePage: function() {
      this.$nextTick().then(() => {
        if (this.activePage === "current" && this.playback) {
          this.$vuetify.goTo("#" + this.playback.track.uri.replace(/:/g, "_"), { offset: 200 });
        } else if (this.activePage === "albums") {
          if (this.playback && this.playback.contextType === "album") {
            this.$vuetify.goTo("#" + this.playback.contextUri.replace(/:/g, "_"), { offset: 200 });
          } else {
            this.$vuetify.goTo(0);
          }
        } else if (this.activePage === "playlists") {
          if (this.playback && this.playback.contextType === "playlist") {
            this.$vuetify.goTo("#" + this.playback.contextUri.replace(/:/g, "_"), { offset: 200 });
          } else {
            this.$vuetify.goTo(0);
          }
        }
      });
    },
    devices: function() {
      this.checkForPlayback();
    },
    spotifyDevice: function() {
      this.client.device = this.spotifyDevice;

      this.checkForPlayback();
    },
    activeTab: function() {
      this.setup();
    }
  },
  beforeMount: function() {
    this.setup();
  },
  beforeDestroy: function() {
    clearInterval(this.playbackInterval);
    this.$vuetify.goTo(0);
  },
  methods: {
    playButtonText: function(uri) {
      return this.currentContext && this.currentContext.uri === uri ? "Playing" : "Play";
    },
    repeatClicked: function() {
      let repeatMode = "off";
      if (this.playback.repeatState == "off") {
        repeatMode = "context";
      } else if (this.playback.repeatState == "context") {
        repeatMode = "track";
      }
      this.client.setRepeat(repeatMode);
    },
    shuffleClicked: function() {
      const newState = !this.playback.shuffleState;
      this.client.setShuffle(newState);
    },
    playPauseClicked: function() {
      if (this.playback.isPlaying) {
        this.client.pausePlayback();
      } else {
        this.client.resumePlayback();
      }
    },
    previousClicked: function() {
      this.client.skipPrevious();
    },
    nextClicked: function() {
      this.client.skipNext();
    },
    playContextClicked: function(uri) {
      if (this.currentContext && uri == this.currentContext.uri) {
        this.activePage = "current";
      } else {
        this.client.playContext(uri);
      }
    },
    trackSelected: function({ contextUri, trackUri }) {
      this.client.playTrack(contextUri, trackUri);
    },
    checkForDevices: function() {
      this.client.getDevices().then(devices => {
        this.devices = devices.devices;

        if (
          this.spotifyDevice &&
          this.devices &&
          this.devices.length &&
          !this.devices.find(d => d.id === this.spotifyDevice)
        ) {
          this.spotifyDevice = null;
        }
      });
    },
    checkForPlayback: function() {
      if (this.devices && this.devices.length > 0 && this.spotifyDevice) {
        if (this.playbackInterval) {
          clearInterval(this.playbackInterval);
        }

        const self = this;
        this.playbackInterval = setInterval(function() {
          self.client.getCurrentPlayback().then(playback => {
            self.playback = playback;
            if (playback && playback.track) {
              self.currentTrackUri_raw = playback.track.uri;
            }
          }).catch(e => {
            if (e === "not-authorized") {
              self.accessToken = null;
              self.setup();
            } else {
              throw e;
            }
          });
        }, 1000);
      }
    },
    setup: function() {
      if (this.isActive) {
        const tokenMatch = window.location.hash.match(/access_token=(.*?)&/);
        if (tokenMatch && tokenMatch.length > 0) {
          this.accessToken = tokenMatch[1];
          window.location.hash = "";
        }

        // TOOD: Check for 401 response and re-auth.

        if (!this.accessToken) {
          const callback = encodeURIComponent(`${this.host}/spotify_login`);
          const requestScopes = encodeURIComponent(this.scopes.join(" "));
          window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&redirect_uri=${callback}&scope=${requestScopes}&response_type=token&state=123`;
          return;
        }

        this.client = new spotify(this.accessToken);

        this.client.getUserProfile().then(user => {
          this.user = user;
        });

        this.client.getPlaylists().then(playlists => {
          this.playlists = playlists;
        });

        this.client.getAlbums().then(albums => {
          this.albums = albums;
        });

        this.checkForDevices();
      }
    },
    deviceIcon(type) {
      switch (type) {
        case "Smartphone": return "mdi-cellphone";
        case "Computer": return "mdi-laptop";
        case "Tablet": return "mdi-tablet-ipad";
        case "Speaker": return "mdi-speaker";
        case "TV": return "mdi-television";
        case "AVR": return "mdi-audio-video";
        case "STB": return "mdi-set-top-box";
        case "AudioDongle": return "mdi-cast-audio";
        case "GameConsole": return "mdi-gamepad-square";
        case "CastVideo": return "mdi-cast";
        case "CastAudio": return "mdi-cast-audio";
        case "Automobile": return "mdi-car";
      }
      return "mdi-cloud-question";
    }
  }
};
</script>
