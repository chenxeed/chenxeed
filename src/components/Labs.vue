<template>
  <div class="labs__container">
    <h2>Check out some of my experiments</h2>
    <ul>
      <li>
        <router-link to="/labs/vue-split-files">Vue Split Files</router-link>
      </li>
      <li>
        <router-link to="/labs/vue-cycle-philosophy">Vue Component with CycleJS Philosophy</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'hello',
  // Events
  created () {
    this.updateTitle('Labs')
  },
  // Side Effect
  methods: {
    updateTitle (title) {
      this.$emit('update:title', title)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
