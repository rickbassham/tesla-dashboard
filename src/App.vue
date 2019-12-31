<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <menu-item name="Home" link="/" icon="mdi-home"></menu-item>
        <menu-item name="Guest Instructions" link="/guest" icon="mdi-account"></menu-item>
        <menu-item name="A Better Route Planner" link="/abrp" icon="mdi-map"></menu-item>
        <menu-item name="Waze" link="/waze" icon="mdi-map"></menu-item>
        <menu-item name="PlugShare" link="/plugshare" icon="mdi-power-plug"></menu-item>
        <menu-item name="Settings" link="/setup" icon="mdi-settings"></menu-item>
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
      <v-btn text href="https://github.com/rickbassham/tesla-dashboard">&copy; 2019 Rick Bassham</v-btn>
      <v-spacer></v-spacer>
      <v-btn text href="https://ts.la/brodrick17858">Tesla Referral Link</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import MenuItem from './components/MenuItem.vue';

export default {
  components: {
    MenuItem,
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
  }),
};
</script>
