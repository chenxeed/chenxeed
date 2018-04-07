<template>
  <div class="container">
    <div class="columns">
      <div class="column has-text-centered is-three-fifths is-offset-one-fifth">
        <img class="has-text-centered" src="~@/assets/logo.png">
        <h2 class="subtitle is-1">Showcase Website</h2>
      </div>
    </div>
    <div class="columns has-text-centered">
      <div class="column">
        <router-link to="/labs">
          <menu-box icon="led-on">
            <div slot="label">
              Labs
            </div>
          </menu-box>
        </router-link>
      </div>
      <div class="column">
        <menu-box icon="library-books">
          <div slot="label">
            Blog <br/>
            <span class="is-size-6">Coming soon..</span>
            </div>
        </menu-box>
      </div>
      <div class="column">
        <router-link to="/about">
          <menu-box icon="human-greeting">
            <div slot="label">About</div>
          </menu-box>
        </router-link>
      </div>
    </div>


    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MenuBox from '@/components/menu-box/index.vue';

@Component({
  components : {
    'menu-box' : MenuBox
  }
})
export default class Home extends Vue {}
</script>
