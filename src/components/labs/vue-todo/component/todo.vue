<template>
  <div>
    <input type="checkbox" @change="changeCheck">
    <label :class="{ checked : checked }" ><slot></slot></label>
    <button @click="remove">X</button>
  </div>
</template>
<script>
export default {
  name: 'todo',
  props: {
    uid: {
      type: Number
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove () {
      this.$emit('remove', this.uid)
    },
    changeCheck (e) {
      this.$emit('toggle-check', {id: this.uid, checked: e.target.checked})
    }
  }
}
</script>
<style>
.checked {
  text-decoration: line-through;
}
</style>