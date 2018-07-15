<template>
  <div class="container">
    <div class="column">
      A simple game to destroy Alien!
      Made with the help of library <a href="http://jquery.com/" target="_blank">jQuery</a> and <a href="http://dmitrybaranovskiy.github.io/raphael/" target="_blank">Raphael.js</a>.
    </div>
    <div class="column">
      <figure class="image is-128x128">
        <img src="~./screenshot.png">
      </figure>
    </div>
    <div class="column">
      Play the game <a target="_blank" href="https://chenxeed.github.io/alien-invasion">here</a> or check the source code in <a target="_blank" href="https://github.com/chenxeed/alien-invasion">here</a>.</div>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class AlienInvasion extends Vue {}
</script>