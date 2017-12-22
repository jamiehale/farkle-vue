<template>
  <ul class="list pl0">
    <li class="ba bw1 pa3 mv2 flex flex-row items-center justify-between" v-for="(player, index) in players" :key="player">
      <p>
        Player {{ index + 1 }}:
        {{ player }}
      </p>
      <div class="">
        <button @click="removePlayer(player)">Remove</button>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'player-list',
  props: ['players'],
  methods: {
    removePlayer(player) {
      this.$emit('remove-player', player);
    }
  }
}
</script>
