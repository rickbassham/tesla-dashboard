<template>
  <iframe
    :src="this.src"
    width="100%"
    height="100%"
    style="border: 0;"
  />
</template>
<script>
export default {
  props: {
    src: String,
  },
};
</script>