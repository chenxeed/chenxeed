<template>
  <component-main
    v-bind="$attrs"
    v-on="$listeners"
    />
</template>
<script>
import ComponentMain from './component-main.vue';
export default {
  name : 'ComponentTransparent',
  components : {
    ComponentMain
  }
};
</script>
<style lang="scss" scoped>
.button-custom {
  color: blue;
}
</style>