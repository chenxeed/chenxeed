<template>
  <div>
    <input type="checkbox">
    <label><slot></slot></label>
    <button @click="remove">X</button>
  </div>
</template>
<script>
export default {
  name: 'todo',
  props: {
    uid: {
      type: Number
    }
  },
  methods: {
    remove () {
      this.$emit('remove', this.uid)
    }
  }
}
</script>