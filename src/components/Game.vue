<template>
  <div class="ma0 pa0 w-90 center">
    <h1>Score Card</h1>
    <score-card :players="players" :round-totals="roundTotals" :player-totals="playerTotals" @edit-score="editScore($event)"></score-card>
    <new-score v-if="isPlaying" :player="players[currentPlayer]" :round="currentRound + 1" @new-score="appendScore($event)"></new-score>
    <edit-score v-if="isEditing" :round="editing.round + 1" :player="players[editing.player]" :score="editing.score" @update="updateScore($event)" @cancel="cancelEdit()"></edit-score>
    <button v-if="showStartNew" @click="newGame()">Start New Game</button>
    <v-dialog></v-dialog>
  </div>
</template>

<script>
import ScoreCard from './ScoreCard.vue';
import NewScore from './NewScore.vue';
import EditScore from './EditScore.vue';

const createPlayerRound = (score, total) => ({ score, total });

export default {
  name: 'game',
  components: { ScoreCard, NewScore, EditScore },
  data() {
    return {
      editing: {}
    };
  },
  methods: {
    newGame() {
      this.$modal.show('dialog', {
        title: 'Are you sure?',
        text: 'This will reset all player scores.',
        buttons: [
          {
            title: 'Cancel',
            handler: () => {
              this.$modal.hide('dialog');
            }
          },
          {
            title: 'Yes',
            handler: () => {
              this.$store.dispatch('newGame');
              this.$router.push({ name: 'setup' });
              this.$modal.hide('dialog');
            }
          }
        ]
      });
    },
    appendScore(score) {
      this.$store.dispatch('appendScore', score);
    },
    editScore({round, player}) {
      this.state = 'editing';
      this.editing = {
        round,
        player,
        score: this.rounds[round][player].score
      };
    },
    updateScore(score) {
      const { round, player } = this.editing;
      this.state = 'playing';
      this.rounds = [
        ...this.rounds.slice(0, round),
        [
          ...this.rounds[round].slice(0, player),
          {
            ...this.rounds[round][player],
            score
          },
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
      return this.$store.state === 'playing';
    },
    isEditing() {
      return this.$store.state === 'editing';
    },
    showStartNew() {
      return this.$store.state.stage === 'playing' || this.$store.state.stage === 'done';
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
    currentRound() {
      return this.$store.state.currentRound;
    },
    players() {
      return this.$store.state.players;
    },
    rounds() {
      return this.$store.state.rounds;
    },
    roundTotals() {
    	return this.rounds.reduce((acc, round, i) => {
      	let thisRound;
        if (acc.lastRound) {
          thisRound = acc.lastRound
          	.slice(0, round.length)
            .map(r => r.total)
            .map((t, i) => createPlayerRound(round[i].score, t + round[i].score));
        } else {
          thisRound = round.map(t => createPlayerRound(t.score, t.score));
        }
      	return {
        	totals: [...acc.totals, thisRound],
          lastRound: thisRound
        };
      }, { totals: [] });
    },
    playerTotals() {
      return this.rounds.reduce((acc, r) => {
        return acc.map((t, i) => r[i] ? t + r[i].score : t);
      }, this.players.map(_ => 0));
    }
  }
}
</script>
