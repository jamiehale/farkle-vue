import Vue from 'vue'
import App from './App.vue'
import Farkle from './Farkle.vue'

new Vue({
  el: '#app',
  components: {
    'farkle': Farkle
  },
  render: h => h(App)
})
