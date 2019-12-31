<template>
  <v-row>
    <v-col cols="6">
      <v-card>
        <v-card-title>Vehicle Settings</v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field label="Vehicle Name" name="vehicleName" type="text" v-model="vehicleName" />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" :disabled="!(this.vehicleName)" @click="saveVehicleSettings">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      vehicleName: localStorage.vehicleName || "the Model 3",
    };
  },
  methods: {
    saveVehicleSettings() {
      localStorage.vehicleName = this.vehicleName;
    }
  }
};
</script>
