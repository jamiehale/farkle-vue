<template>
  <div class="flex flex-column center tc">
    <h1 class="anton f1 center">Farkle!</h1>
    <router-view></router-view>
    <help-modal></help-modal>
    <button @click="showHelp()">Help</button>
  </div>
</template>

<script>
import HelpModal from './HelpModal.vue';

export default {
  name: "farkle",
  components: { HelpModal },
  mounted() {
    if (this.$store.state.players.length === 0) {
      this.$router.push({ name: 'setup' });
    }
  },
  methods: {
    showHelp() {
      this.$modal.show('help');
    }
  }
};
</script>
