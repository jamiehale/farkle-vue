<template>
  <div class="flex flex-row br justify-center" v-if="score" @click="edit()">
    <div class="w-50 tr">{{ score.score }}</div>
    <div class="w-50 fw6 tr">{{ score.total }}</div>
  </div>
</template>

<script>
export default {
  name: 'score',
  props: ['score'],
  methods: {
    edit() {
      this.$emit('edit');
    }
  }
}
</script>
