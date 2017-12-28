<template>
  <modal name="help" height="auto" :scrollable="true">
    <div class="ma3">
      <h1 class="anton">Help</h1>
      <p><a href="https://en.wikipedia.org/wiki/Farkle" target="_new">Farkle</a> is a folk dice game of chance and greed. Roll the dice, score points, and risk losing it all!</p>
      <h2 class="anton">Rules</h2>
      <p>Because it's a folk game, there are many sets of rules. After playing for years, <a href="">these are the rules</a> we play by.</p>
      <h2 class="anton">Scoring</h2>
      <p>To add points to the current player's score, simply type the number in the score field and hit <em>enter</em>. For example:</p>
      <pre>350[enter]</pre>
      <p>If the player <strong>Farkles</strong>, type:</p>
      <pre>f[enter]</pre>
      <p>Optionally, you can record the number of dice in the <strong>Farkle</strong> roll by typing the number after the "f". For example, record a 4-die <strong>Farkle</strong> like this:</p>
      <pre>f4[enter]</pre>
      <p>You can record "partial" scores - for example instantaneous scores when re-rolling a full set of dice - like this:</p>
      <pre>p350[enter]</pre>
      <p>You can record "carried" dice - "high stakes" dice carried forward from the previous player - like this:</p>
      <pre>c2[enter]</pre>
      <p>Partial scores and carried dice do not count towards the final recorded score for the round. For now, they're simply a visual way to keep track of the score on which the player is building.</p>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'help-modal',
  components: { }
}
</script>
