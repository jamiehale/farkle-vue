<template>
  <div class="center w-90 tc">
    <h1 class="center">Farkle!</h1>
    <game-setup v-if="showSetup" v-on:new-game="startGame($event)" v-bind:players="players"></game-setup>
    <game v-if="showGame" v-on:game-complete="endGame($event)" v-bind:players="players"></game>
  </div>
</template>

<script>
import GameSetup from './GameSetup.vue';
import Game from './Game.vue';

export default {
  name: "farkle",
  components: { GameSetup, Game },
  data() {
    return {
      state: 'setup',
      players: ['A', 'B', 'C', 'D', 'E', 'F']
    };
  },
  methods: {
    startGame(players) {
      this.players = players;
      this.state = 'playing';
    },
    endGame(scores) {
      this.state = 'done';
    }
  },
  computed: {
    showSetup() {
      return this.state === 'setup';
    },
    showGame() {
      return this.state === 'playing' || this.state === 'done';
    }
  }
};
</script>
