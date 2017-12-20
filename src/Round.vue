<template>
  <div class="striped--light-gray">
  	<div class="w4 pv2 ph1 bl br tc">{{ roundNumber }}</div>
    <score class="w4 pv2 ph1 tc" v-for="(score, index) in round" v-bind:score="score" v-bind:key="`${roundNumber}:${index}`" v-on:edit="editScore(roundNumber - 1, index)"></score>
  </div>
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
