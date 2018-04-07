<template>
  <div class="container is-fullhd">
    <div class="columns">
      <div class="column has-text-centered is-three-fifths is-offset-one-fifth">
        <img class="has-text-centered" src="~@/assets/logo.png">
        <h2 class="subtitle is-1">Labs</h2>
      </div>
    </div>
    <div class="columns">
      <div v-for="list in labsLists" class="column has-text-centered">
        <router-link :to="list.link">
          <menu-box :icon="list.icon" :size="boxSize" :active="isActive(list.link)">
            <span slot="label">{{ list.title }}</span>
          </menu-box>
        </router-link>
      </div>
    </div>
    <div class="container is-fullhd">
      <h2 class="subtitle has-text-centered">
        {{ activePageTitle }}
      </h2>
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
  },
})
export default class Labs extends Vue {

  get labsLists() {
    return this.$store.state.labsLists;
  }

  get activePageTitle() {
    const activePage = this.labsLists
      .filter( (list: TGlobalStore.ILabsList) => this.$route.path === list.link );
    if ( activePage.length ) {
      return activePage[0].title;
    } else {
      return '';
    }

  }

  get boxSize() {
    return this.$route.name === 'labs' ? 'small' : 'xsmall';
  }

  private isActive( link: string ) {
    return this.$route.path === link;
  }
}
</script>