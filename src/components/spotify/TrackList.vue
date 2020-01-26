<template>
  <v-list :title="title" v-if="context">
    <v-list-item>
      <v-list-item-avatar>
        <v-img :src="context.image" aspect-ratio="1.33" contain width="100"></v-img>
      </v-list-item-avatar>
      <v-list-item-title v-text="context.name"></v-list-item-title>
      <v-list-item-subtitle v-text="context.description"></v-list-item-subtitle>
    </v-list-item>
    <v-divider />
    <v-list-item-group v-model="trackIndex" color="primary">
      <v-list-item
        v-for="(track, index) in context.tracks"
        :key="track.uri"
        :id="track.uri.replace(/:/g, '_')"
      >
        <v-list-item-avatar>
          <v-img
            v-if="track.album"
            :src="track.album.image"
            aspect-ratio="1.33"
            contain
            width="100"
          ></v-img>
          <span v-else>{{ index + 1 }}</span>
        </v-list-item-avatar>
        <v-list-item-title v-text="track.name"></v-list-item-title>
        <v-list-item-subtitle v-text="track.artist"></v-list-item-subtitle>
        <v-list-item-subtitle v-text="track.album.name" v-if="track.album"></v-list-item-subtitle>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  props: {
    title: String,
    context: Object,
    currentTrackIndex: Number
  },
  computed: {
    trackIndex: {
      get() {
        return this.currentTrackIndex;
      },
      set(val) {
        this.$emit("trackSelected", {
          contextUri: this.context.uri,
          trackUri: this.context.tracks[val].uri
        });
      }
    }
  }
};
</script>
