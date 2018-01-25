<template>
  <td class="w5 pv2 ph1 tc br pa0 ma0" v-if="score" @click="edit()">
    <div class="flex flex-row">
      <div class="w-50 tr">{{ score.score }}</div>
      <div class="w-50 fw6 tr">{{ score.total }}</div>
    </div>
  </td>
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
