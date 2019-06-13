<template>
  <component-main
    :name="name"
    :work="work"
    @hit="onHit"
    />
</template>
<script>
//
//
//
//
//
//
//

import ComponentMain from './component-main.vue';
export default {
  name : 'ComponentTransparentManual',
  components : {
    ComponentMain
  },
  props: {
    name : {
      type : String,
      default : 'Albert'
    },
    work : {
      type : String,
      default : 'developer'
    }
  },
  methods: {
    onHit($event) {
      this.$emit('hit', $event);
    }
  }
};
</script>
<style lang="scss" scoped>
.button-custom {
  color: blue;
}
</style>