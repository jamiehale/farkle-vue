<template>
  <div>
    <h1 class="anton f2">Game Setup</h1>
    <p>Add and arrange players, and then click "Start Game!"</p>
    <player-list v-model="allPlayers"></player-list>
    <new-player :allPlayers="allPlayers" @add-player="addPlayer($event)"></new-player>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue';
import NewPlayer from './NewPlayer.vue';

export default {
  name: 'game-setup',
  props: ['players'],
  components: { PlayerList, NewPlayer },
  data() {
    return {
      allPlayers: this.players
    }
  },
  computed: {
    readyToPlay() {
      return this.allPlayers.length > 0;
    }
  },
  methods: {
    addPlayer(playerName) {
      this.allPlayers = [...this.allPlayers, playerName];
    },
    removePlayer(name) {
      this.allPlayers = this.allPlayers.filter(p => p !== name);
    },
    startGame() {
      this.$store.dispatch('startGame', this.allPlayers);
      this.$router.push({ name: 'game' });
    }
  }
}
</script>
