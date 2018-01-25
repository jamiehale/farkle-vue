<template>
  <div>
    <h1 class="anton f2">Game Setup</h1>
    <p>Add and arrange players, and then click "Start Game!"</p>
    <draggable class="list pl0" element="ul" v-model="allPlayers">
      <li class="ba bw1 pa0 mv2 bg-light-gray" v-for="(player, index) in allPlayers" :key="player">
        <player :player="player" :index="index" @remove-player="removePlayer($event)"></player>
      </li>
    </draggable>
    <new-player :allPlayers="allPlayers" @add-player="addPlayer($event)"></new-player>
    <button @click="startGame()" :disabled="!readyToPlay">Start Game!</button>
  </div>
</template>

<script>
import Player from './Player.vue';
import NewPlayer from './NewPlayer.vue';
import draggable from 'vuedraggable';

export default {
  name: 'game-setup',
  props: ['players'],
  components: { Player, NewPlayer, draggable },
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
