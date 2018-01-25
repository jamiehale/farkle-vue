<template>
  <div class="flex flex-column center tc">
    <h1 class="anton f1 center">Farkle!</h1>
    <game-setup v-if="showSetup" @new-game="onStartGame($event)" :players="players"></game-setup>
    <game v-if="showGame" @game-complete="onEndGame($event)" :players="players"></game>
    <button v-if="showStartNew" @click="newGame()">Start New Game</button>
    <help-modal></help-modal>
    <v-dialog></v-dialog>
    <button @click="showHelp()">Help</button>
  </div>
</template>

<script>
import GameSetup from './GameSetup.vue';
import Game from './Game.vue';
import HelpModal from './HelpModal.vue';

const loadState = () => {
  return window.localStorage.getItem('state') || 'setup';
};

const loadPlayers = () => {
  return JSON.parse(window.localStorage.getItem('players') || '[]');
};

const saveState = (state) => {
  window.localStorage.setItem('state', state);
};

const savePlayers = (players) => {
  window.localStorage.setItem('players', JSON.stringify(players));
};

export default {
  name: "farkle",
  components: { GameSetup, Game, HelpModal },
  data() {
    return {
      state: loadState(),
      players: loadPlayers()
    };
  },
  watch: {
    state(newState) {
      saveState(newState);
    },
    players(newPlayers) {
      savePlayers(newPlayers);
    }
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
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'This will reset all player scores.',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            }
          },
          {
            title: 'Yes',
            handler: () => {
              this.state = 'setup';
              this.$modal.hide('dialog');
            }
          }
        ]
      });
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
