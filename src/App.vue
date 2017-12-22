<template>
  <div id="app" class="flex flex-column center w-80">
    <farkle class=""></farkle>
  </div>
</template>

<script>
import Farkle from './Farkle.vue';

export default {
  name: 'app',
  components: { Farkle }
}
</script>

<style>
#app {
  font-family: 'Anton', helvetica, sans-serif;
}
</style>
