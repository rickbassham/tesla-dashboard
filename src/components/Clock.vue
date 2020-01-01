<template>
  <v-card class="mx-auto my-1" height="200">
    <v-card-title class="justify-center fill-height">
      <p class="mt-12">{{ currentTime | moment("dddd, MMMM Do YYYY") }}</p>
      <div style="flex-basis: 100%; height: 0px"></div>
      <p class="mb-12">{{ currentTime | moment("h:mm:ss a") }}</p>
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
