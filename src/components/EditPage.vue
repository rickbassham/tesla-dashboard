<template>
  <v-card>
    <v-card-title>Edit Page</v-card-title>
    <v-card-text>
      <v-container>
        <v-text-field
          label="Title"
          :value="page.title"
          v-on:input="titleUpdated"
        ></v-text-field>
        <v-text-field
          label="URL"
          :value="page.link"
          v-on:input="linkUpdated"
        ></v-text-field>
        <v-combobox
          :items="icons"
          label="Select an icon"
          :prepend-icon="page.icon"
          :value="page.icon"
          @change="iconUpdated"
        >
        </v-combobox>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="close">Close</v-btn>
      <v-spacer />
      <v-dialog v-model="confirm" persistent max-width="300">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="accent">Remove</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Remove Page?</v-card-title>
          <v-card-text>Are you sure you want to remove this page?</v-card-text>
          <v-card-actions>
            <v-btn @click="confirm = false">Cancel</v-btn>
            <v-spacer />
            <v-btn @click="remove" color="accent">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    new: Boolean,
    page: Object,
  },
  data() {
    return {
      icons: ["mdi-map", "mdi-power-plug"],
      confirm: false,
    };
  },
  methods: {
    titleUpdated: function(ev) {
      this.$emit("title-updated", ev);
    },
    linkUpdated: function(ev) {
      this.$emit("link-updated", ev);
    },
    iconUpdated: function(ev) {
      this.$emit("icon-updated", ev);
    },
    add: function(ev) {
      this.$emit("add", ev);
    },
    close: function(ev) {
      this.$emit("close", ev);
    },
    remove: function() {
      this.$emit("remove");
    }
  }
};
</script>