<template>
  <div class="flex flex-row justify-between mv3 ">
    <div class="tl pl3">
      <h1 class="f3">Round: {{ round }}</h1>
      <h1 class="f3">Player: {{ player }}</h1>
    </div>
    <div>
      <h1 class="f4">Partials:</h1>
      <ol>
        <li v-for="(partial, index) in partials" :key="index">{{ partial }}</li>
      </ol>
      <p>Total: {{ runningTotal }}</p>
    </div>
    <div class="">
      <form class="flex flex-column" @submit.prevent="addScore()">
        <input ref="score" class="tc" v-model="codedScore" type="text" :class="style" @focus="focusOnInput()">
        <button class="mt2" :disabled="!isValidScore">Score</button>
      </form>
    </div>
  </div>
</template>

<script>
import { validScore, partialScore, isPartial, mergeScore } from './lib/validators';

export default {
  name: 'new-score',
  props: ['player', 'round'],
  data() {
    return {
      codedScore: '0',
      partials: []
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
    addScore() {
      if (isPartial(this.codedScore)) {
        this.partials = [...this.partials, partialScore(this.codedScore)];
      } else {
        this.$emit('new-score', mergeScore(this.codedScore, this.partials));
      }
      this.$refs.score.focus();
      this.$refs.score.select();
    }
  },
  computed: {
    style() {
      return ['ba', 'bw2', (this.isValidScore ? 'b--green': 'b--red')];
    },
    runningTotal() {
      return this.partials.reduce((sum, score) => sum + score, 0);
    },
    isValidScore() {
      return validScore(this.codedScore);
    }
  }
}
</script>
