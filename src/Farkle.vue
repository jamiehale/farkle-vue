<template>
  <div class="flex flex-column center tc">
    <h1 class="anton f1 center">Farkle!</h1>
    <game-setup v-if="showSetup" v-on:new-game="onStartGame($event)" v-bind:players="players"></game-setup>
    <game v-if="showGame" v-on:game-complete="onEndGame($event)" v-bind:players="players"></game>
    <button v-if="showStartNew" @click="newGame()">Start New Game</button>
    <help-modal></help-modal>
    <button @click="showHelp()">Help</button>
  </div>
</template>

<script>
import GameSetup from './GameSetup.vue';
import Game from './Game.vue';
import HelpModal from './HelpModal.vue';

export default {
  name: "farkle",
  components: { GameSetup, Game, HelpModal },
  data() {
    return {
      state: 'setup',
      players: []
    };
  },
  methods: {
    onStartGame(players) {
      this.players = players;
      this.state = 'playing';
    },
    onEndGame(scores) {
      this.state = 'done';
    },
    newGame() {
      this.state = 'setup'
    },
    showHelp() {
      this.$modal.show('help');
    }
  },
  computed: {
    showSetup() {
      return this.state === 'setup';
    },
    showGame() {
      return this.state === 'playing' || this.state === 'done';
    },
    showStartNew() {
      return this.state === 'playing' || this.state === 'done';
    }
  }
};
</script>
