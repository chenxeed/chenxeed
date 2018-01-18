<template>
  <div>
    <input type="checkbox" v-on:change="clickCheckbox">
    <label>First task</label>
    <button>X</button>
  </div>
</template>
<script>
export default {
  name: 'todo',
  props: {

  }
}
</script>