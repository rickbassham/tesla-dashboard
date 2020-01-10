<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <clock />
      </v-col>
      <v-col cols="6">
        <weather />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <wind-map />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto my-1">
          <v-card-title>
            Debug Info
          </v-card-title>
          <v-card-text class="fill-height">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, key) in debugData" :key="key">
                    <td>{{ key }}</td>
                    <td>{{ JSON.stringify(item) }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Clock from "./Clock.vue";
import WindMap from "./WindMap.vue";
import Weather from "./SmallWeather.vue";
import { mapGetters,  mapState } from "vuex";

export default {
  components: {
    Clock,
    WindMap,
    Weather,
  },
  computed: {
    ...mapState("location", ["rawLocation"]),
    ...mapGetters("location", ["location"]),
    debugData: function() {
      let data = {};
      data = Object.assign(data, this.rawLocation);
      data = Object.assign(data, {error: this.error});
      return data;
    },
  },
  data: function() {
    return {
      error: {},
    };
  },
};
</script>
