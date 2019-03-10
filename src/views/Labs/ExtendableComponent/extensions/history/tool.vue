<template>
  <div>
    <button
      class="button is-small"
      :disabled="disableUndo"
      @click="clickUndo">
      <i class="icon mdi mdi-arrow-left-bold"/>
    </button>
    <button
      class="button is-small"
      :disabled="disableRedo"
      @click="clickRedo">
      <i class="icon mdi mdi-arrow-right-bold"/>
    </button>
  </div>
</template>
<script>

export default {
  name: 'ToolHistory',
  props: {
    disableUndo: {
      type: Boolean,
      default: false
    },
    disableRedo: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clickUndo() {
      this.$emit('undo');
    },
    clickRedo() {
      this.$emit('redo');
    }
  }
};
</script>
