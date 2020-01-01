<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>Tesla Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" to="/"><v-icon left>mdi-home</v-icon>Home</v-btn>
      <v-btn class="mx-2" to="/guest"><v-icon left>mdi-account</v-icon>Guest Instructions</v-btn>
      <v-btn class="mx-2" to="/abrp"><v-icon left>mdi-map</v-icon>A Better Route Planner</v-btn>
      <v-btn class="mx-2" to="/waze"><v-icon left>mdi-map</v-icon>Waze</v-btn>
      <v-btn class="mx-2" to="/plugshare"><v-icon left>mdi-power-plug</v-icon>PlugShare</v-btn>
      <v-btn class="mx-2" to="/setup"><v-icon left>mdi-settings</v-icon>Settings</v-btn>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <template v-if="$route.matched.length">
          <router-view></router-view>
        </template>
      </v-container>
    </v-content>
    <v-footer app>
      <v-btn text>&copy; 2019 Rick Bassham</v-btn>
      <v-btn text href="https://github.com/rickbassham/tesla-dashboard" target="_blank"><v-icon left>mdi-github-circle</v-icon>GitHub</v-btn>
      <v-spacer></v-spacer>
      <v-btn text href="https://ts.la/brodrick17858">Tesla Referral Link</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
