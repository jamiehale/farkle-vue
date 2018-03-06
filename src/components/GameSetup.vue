<template>
  <div>
    <h1 class="anton f2">Game Setup</h1>
    <p>Add and arrange players, and then click "Start Game!"</p>
    <player-list v-model="allPlayers"></player-list>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
    <button @click="clearPlayerList()" :disabled="readyToPlay">Clear</button>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue';

export default {
  name: 'game-setup',
  components: { PlayerList },
  data() {
    return {
      allPlayers: this.$store.state.players
    }
  },
  computed: {
    readyToPlay() {
      return this.allPlayers.length > 0;
    }
  },
  methods: {
    startGame() {
      this.$store.dispatch('startGame', this.allPlayers);
      this.$router.push({ name: 'game' });
    },
    clearPlayerList() {
      this.allPlayers = [];
    }
  }
}
</script>
