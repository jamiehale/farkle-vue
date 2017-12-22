<template>
  <div class="flex flex-row justify-between mv3 ">
    <div class="tl pl3">
      <h1 class="f3">Round: {{ round }}</h1>
      <h1 class="f3">Player: {{ player }}</h1>
    </div>
    <div class="">
      <form class="flex flex-column" @submit.prevent="emitScore()">
        <input ref="score" class="tc" v-model.number="score" type="number" :class="style" @focus="focusOnInput()">
        <button class="mt2" :disabled="!isValidScore">Score</button>
      </form>
    </div>
  </div>
</template>

<script>
import { validScore } from './lib/validators';

export default {
  name: 'new-score',
  props: ['player', 'round'],
  data() {
    return {
      score: 0
    }
  },
  mounted() {
    this.$refs.score.focus();
    this.$refs.score.select();
  },
  methods: {
    focusOnInput() {
      this.$refs.score.select();
    },
    emitScore() {
      if (validScore(this.score)) {
        this.$emit('new-score', +this.score);
      }
      this.$refs.score.focus();
      this.$refs.score.select();
    }
  },
  computed: {
    style() {
      return ['ba', 'bw2', (this.isValidScore ? 'b--green': 'b--red')];
    },
    isValidScore() {
      return this.score !== '' && validScore(+this.score);
    }
  }
}
</script>
