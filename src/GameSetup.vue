<template>
  <div>
    <h1>Game Setup</h1>
    <ul>
      <li v-for="player in players" v-bind:key="player">{{ player }}</li>
    </ul>
    <form>
    </form>
    <button @click="startGame()">Start Game!</button>
  </div>
</template>

<script>
export default {
  name: 'game-setup',
  props: ['players'],
  methods: {
    startGame() {
      this.$emit('new-game', this.players);
    }
  }
}
</script>
