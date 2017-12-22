<template>
  <div>
    <h1>Game Setup</h1>
    <ul>
      <li v-for="player in allPlayers" v-bind:key="player">
        {{ player }}
        <button @click="removePlayer(player)">Remove</button>
      </li>
    </ul>
    <form @submit.prevent="addPlayer()">
      <input type="text" v-model="newPlayerName">
      <button :disabled="!validPlayerName">Add Player</button>
    </form>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
  </div>
</template>

<script>
export default {
  name: 'game-setup',
  props: ['players'],
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
