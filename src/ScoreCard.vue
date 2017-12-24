<template>
  <table class="table collapse helvetica f4 w-100 center pa0 ma0">
    <thead>
      <tr class="bb bw2">
        <th class="w4 pv2 ph1 b tc">Round</th>
        <th class="w5 pv2 ph1 b tc" v-for="player in players" :key="player">
          {{ player }}
        </th>
      </tr>
    </thead>
    <tbody>
      <round v-for="(round, index) in roundTotals.totals" :round="round" :round-number="index + 1" :key="index" @edit-score="editScore($event)"></round>
    </tbody>
    <tfoot class="bt bw2 fw5">
      <tr>
        <th class="pv2 ph1 b tc">Totals</th>
        <th class="pv2 ph1 b tc" v-for="(total, index) in playerTotals" :key="index">{{ total }}</th>
      </tr>
    </tfoot>
  </table>
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
