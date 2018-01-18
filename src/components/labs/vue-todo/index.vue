<template>
  <div class="app-wrapper">
    <h2>Todo App</h2>
    <input-form></input-form>
    <todo></todo>
  </div>
</template>
<script>
import InputForm from './component/input-form'
import Todo from './component/todo'

export default {
  name: 'vue-todo',
  components: {
    InputForm,
    Todo
  }
}
</script>
<style scoped>
  .app-wrapper {
    max-width: 600px;
    text-align: center;
    background: floralwhite;
  }
</style>