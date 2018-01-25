<template>
  <draggable class="list pl0" element="ul" v-model="players">
    <li class="ba bw1 pa0 mv2 bg-light-gray" v-for="(player, index) in players" :key="player">
      <player :player="player" :index="index" @remove-player="removePlayer($event)"></player>
    </li>
  </draggable>
</template>

<script>
import Player from './Player.vue';
import draggable from 'vuedraggable';

export default {
  name: 'player-list',
  props: ['value'],
  components: { Player, draggable },
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
    removePlayer(name) {
      this.players = this.players.filter(p => p !== name);
    }
  }
}
</script>
