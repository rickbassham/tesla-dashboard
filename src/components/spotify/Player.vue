<template>
  <v-card tile>
    <v-progress-linear
      class="my-0"
      height="3"
      :value="progress"
    ></v-progress-linear>
    <v-list>
      <v-list-item inactive>
        <v-list-item-avatar>
          <v-img
            :src="track.album.image"
            aspect-ratio="1.33"
            contain
            width="100"
          ></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ track.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ track.artist }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ track.album.name }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-spacer></v-spacer>
        <v-list-item-action class="mx-2">
          <v-btn x-large rounded v-on:click="previousClicked">
            <v-icon x-large>mdi-skip-previous</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action class="mx-2">
          <v-btn x-large rounded v-on:click="playPauseClicked">
            <v-icon x-large>{{ playIcon }}</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action class="mx-2">
          <v-btn x-large rounded v-on:click="nextClicked">
            <v-icon x-large>mdi-skip-next</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action class="mx-2">
          <v-btn x-large rounded v-on:click="shuffleClicked">
            <v-icon x-large :color="shuffleIconColor">mdi-shuffle</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-action class="mx-2">
          <v-btn x-large rounded v-on:click="repeatClicked">
            <v-icon x-large :color="repeatIconColor">{{ repeatIcon }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    progress: Number,
    track: Object,
    repeatState: String,
    shuffleState: Boolean,
    isPlaying: Boolean
  },
  computed: {
    shuffleIconColor: function() {
      return this.shuffleState ? "primary" : "grey lighten-1";
    },
    repeatIconColor: function() {
      return this.repeatState !== "off" ? "primary" : "grey lighten-1";
    },
    repeatIcon: function() {
      return this.repeatState === "track" ? "mdi-repeat-once" : "mdi-repeat";
    },
    playIcon: function() {
      return this.isPlaying ? "mdi-pause" : "mdi-play";
    }
  },
  methods: {
    previousClicked: function() {
      this.$emit("previousClicked");
    },
    playPauseClicked: function() {
      this.$emit("playPauseClicked");
    },
    nextClicked: function() {
      this.$emit("nextClicked");
    },
    shuffleClicked: function() {
      this.$emit("shuffleClicked");
    },
    repeatClicked: function() {
      this.$emit("repeatClicked");
    },
  }
}
</script>