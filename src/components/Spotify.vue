<template>
  <v-container fluid>
    <v-dialog persistent v-model="hideDialog">
      <v-list>
        <v-list-item-group v-model="deviceIndex">
          <v-list-item v-for="d in devices" :key="d.name">
            <v-list-item-title v-text="d.name"></v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-dialog>
    <v-row style="position: fixed; top: 52px; left: 0; right: 0; z-index: 99;">
      <v-col cols="12">
        <v-card tile v-if="playback && playback.item">
          <v-progress-linear class="my-0" height="3" :value="(playback.progress_ms/playback.item.duration_ms)*100"></v-progress-linear>
          <v-list>
            <v-list-item inactive>
              <v-list-item-avatar>
                <v-img :src="playback.item.album.images[0].url" aspect-ratio="1.33" contain width="100"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{playback.item.name}}</v-list-item-title>
                <v-list-item-subtitle>{{playback.item.artists[0].name}}</v-list-item-subtitle>
                <v-list-item-subtitle>{{playback.item.album.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-list-item-action class="mx-2">
                <v-btn x-large rounded v-on:click="previousClicked">
                  <v-icon x-large>mdi-skip-previous</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="mx-2">
                <v-btn x-large rounded v-on:click="playPauseClicked">
                  <v-icon x-large>{{ playback.is_playing ? 'mdi-pause' : 'mdi-play' }}</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="mx-2">
                <v-btn x-large rounded v-on:click="nextClicked">
                  <v-icon x-large>mdi-skip-next</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="mx-2">
                <v-btn x-large rounded v-on:click="shuffleClicked">
                  <v-icon x-large :color="playback.shuffle_state ? 'primary' : 'grey lighten-1'">mdi-shuffle</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action class="mx-2">
                <v-btn x-large rounded v-on:click="repeatClicked">
                  <v-icon x-large :color="(playback.repeat_state == 'off' ? 'grey lighten-1' : 'primary')">{{ playback.repeat_state == "track" ? "mdi-repeat-once" : "mdi-repeat" }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-container style="top: 40px; position: relative" fluid>
      <v-container v-if="this.activeTab === 'current'" fluid>
        <v-list title="Currently Playing" v-if="currentContext">
          <v-list-item>
            <v-list-item-avatar>
              <v-img :src="currentContext.image" aspect-ratio="1.33" contain width="100"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="currentContext.name"></v-list-item-title>
            <v-list-item-subtitle v-text="currentContext.description"></v-list-item-subtitle>
          </v-list-item>
          <v-divider/>
          <v-list-item-group v-model="currentTrackIndex" color="primary">
            <v-list-item v-for="(track, index) in currentContext.tracks" :key="track.uri" :id="track.uri.replace(/:/g, '_')">
              <v-list-item-avatar>
                <v-img v-if="track.album" :src="track.album.image" aspect-ratio="1.33" contain width="100"></v-img>
                <span v-else>{{ index + 1 }}</span>
              </v-list-item-avatar>
              <v-list-item-title v-text="track.name"></v-list-item-title>
              <v-list-item-subtitle v-text="track.artist"></v-list-item-subtitle>
              <v-list-item-subtitle v-text="track.album.name" v-if="track.album"></v-list-item-subtitle>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-container>
      <v-container v-if="this.activeTab === 'playlists'" fluid>
        <v-row v-if="playlists">
          <v-col v-for="playlist in playlists.items" :key="playlist.id" cols="3">
            <v-card height="100%" style="display: flex; flex-direction: column;">
              <v-card-title class="text-truncate" style="display: block">{{ playlist.name }}</v-card-title>
              <v-card-text><v-img :src="playlist.images[0].url" aspect-ratio="1.33" contain width="300" /></v-card-text>
              <v-card-subtitle class="grow">{{ playlist.description }}</v-card-subtitle>
              <v-card-actions >
                <v-btn color="primary" v-on:click="playAlbumClicked(playlist.uri)">Play</v-btn>
                <v-spacer />
                <v-btn>View</v-btn>
              </v-card-actions>
            </v-card>
            </v-col>
        </v-row>
      </v-container>
      <v-container v-if="this.activeTab === 'albums'" fluid>
        <v-row v-if="albums">
          <v-col v-for="album in albums.items" :key="album.album.id" cols="3">
            <v-card height="100%" style="display: flex; flex-direction: column;">
              <v-card-title class="text-truncate" style="display: block">{{ album.album.name }}</v-card-title>
              <v-card-text><v-img :src="album.album.images[0].url" aspect-ratio="1.33" contain width="300" /></v-card-text>
              <v-card-subtitle class="grow">{{ album.album.artists[0].name }}</v-card-subtitle>
              <v-card-actions >
                <v-btn color="primary" v-on:click="playAlbumClicked(album.album.uri)">Play</v-btn>
                <v-spacer />
                <v-btn>View</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-if="this.activeTab === 'podcasts'" fluid>
        <v-row v-if="podcasts">
          <v-col v-for="podcast in podcasts.items" :key="podcast.show.id" cols="3">
            <v-card height="100%" style="display: flex; flex-direction: column;">
              <v-card-title class="text-truncate" style="display: block">{{ podcast.show.name }}</v-card-title>
              <v-card-text><v-img :src="podcast.show.images[0].url" aspect-ratio="1.33" contain width="300" /></v-card-text>
              <v-card-subtitle class="grow">{{ podcast.show.description }}</v-card-subtitle>
              <v-card-actions >
                <v-btn color="primary" v-on:click="playAlbumClicked(podcast.show.uri)">Play</v-btn>
                <v-spacer />
                <v-btn>View</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
    <v-bottom-navigation fixed v-model="activeTab">
      <v-btn value="current">
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
      <!--v-btn value="podcasts">
        Podcasts
        <v-icon>mdi-podcast</v-icon>
      </v-btn-->
    </v-bottom-navigation>
  </v-container>
</template>
<script>
import spotify from "../scripts/spotify.js";

export default {
  data: function() {
    return {
      host: "http://localhost:8080",
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
        "user-read-private",
      ],
      user: null,
      playlists: null,
      albums: null,
      podcasts: null,
      playback: null,
      client: null,
      currentContext: null,
      activeTab: null,
      devices: null,
    };
  },
  computed: {
    spotifyDevice: {
      get() {
        return this.$store.state.settings.spotifyDevice;
      },
      set(val) {
        this.$store.commit("settings/setSpotifyDevice", val);
      }
    },
    currentTrackIndex: {
      get() {
        if (this.currentContext && this.currentContext.tracks && this.currentContext.tracks.findIndex) {
          return this.currentContext.tracks.findIndex(t => t.uri === this.playback.item.uri); 
        }
        return -1;
      },
      set(val) {
        this.client.playTrack(this.currentContext.uri, this.currentContext.tracks[val].uri);
      }
    },
    deviceIndex: {
      get() {
        if (this.devices) {
          return this.devices.findIndex(d => d.name === this.spotifyDevice);
        }
        return -1;
      },
      set(val) {
        this.spotifyDevice = this.devices[val];
        this.client.device = this.device.id;
      }
    },
    hideDialog: {
      get() {
        return !this.spotifyDevice;
      },
      set() {}
    }
  },
  watch: {
    playback: function(newVal, oldVal) {
      if (newVal.context && (!oldVal || newVal.context.uri !== oldVal.context.uri)) {
        this.client.getContext(this.playback.context.uri).then(currentContext => {
          this.currentContext = currentContext;
        });
      }
    },
    currentTrackIndex: function() {
      if (this.activeTab === 'current' && this.playback)
        this.$nextTick().then(() => {
          console.log('goto currentTrackIndex')
          this.$vuetify.goTo('#'+this.playback.item.uri.replace(/:/g, '_'), {offset: 200})
        })
    },
    activeTab: function() {
      if (this.activeTab === 'current' && this.playback)
        this.$nextTick().then(() => {
          console.log('goto activeTab')
          this.$vuetify.goTo('#'+this.playback.item.uri.replace(/:/g, '_'), {offset: 200})
        })
    }
  },
  beforeMount: function() {
    const tokenMatch = window.location.hash.match(/access_token=(.*?)&/)
    if (tokenMatch && tokenMatch.length > 0) {
      this.accessToken = tokenMatch[1];
      window.location.hash = "";
    }

    if (!this.accessToken) {
      const callback = encodeURIComponent(`${this.host}/spotify_login`);
      const requestScopes = encodeURIComponent(this.scopes.join(" "));
      window.location = `https://accounts.spotify.com/authorize?client_id=${this.clientID}&redirect_uri=${callback}&scope=${requestScopes}&response_type=token&state=123`;
    }

    this.client = new spotify(this.accessToken);

    this.client.getUserProfile().then(user => {
      this.user = user;
    });

    this.client.getDevices().then(devices => {
      this.devices = devices.devices;
    })

    this.client.getPlaylists().then(playlists => {
      this.playlists = playlists;
    });

    this.client.getAlbums().then(albums => {
      this.albums = albums;
    });

    this.client.getPodcasts().then(podcasts => {
      this.podcasts = podcasts;
    })

    const self = this;
    setInterval(function(){
      self.client.getCurrentPlayback().then(playback => {
        self.playback = playback;
        if (playback.item)
          self.currentTrackUri_raw = playback.item.uri;
      });
    }, 1000);
  },
  methods: {
    repeatClicked: function () {
      let repeatMode = 'off';
      if (this.playback.repeat_state == "off") {
        repeatMode = "context";
      } else if (this.playback.repeat_state == "context") {
        repeatMode = "track";
      }
      this.client.setRepeat(repeatMode);
      this.playback.repeat_state = repeatMode;
    },
    shuffleClicked: function () {
      const newState = !this.playback.shuffle_state;
      this.client.setShuffle(newState);
      this.playback.shuffle_state = newState;
    },
    playPauseClicked: function () {
      if (this.playback.is_playing) {
        this.client.pausePlayback();
      } else {
        this.client.resumePlayback();
      }
    },
    previousClicked: function () {
      this.client.skipPrevious();
    },
    nextClicked: function () {
      this.client.skipNext();
    },
    playAlbumClicked: function(uri) {
      this.client.playContext(uri);
    },
    playlistItemClicked: function() {

    }
  }
}
</script>
