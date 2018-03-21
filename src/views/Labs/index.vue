<template>
  <div class="container is-fullhd">
    <router-link to="/labs/alien-invasion">
      <menu-box icon="xbox-controller" size="small">
        <span slot="label">Alien Invasion</span>
      </menu-box>
    </router-link>
    <div class="container is-fullhd">
      <router-view></router-view>
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
export default class Labs extends Vue {}
</script>