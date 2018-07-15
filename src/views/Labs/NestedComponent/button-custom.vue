<template>
  <button-main class="button-custom"><slot></slot></button-main>
</template>
<script>
//
//
//

import ButtonMain from './button-main.vue';
export default {
  name : 'ButtonCustom',
  components : {
    ButtonMain
  }
};
</script>
<style lang="scss" scoped>
.button-custom {
  color: blue;
}
</style>