<template>
  <div>
    <h1 class="anton f2">Game Setup</h1>
    <p>Add and arrange players, and then click "Start Game!"</p>
    <draggable class="list pl0" element="ul" v-model="allPlayers">
      <li class="ba bw1 pa0 mv2 bg-light-gray" v-for="(player, index) in allPlayers" :key="player">
        <player :player="player" :index="index" @remove-player="removePlayer($event)"></player>
      </li>
    </draggable>
    <form class="mv4" @submit.prevent="addPlayer()">
      <input ref="playerName" type="text" v-model="newPlayerName">
      <button :disabled="!validPlayerName">Add Player</button>
    </form>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
  </div>
</template>

<script>
import Player from './Player.vue';
import draggable from 'vuedraggable';

export default {
  name: 'game-setup',
  props: ['players'],
  components: { Player, draggable },
  data() {
    return {
      allPlayers: this.players,
      newPlayerName: ''
    }
  },
  mounted() {
    this.$refs.playerName.focus();
    this.$refs.playerName.select();
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
