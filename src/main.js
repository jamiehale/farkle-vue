import Vue from 'vue'
import App from './components/App.vue'
import Farkle from './components/Farkle.vue'
import '!vue-style-loader!css-loader!tachyons/css/tachyons.css'

import VueJsModal from 'vue-js-modal'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(VueJsModal, {
  dialog: true
})

Vue.use(VueRouter);
Vue.use(Vuex)

import GameSetup from './components/GameSetup.vue';
import Game from './components/Game.vue';

const routes = [
  {
    path: '/setup',
    name: 'setup',
    component: GameSetup
  },
  {
    path: '/',
    name: 'game',
    component: Game
  }
];

const router = new VueRouter({
  routes
});

import store from './store';

new Vue({
  el: '#app',
  router,
  store,
  components: {
    'farkle': Farkle
  },
  render: h => h(App)
});
