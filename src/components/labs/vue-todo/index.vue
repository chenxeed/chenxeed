<template>
  <div class="app-wrapper">
    <todo-app></todo-app>
  </div>
</template>
<script>
import TodoApp from './component/todo-app'

export default {
  name: 'vue-todo',
  components: {
    TodoApp
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