<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Settings</v-card-title>
          <v-card-text>
            <v-form>
              <v-text-field label="Vehicle Name" type="text" v-model="vehicleName" />
              <v-select :items="mapOptions" label="Weather Map" v-model="selectedMap"></v-select>
              <v-checkbox
                v-model="showGuestInstructions"
                label="Show Guest Instructions?"
              ></v-checkbox>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-title>Pages</v-card-title>
          <v-list>
            <v-list-item v-for="(page, index) in pages" :key="index">
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="page.enabled"
                    @change="enabledClicked(index, $event)"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item-action>
                  <v-icon v-text="page.icon"></v-icon>
                </v-list-item-action>
                <v-list-item-content class="ml-4">
                  <v-list-item-title v-text="page.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="page.link"></v-list-item-subtitle>
                </v-list-item-content>
                <v-spacer></v-spacer>
                <v-list-item-action class="mr-4">
                  <v-dialog v-model="dialog[index]">
                    <template v-slot:activator="{ on }">
                      <v-btn v-on="on"><v-icon>mdi-settings</v-icon></v-btn>
                    </template>
                    <editor
                      :new="false"
                      :page="page"
                      v-on:title-updated="titleUpdated(index, $event)"
                      v-on:link-updated="linkUpdated(index, $event)"
                      v-on:icon-updated="iconUpdated(index, $event)"
                      v-on:close="closeDialog(index)"
                      v-on:remove="removePage(index)"
                    />
                  </v-dialog>
                </v-list-item-action>
                <v-list-item-action>
                  <v-btn :disabled="index === 0" @click="moveUp(index)"><v-icon>mdi-chevron-up</v-icon></v-btn>
                </v-list-item-action>
                <v-list-item-action class="ml-0">
                  <v-btn :disabled="index === pages.length-1" @click="moveDown(index)"><v-icon>mdi-chevron-down</v-icon></v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-list-item>
              <v-btn @click="addPage">Add New Page</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Editor from "./EditPage.vue";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      mapOptions: [
        { text: "Temperature", value: "temperature" },
        { text: "Cloud Cover", value: "cloud_cover" },
        { text: "Radar", value: "radar" },
        { text: "Wind Speed", value: "wind_speed" },
        { text: "Feels Like", value: "apparent_temperature" }
      ],
      dialog: {},
    };
  },
  computed: {
    ...mapState("settings", ["pages"]),
    vehicleName: {
      get() {
        return this.$store.state.settings.vehicleName;
      },
      set(val) {
        this.$store.commit("settings/setVehicleName", val);
      }
    },
    selectedMap: {
      get() {
        return this.$store.state.settings.selectedMap;
      },
      set(val) {
        this.$store.commit("settings/setSelectedMap", val);
      }
    },
    showGuestInstructions: {
      get() {
        return this.$store.state.settings.showGuestInstructions;
      },
      set(val) {
        this.$store.commit("settings/setShowGuestInstructions", val);
      }
    }
  },
  methods: {
    enabledClicked: function(index, enabled) {
      this.$store.commit("settings/setPageEnabled", { index, enabled });
    },
    titleUpdated: function(index, title) {
      this.$store.commit("settings/setPageTitle", { index, title });
    },
    linkUpdated: function(index, link) {
      this.$store.commit("settings/setPageLink", { index, link });
    },
    iconUpdated: function(index, icon) {
      this.$store.commit("settings/setPageIcon", { index, icon });
    },
    moveDown: function(index) {
      this.$store.commit("settings/movePageDown", {index});
    },
    moveUp: function(index) {
      this.$store.commit("settings/movePageUp", {index});
    },
    addPage: function() {
      this.$store.commit("settings/addPage");
      this.$nextTick().then(this.dialog[this.pages.length-1] = true);
    },
    removePage: function(index) {
      this.$delete(this.dialog, index.toString());
      this.$store.commit("settings/removePage", {index});
    },
    closeDialog: function(index) {
      this.$delete(this.dialog, index.toString());
    }
  }
};
</script>
