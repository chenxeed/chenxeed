<template>
  <div>{{ content }}</div>
</template>
<script>
export default {
  name: 'ListText',
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
