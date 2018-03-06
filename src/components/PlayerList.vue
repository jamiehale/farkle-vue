<template>
  <div>
    <draggable class="list pl0" element="ul" v-model="players">
      <li class="ba bw1 pa0 mv2 bg-light-gray" v-for="(player, index) in players" :key="player">
        <player :player="player" :index="index" @remove-player="removePlayer($event)"></player>
      </li>
    </draggable>
    <new-player :players="players" @add-player="addPlayer($event)"></new-player>
  </div>
</template>

<script>
import Player from './Player.vue';
import NewPlayer from './NewPlayer.vue';
import draggable from 'vuedraggable';

export default {
  name: 'player-list',
  props: ['value'],
  components: { Player, NewPlayer, draggable },
  data() {
    return {
      players: this.value
    }
  },
  watch: {
    players(newPlayers) {
      this.$emit('input', newPlayers);
    }
  },
  methods: {
    addPlayer(name) {
      this.players = [...this.players, name];
    },
    removePlayer(name) {
      this.players = this.players.filter(p => p !== name);
    }
  }
}
</script>
