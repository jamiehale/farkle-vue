import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    players: [],
    rounds: []
  },
  actions: {
    startGame(context, players) {
      context.commit('startGame', players);
    }
  },
  mutations: {
    startGame(state, players) {
      state.players = players;
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
