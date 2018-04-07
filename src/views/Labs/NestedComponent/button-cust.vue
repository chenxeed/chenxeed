<template>
  <main-button class="cust-button">Customize</main-button>
</template>
<script>
//
//
//

import MainButton from './button.vue';
export default {
  name : 'CustButton',
  components : {
    MainButton
  }
};
</script>
<style lang="scss">
.main-button {
  &.cust-button {
    color: blue;
  }
}
</style>