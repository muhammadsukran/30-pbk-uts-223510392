import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    todos: [
      { text: 'Edukasi', done: false },
      { text: 'Mabar', done: false },
      { text: 'Nongkrong', done: false }
    ]
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    updateTodoText(index, newText) {
      this.todos[index].text = newText;
    },
    toggleTodoComplete(index) {
      this.todos[index].done = !this.todos[index].done;
    }
  }
});
