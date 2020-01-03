<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        <v-card-title>Settings</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Vehicle Name"
              type="text"
              v-model="vehicleName"
            />
            <v-select
              :items="mapOptions"
              label="Weather Map"
              v-model="selectedMap"
            ></v-select>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      mapOptions: [
        { text: "Temperature", value: "temperature" },
        { text: "Cloud Cover", value: "cloud_cover" },
        { text: "Radar", value: "radar" },
        { text: "Wind Speed", value: "wind_speed" },
        { text: "Feels Like", value: "apparent_temperature" }
      ],
    };
  },
  computed: {
    vehicleName: {
      get() {
        return this.$store.state.settings.vehicleName;
      },
      set(val) {
        this.$store.commit('settings/setVehicleName', val)
      },
    },
    selectedMap: {
      get() {
        return this.$store.state.settings.selectedMap
      },
      set(val) {
        this.$store.commit('settings/setSelectedMap', val)
      },
    },
  },
};
</script>
