<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-title class="justify-center fill-height">
      {{ currentTime | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}
    </v-card-title>
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
