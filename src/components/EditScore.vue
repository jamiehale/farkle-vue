<template>
  <div class="modal">
    <h1>Editing Round {{ round }} Player {{ player }}</h1>
    <form @submit.prevent="update()">
      <label for="score">Score:</label>
      <input ref="editScore" type="number" v-model.number="newScore"></input>
      <button>Update</button>
    </form>
    <button @click="cancel">Cancel</button>
  </div>
</template>

<script>
export default {
  name: 'edit-score',
  props: ['round', 'player', 'score'],
  data() {
    return {
      newScore: this.score
    }
  },
  mounted() {
    this.$refs.editScore.focus();
    this.$refs.editScore.select();
  },
  methods: {
    update() {
      this.$emit('update', +this.newScore);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>
