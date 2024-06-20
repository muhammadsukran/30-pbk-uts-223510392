<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section>
          <q-input
            v-model="newTodo"
            placeholder="Tambahkan Kegiatan"
            class="custom-input"
            input-class="custom-input-text"
          ></q-input>
        </q-item-section>
        <q-item-section>
          <q-btn 
            @click="addTodo" 
            label="Add" 
            color="blue">
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item v-for="(todo, index) in todos" :key="index">
        <q-item-section>
          <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">{{ todo.text }}</span>
        </q-item-section>
        <q-item-section>
          <q-btn 
            @click="editTodo(index)" 
            label="Edit" 
            color="blue">
        </q-btn>
        </q-item-section>

        <q-item-section>
          <q-btn
            @click="toggleComplete(index)"
            :label="todo.done ? 'Incomplete' : 'Complete'"
            :color="todo.done ? 'orange' : 'green'"
          ></q-btn>
        </q-item-section>
        <q-item-section>
          <q-btn 
            @click="deleteTodo(index)" 
            label="Delete" 
            color="red">
          </q-btn>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useMainStore } from '../stores';
import { QItem, QItemSection, QBtn, QList, QInput, QPage } from 'quasar';

export default {
  components: {
    QItem,
    QItemSection,
    QBtn,
    QList,
    QInput,
    QPage
  },
  setup() {
    const store = useMainStore();
    const newTodo = ref('');
    const todos = ref(store.todos);

    const addTodo = () => {
      if (newTodo.value.trim()) {
        store.addTodo({
          text: newTodo.value,
          done: false
        });
        newTodo.value = '';
      }
    };

    const deleteTodo = (index) => {
      store.deleteTodo(index);
    };

    const editTodo = (index) => {
      Swal.fire({
        title: 'Edit Todo',
        input: 'text',
        inputValue: todos.value[index].text,
        showCancelButton: true,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        preConfirm: (newText) => {
          if (!newText.trim()) {
            Swal.showValidationMessage('Text cannot be empty');
            return false;
          }
          return newText;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          store.updateTodoText(index, result.value);
        }
      });
    };

    const toggleComplete = (index) => {
      store.toggleTodoComplete(index);
    };

    return {
      newTodo,
      todos,
      addTodo,
      deleteTodo,
      editTodo,
      toggleComplete
    };
  }
};
</script>

<style>

span {
  color: white;
}

.custom-input input {
  color: white !important;
  border-bottom: 1px solid white;
  border-color: gray !important;;
}

.custom-input .q-field__control-container {
  color: white !important;
}

.custom-input-text::placeholder {
  color: white !important;
}
</style>
