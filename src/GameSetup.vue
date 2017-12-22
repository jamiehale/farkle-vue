<template>
  <div>
    <h1 class="f2">Game Setup</h1>
    <player-list :players="allPlayers" @remove-player="removePlayer($event)"></player-list>
    <form class="mv4" @submit.prevent="addPlayer()">
      <input type="text" v-model="newPlayerName">
      <button :disabled="!validPlayerName">Add Player</button>
    </form>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
  </div>
</template>

<script>
import PlayerList from './PlayerList.vue';

export default {
  name: 'game-setup',
  props: ['players'],
  components: { PlayerList },
  data() {
    return {
      allPlayers: this.players,
      newPlayerName: ''
    }
  },
  computed: {
    validPlayerName() {
      return this.newPlayerName !== '' && !this.allPlayers.includes(this.newPlayerName);
    },
    readyToPlay() {
      return this.allPlayers.length > 0;
    }
  },
  methods: {
    addPlayer() {
      this.allPlayers = [...this.allPlayers, this.newPlayerName];
      this.newPlayerName = '';
    },
    removePlayer(name) {
      this.allPlayers = this.allPlayers.filter(p => p !== name);
    },
    startGame() {
      this.$emit('new-game', this.allPlayers);
    }
  }
}
</script>
