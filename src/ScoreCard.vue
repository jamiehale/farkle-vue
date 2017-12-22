<template>
  <div class="flex flex-column f2 w-100 center">
    <div class="flex flex-row bb bw2 fw5">
      <div class="w4 pv2 ph1 tc">Round</div>
      <div class="w4 pv2 ph1 tc" v-for="player in players" v-bind:key="player">
        {{ player }}
      </div>
    </div>
    <round class="flex flex-row" v-for="(round, index) in roundTotals.totals" v-bind:round="round" v-bind:round-number="index + 1" v-bind:key="index" v-on:edit-score="editScore($event)"></round>
    <div class="flex flex-row bt bw2 fw5">
      <div class="w4 pv2 ph1 tc">Totals</div>
      <div class="w4 pv2 ph1 tc" v-for="(total, index) in playerTotals" v-bind:key="index">{{ total }}</div>
    </div>
  </div>
</template>

<script>
import Round from './Round.vue';

export default {
  name: 'score-card',
  components: { Round },
  props: ['players', 'roundTotals', 'playerTotals'],
  methods: {
    editScore({ round, player }) {
      this.$emit('edit-score', { round, player });
    }
  }
}
</script>
