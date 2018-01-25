<template>
  <form class="mv4" @submit.prevent="addPlayer()">
    <input ref="playerName" type="text" v-model="newPlayerName">
    <button :disabled="!validPlayerName">Add Player</button>
  </form>
</template>

<script>
export default {
  name: 'new-player',
  props: ['allPlayers'],
  data() {
    return {
      newPlayerName: ''
    }
  },
  mounted() {
    this.$refs.playerName.focus();
    this.$refs.playerName.select();
  },
  computed: {
    validPlayerName() {
      return this.newPlayerName !== '' && !this.allPlayers.includes(this.newPlayerName);
    }
  },
  methods: {
    addPlayer() {
      this.$emit('add-player', this.newPlayerName);
      this.newPlayerName = '';
    }
  }
}
</script>
