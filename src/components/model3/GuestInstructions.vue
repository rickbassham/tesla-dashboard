<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Guest Instructions</v-card-title>
          <v-card-text>
            <p>Welcome to driving {{this.vehicleName}}! Here are some quick tips to get you going.</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Turn On/Off</v-card-title>
          <v-card-text>
            <h3>Starting</h3>
            <p>When you open a door, {{this.vehicleName}} powers on the touchscreen and you can operate all controls. To drive {{this.vehicleName}}:</p>
            <ol class="mb-4">
              <li>PRESS THE BRAKE PEDAL - {{this.vehicleName}} powers on and is ready to drive.</li>
              <li>SELECT A GEAR - Move the gear lever all the way down for Drive and all the way up for Reverse.</li>
            </ol>
            <h3>Powering Off</h3>
            <p>When you finish driving, shift into Park by pressing the button on the end of the gear selector. The parking brake automatically engages and all systems keep operating. When you leave {{this.vehicleName}} with your authenticated phone and key card, it powers off automatically, turning off the touchscreen.</p>
            <p>{{this.vehicleName}} also powers off automatically after being in Park for 15 minutes, even if you are sitting in the driver’s seat.</p>
            <p>
              Although usually not needed, you can power off {{this.vehicleName}} while sitting in the driver’s seat, provided the vehicle is not moving. Touch
              <code>Controls > Safety &amp; Security > Power Off</code>
              . {{this.vehicleName}} automatically powers back on again if you press the brake pedal or touch the touchscreen.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-title>Driving</v-card-title>
          <v-card-text>
            <h3>Shifting Gears</h3>
            <p>When {{this.vehicleName}} is in Park, you must press the brake to shift to another gear.</p>
            <p>Move the lever up or down to change gears.</p>
            <v-img src="shifter.png" width="357" height="352" />
            <h3>Park</h3>
            <p>Press the end of the gear selector while {{this.vehicleName}} is stopped. Whenever {{this.vehicleName}} is in Park, the parking brake is applied.</p>
            <v-img src="park.png" width="400" height="150" />
            <h3>Wipers</h3>
            <p>To perform a single wipe with the windshield wipers, press and immediately release the button on the end of the left-hand steering column lever.</p>
            <v-img src="wiper.png" width="400" height="150" />
            <p>
              To adjust the continuous wiper settings, touch the windshield wiper icon located in the
              <code>Cards</code> area on the touchscreen.
            </p>
            <ol class="mb-4">
              <li>Turn the wipers on or off.</li>
              <li>Adjust the speed of the wipers.</li>
            </ol>
            <v-img src="wipers.png" width="400" height="200" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("settings", ["vehicleName"])
  }
};
</script>
