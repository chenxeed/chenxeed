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

// global extended components
import ComponentMain from './component-main.vue';
import ComponentTransparent from './component-transparent.vue';

export default {
  name : 'TransparentWrapperComponent',
  components : {
    ComponentMain,
    ComponentTransparent
  },
  methods : {
    onHitMain(evt) {
      alert(evt);
    }
  }
};
</script>