<template>
  <div>
    <input type="text" v-on:input="inputForm" v-bind:value="input" />
    <button @click="submitForm">+</button>
  </div>
</template>
<script>
export default {
  name: 'input-form',
  data () {
    return {
      input: ''
    }
  },
  methods: {
    inputForm (e) {
      this.input = e.target.value
    },
    submitForm () {
      this.$emit('submit', this.input)
      this.input = ''
    }
  }
}
</script>
<style>
  
</style>