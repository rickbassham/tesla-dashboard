<template>
  <v-container>
    <v-progress-linear indeterminate :active="loading"></v-progress-linear>
    <p>{{ feed.title }}</p>
    <v-expansion-panels>
      <v-expansion-panel v-for="(item, i) in feed.items" :key="i">
        <v-expansion-panel-header>{{ item.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-lazy>
            <iframe
              :src="'https://outline.com/' + item.link"
              width="100%"
              height="600px"
              style="border: 0"
            />
          </v-lazy>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script>
import { mapState } from "vuex";
import shorten from "../scripts/shorten.js";
import Parser from "rss-parser";

const parser = new Parser();

export default {
  data: function() {
    return {
      feed: {},
      loading: true
    };
  },
  computed: {
    ...mapState("settings", ["rssFeed"])
  },
  watch: {
    rssFeed: function() {
      this.updateFeed();
    }
  },
  mounted: function() {
    this.updateFeed();
  },
  methods: {
    updateFeed: async function() {
      this.loading = true;
      this.feed = {};

      const data = await (await fetch("https://cors-anywhere.herokuapp.com/" + this.rssFeed)).text();
      const feed = await parser.parseString(data);

      for (let i = 0; i < feed.items.length; i++) {
        // run the links through a shortener to pass to outline.com
        feed.items[i].link = await shorten(feed.items[i].link);
      }

      this.loading = false;
      this.feed = feed;
    }
  }
};
</script>
