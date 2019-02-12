<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <p>Showcase on creating a component that have extendable interface
        by making use of the mixins.</p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <todo-vessel-app />
      </div>
    </div>
  </div>
</template>
<script>
import TodoVesselApp from './todo-vessel-app';

export default {
  name : 'ExtendableComponent',
  components : {
    TodoVesselApp
  },
  methods : {
  }
};
</script>
