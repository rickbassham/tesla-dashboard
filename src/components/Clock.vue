<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-text class="text-center">
      <p class="display-1 text--primary">{{ currentTime | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      currentTime: null,
      timer: null
    };
  },
  created() {
    this.timer = setInterval(this.updateTime, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    updateTime() {
      this.currentTime = new Date();
    }
  }
};
</script>
