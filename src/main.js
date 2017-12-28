import Vue from 'vue'
import App from './App.vue'
import Farkle from './Farkle.vue'
import '!vue-style-loader!css-loader!tachyons/css/tachyons.css'

import VueJsModal from 'vue-js-modal'

Vue.use(VueJsModal, {
  dialog: true
})

new Vue({
  el: '#app',
  components: {
    'farkle': Farkle
  },
  render: h => h(App)
})
