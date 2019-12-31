<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link :to="'/'">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/guest'">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Guest Instructions</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/abrp'">
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>A Better Route Planner</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/waze'">
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Waze</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/plugshare'">
          <v-list-item-action>
            <v-icon>mdi-power-plug</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>PlugShare</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link :to="'/setup'">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tesla Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <template v-if="$route.matched.length">
          <router-view></router-view>
        </template>
      </v-container>
    </v-content>
    <v-footer app>
      <span>&copy; 2019 Rick Bassham</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false
  })
};
</script>
