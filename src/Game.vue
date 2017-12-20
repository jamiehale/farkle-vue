<template>
  <div class="ma0 pa0 w-90 center">
    <h1>Score Card</h1>
    <score-card v-bind:players="players" v-bind:round-totals="roundTotals" v-bind:player-totals="playerTotals" v-on:edit-score="editScore($event)"></score-card>
    <new-score v-if="isPlaying" v-on:new-score="appendScore($event)">
      <h1>Player: {{ players[currentPlayer] }} Round: {{ currentRound + 1 }}</h1>
    </new-score>
    <edit-score v-if="isEditing" v-bind:round="editing.round + 1" v-bind:player="players[editing.player]" v-bind:score="editing.score" v-on:update="updateScore($event)" v-on:cancel="cancelEdit()"></edit-score>
  </div>
</template>

<script>
import ScoreCard from './ScoreCard.vue';
import NewScore from './NewScore.vue';
import EditScore from './EditScore.vue';

const createPlayerRound = (score, total) => ({ score, total });

export default {
  name: 'game',
  props: ['players'],
  components: { ScoreCard, NewScore, EditScore },
  data() {
    return {
      state: 'playing',
      currentPlayer: 0,
      currentRound: 0,
      rounds: [],
      editing: {}
    };
  },
  methods: {
    appendScore(score) {
      if (this.rounds.length === 0) {
        this.rounds = [[score]];
      } else {
        if (this.rounds[this.rounds.length - 1].length === this.players.length) {
          this.rounds = [...this.rounds, [score]];
        } else {
          this.rounds = [...this.rounds.slice(0, this.rounds.length - 1), [...this.rounds[this.rounds.length - 1], score]];
        }
      }
      this.currentRound = this.rounds.length - 1;
      this.currentPlayer = this.rounds[this.currentRound].length;
      if (this.rounds[this.currentRound].length === this.players.length) {
        this.currentRound += 1;
        this.currentPlayer = 0;
      }
    },
    editScore({round, player}) {
      this.state = 'editing';
      this.editing = {
        round,
        player,
        score: this.rounds[round][player]
      };
    },
    updateScore(score) {
      const { round, player } = this.editing;
      this.state = 'playing';
      this.rounds = [
        ...this.rounds.slice(0, round),
        [
          ...this.rounds[round].slice(0, player),
          score,
          ...this.rounds[round].slice(player + 1)
        ],
        ...this.rounds.slice(round + 1)
      ];
    },
    cancelEdit() {
      this.state = 'playing';
    }
  },
  computed: {
    isPlaying() {
      return this.state === 'playing';
    },
    isEditing() {
      return this.state === 'editing';
    },
    roundTotals() {
    	return this.rounds.reduce((acc, round, i) => {
      	let thisRound;
        if (acc.lastRound) {
          thisRound = acc.lastRound
          	.slice(0, round.length)
            .map(r => r.total)
            .map((t, i) => createPlayerRound(round[i], t + round[i]));
        } else {
          thisRound = round.map(t => createPlayerRound(t, t));
        }
      	return {
        	totals: [...acc.totals, thisRound],
          lastRound: thisRound
        };
      }, { totals: [] });
    },
    playerTotals() {
      return this.rounds.reduce((acc, r) => {
        return acc.map((t, i) => r[i] ? t + r[i] : t);
      }, this.players.map(_ => 0));
    }
  }
}
</script>
