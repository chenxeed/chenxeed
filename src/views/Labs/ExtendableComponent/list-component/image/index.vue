<template>
  <div><img :src="src" /></div>
</template>
<script>
//
//
//

export default {
  name: 'ListImage',
  props: {
    item: {
      default: {}
    }
  },
  computed: {
    src() {
      return this.item.src;
    }
  }
};
</script>
