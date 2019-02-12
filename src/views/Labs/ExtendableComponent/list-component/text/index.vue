<template>
  <div>{{ content }}</div>
</template>
<script>
//
//
//

export default {
  props: {
    item: {
      default: {}
    }
  },
  computed: {
    content() {
      return this.item.content;
    }
  }
};
</script>
