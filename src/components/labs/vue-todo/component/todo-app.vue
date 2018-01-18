<template>
  <div>
    <h2>Todo App</h2>
      <input-form v-on:submit="addTodo"></input-form>
      <todo v-for="todo in todos" :uid="todo.id" :checked="todo.checked" v-on:remove="removeTodo" v-on:toggle-check="toggleCheckTodo">{{ todo.name }}</todo>
    </div>
</template>
<script>
import InputForm from './input-form'
import Todo from './todo'

export default {
  name: 'todo-app',
  data () {
    return {
      latestId: 0,
      todos: []
    }
  },
  methods: {
    addTodo (value) {
      this.todos.push({ id: ++this.latestId, name: value, checked: false })
    },
    removeTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleCheckTodo ({id, checked}) {
      this.todos.find(todo => todo.id === id).checked = checked
    }
  },
  components: {
    InputForm,
    Todo
  }
}
</script>