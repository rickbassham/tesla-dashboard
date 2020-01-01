<script>
export default {
  created() {
    const self = this;
    setInterval(function() {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.matches && !self.$vuetify.theme.dark) {
        self.$vuetify.theme.dark = true;
        this.darkMode = true;
      } else if (!mq.matches && self.$vuetify.theme.dark) {
        self.$vuetify.theme.dark = false;
        this.darkMode = false;
      }
    }, 1000);
  },
  render() { return ''; }
};
</script>
