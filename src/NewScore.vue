<template>
  <div>
    <slot></slot>
    <form @submit.prevent="emitScore()">
      <input ref="score" v-model.number="score" type="number" v-bind:class="style">
      <button :disabled="!isValidScore">Add</button>
    </form>
  </div>
</template>

<script>
import { validScore } from './lib/validators';

export default {
  name: 'new-score',
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
      return ['ba', 'bw3', (this.isValidScore ? 'b--green': 'b--red')];
    },
    isValidScore() {
      return this.score !== '' && validScore(+this.score);
    }
  }
}
</script>
