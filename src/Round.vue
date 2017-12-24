<template>
  <tr class="striped--light-gray">
  	<td class="pv2 ph1 bl br tc">{{ roundNumber }}</td>
    <score v-for="(score, index) in round" :score="score" :key="`${roundNumber}:${index}`" @edit="editScore(roundNumber - 1, index)"></score>
  </tr>
</template>

<script>
import Score from './Score.vue';

export default {
  name: 'round',
  components: { Score },
  props: ['round', 'roundNumber'],
  methods: {
    editScore(round, player) {
      this.$emit('edit-score', { round, player });
    }
  }
}
</script>
