<template>
  <div>
    <p>Check out my labs to see some of my experiments!</p>
  </div>
</template>

<script>

export default {
  name: 'home',
  created () {
    this.$emit('update:title', 'Homepage')
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>