import Vue from 'vue'
import App from './App.vue'
import Farkle from './Farkle.vue'
import '!vue-style-loader!css-loader!tachyons/css/tachyons.css'

import VueJsModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueJsModal, {
  dialog: true
})

Vue.use(VueRouter);
Vue.use(Vuex)

import GameSetup from './GameSetup.vue';
import Game from './Game.vue';

const routes = [
  {
    path: '/setup',
    component: GameSetup
  },
  {
    path: '/',
    component: Game
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  router,
  el: '#app',
  components: {
    'farkle': Farkle
  },
  render: h => h(App)
})
