<template>
  <v-row v-if="list">
    <v-col v-for="item in list" :key="item.id" cols="3">
      <v-card
        height="100%"
        style="display: flex; flex-direction: column;"
        :id="item.uri.replace(/:/g, '_')"
        :raised="currentContextUri === item.uri"
      >
        <v-card-title class="text-truncate" style="display: block">
        {{ item.name }}
        </v-card-title>
        <v-card-text>
        <v-img :src="item.image" aspect-ratio="1.33" contain width="300" />
        </v-card-text>
        <v-card-subtitle class="grow">{{ item.description }}</v-card-subtitle>
        <v-card-actions>
        <v-btn color="primary" v-on:click="playContextClicked(item.uri)">
          {{ playButtonText(item.uri) }}
        </v-btn>
        <v-spacer />
        <!--v-btn>View</v-btn-->
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  props: {
    currentContextUri: String,
    list: Array,
  },
  methods: {
    playButtonText: function(uri) {
      return this.currentContextUri === uri ? "Playing" : "Play";
    },
    playContextClicked: function(uri) {
      this.$emit("playContextClicked", uri);
    }
  }
}
</script>
