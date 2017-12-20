import Vue from 'vue'
import App from './App.vue'
import Farkle from './Farkle.vue'
import '!vue-style-loader!css-loader!tachyons/css/tachyons.css'

new Vue({
  el: '#app',
  components: {
    'farkle': Farkle
  },
  render: h => h(App)
})
