<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        Showcasing the behavior of creating a transparent wrapper component
        to wrap the main component with custom functionality.
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <h3>The Main Component</h3>
        <component-main
          name="Roberto"
          work="developer"
          @hit="onHitMain" />
      </div>
      <div class="column">
        <h3>The Transparent Component</h3>
        <component-transparent
          name="Rosalinda"
          work="designer"
          @hit="onHitMain" />
      </div>
    </div>
    <div class="columns">
      <div class="column">
        Showcasing the performance concern of rendering a transparent wrapper component
        with direct bypass (v-on & v-bind) versus manual bypass.
        <br>
        <i>note: To see the performance, try to choose one of the option below,
          then try to scroll as fast as you can, and check the "Runtime between"
          to show the time delay between each scroll event.
          The lower the score, means that the better the performance.</i>
        <br>
        Main <input type="radio" name="toShow" @click="changeToShow('main')" />
        Transparent (v-on & v-bind) <input type="radio" name="toShow" @click="changeToShow('transparent')" />
        Transparent (Manual) <input type="radio" name="toShow" @click="changeToShow('transparent-manual')" />
      </div>
    </div>
    <div class="columns">
      <div
        v-if="show === 'main'"
        class="column scroll-wrapper"
        @scroll="onScroll">
        <div class="float-label">
          <h3>The Main Component</h3>
          <div>Scroll Position: {{ scrollPosition }}</div>
          <div>Runtime between: {{ runtimeBetweenScroll }}</div>
        </div>
        <component-main
          v-for="i in bigArray"
          :key="i"
          name="Roberto"
          work="developer"
          @hit="onHitMain" />
      </div>
      <div
        v-else-if="show === 'transparent'"
        class="column scroll-wrapper"
        @scroll="onScroll">
        <div class="float-label">
          <h3>The Transparent (v-on & v-bind) Component</h3>
          <div>Scroll Position: {{ scrollPosition }}</div>
          <div>Runtime between: {{ runtimeBetweenScroll }}</div>
        </div>
        <component-transparent
          v-for="i in bigArray"
          :key="i"
          name="Rosalinda"
          work="designer"
          @hit="onHitMain" />
      </div>
      <div
        v-else-if="show === 'transparent-manual'"
        class="column scroll-wrapper"
        @scroll="onScroll">
        <div class="float-label">
          <h3>The Transparent (Manual) Component</h3>
          <div>Scroll Position: {{ scrollPosition }}</div>
          <div>Runtime between: {{ runtimeBetweenScroll }}</div>
        </div>
        <component-transparent-manual
          v-for="i in bigArray"
          :key="i"
          name="Rosalinda"
          work="designer"
          @hit="onHitMain" />
      </div>
    </div>
  </div>
</template>
<script>
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

import ComponentMain from './component-main.vue';
import ComponentTransparent from './component-transparent.vue';
import ComponentTransparentManual from './component-transparent-manual.vue';

export default {
  name : 'TransparentWrapperComponent',
  components : {
    ComponentMain,
    ComponentTransparent,
    ComponentTransparentManual
  },
  data() {
    const bigArray = [];
    for (let i = 0; i < 5000; i++) {
      bigArray.push(i);
    }
    return {
      bigArray: Object.freeze(bigArray),
      scrollPosition: 0,
      timeOnScroll: Date.now(),
      runtimeBetweenScroll: 0,
      show: ''
    };
  },
  methods : {
    onHitMain(evt) {
      alert(evt);
    },
    onScroll(evt) {
      this.scrollPosition = evt.target.scrollTop;
      this.runtimeBetweenScroll = Date.now() - this.timeOnScroll;
      this.timeOnScroll = Date.now();
    },
    changeToShow(toShow) {
      this.show = toShow;
    }
  }
};
</script>
<style lang="scss" scoped>
.scroll-wrapper {
  position: relative;
  height: 400px;
  overflow: auto;

  .float-label {
    position: sticky;
    top: 0;
    background: white;
    border: 1px solid black;
    z-index: 10;
    text-align: center;
  }
}
</style>