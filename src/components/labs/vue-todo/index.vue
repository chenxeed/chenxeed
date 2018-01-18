<template>
  <div class="app-wrapper">
    <h2>Todo App</h2>
    <input-form v-on:submit="addTodo"></input-form>
    <todo v-for="todo in todos" :uid="todo.id" @remove="removeTodo">{{ todo.name }}</todo>
  </div>
</template>
<script>
import InputForm from './component/input-form'
import Todo from './component/todo'

export default {
  name: 'vue-todo',
  data () {
    return {
      latestId: 0,
      todos: []
    }
  },
  methods: {
    addTodo (value) {
      this.todos.push({ id: ++this.latestId, name: value })
    },
    removeTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    }
  },
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