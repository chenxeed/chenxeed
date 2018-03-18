<template>
  <div id="app">
    <navbar/>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/layouts/navbar/index.vue';

@Component({
  components : {
    navbar : NavBar
  }
})

export default class App extends Vue {}
</script>
<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>