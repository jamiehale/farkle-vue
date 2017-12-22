<template>
  <div class="flex flex-row items-center justify-between">
    <p>
      Player {{ index + 1 }}:
      {{ player }}
    </p>
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
