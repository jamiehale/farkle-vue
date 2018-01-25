<template>
  <div class="flex flex-row items-center justify-between ma2">
    <div class="flex flex-column pa0">
      <p class="ma0 tl fw5">Player {{ index + 1 }}</p>
      <h1 class="anton">{{ player }}</h1>
    </div>
    <div class="">
      <button @click="removePlayer(player)">Remove</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'player',
  props: ['player', 'index'],
  methods: {
    removePlayer(player) {
      this.$emit('remove-player', player);
    }
  }
}
</script>
