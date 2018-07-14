<template>
  <div class="container">
    <p>
      A simple game to destroy Alien!
      Made with the help of library <a href="http://jquery.com/" target="_blank">jQuery</a> and <a href="http://dmitrybaranovskiy.github.io/raphael/" target="_blank">Raphael.js</a>
    </p>
    <p>
      <figure class="image is-128x128">
        <img src="~./screenshot.png">
      </figure>
    </p>
    <p>Play the game <a target="_blank" href="https://chenxeed.github.io/alien-invasion">here</a></p>
    <p>Check the source code in <a target="_blank" href="https://github.com/chenxeed/alien-invasion">here</a></p>
  </div>
</template>
<script lang="ts">
import { Vue } from 'vue-property-decorator';

export default class AlienInvasion extends Vue {}
</script>