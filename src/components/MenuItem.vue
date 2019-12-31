<template>
  <v-list-item link :to="link">
    <v-list-item-action>
      <v-icon>{{this.icon}}</v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>{{this.name}}</v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    link: String,
    icon: String,
    name: String
  }
};
</script>
