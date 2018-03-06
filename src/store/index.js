import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

const loadGameState = () => {
  const { stage, players, rounds } = JSON.parse(window.localStorage.getItem('gameState') || '{}');
  return {
    stage: stage || 'setup',
    players: players || [],
    rounds: rounds || []
  };
}

const saveState = state => {
  const { stage, players, rounds } = state;
  window.localStorage.setItem('gameState', JSON.stringify({ stage, players, rounds }));
}

export default new Vuex.Store({
  state: loadGameState(),
  actions: {
    newGame(context) {
      context.commit('newGame');
    },
    startGame(context, players) {
      context.commit('startGame', players);
    },
    appendScore(context, score) {
      context.commit('appendScore', score);
    }
  },
  mutations: {
    newGame(state) {
      state.stage = 'setup';
      state.rounds = [];
      saveState(state);
    },
    startGame(state, players) {
      state.stage = 'playing';
      state.players = players;
      saveState(state);
    },
    appendScore(state, score) {
      if (state.rounds.length === 0) {
        state.rounds = [[score]];
      } else {
        if (state.rounds[state.rounds.length - 1].length === state.players.length) {
          state.rounds = [...state.rounds, [score]];
        } else {
          state.rounds = [...state.rounds.slice(0, state.rounds.length - 1), [...state.rounds[state.rounds.length - 1], score]];
        }
      }
      saveState(state);
    }
  },
  getters: {
    currentRound(state) {
      if (state.rounds.length === 0) {
        return 0;
      } else {
        return state.rounds.length - 1 + (state.rounds[-1].length === state.players.length ? 1 : 0);
      }
    },
    currentPlayer(state) {
      if (state.rounds.length === 0) {
        return 0;
      } else {
        return state.rounds[-1].length % state.players.length;
      }
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
