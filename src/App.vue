<template>
  <div class="background">
    <img src="https://i.ibb.co/7bWT6Lk/image.png" />
  </div>
  <div class="container">
    <nav class="navbar navbar-light">
      <button @click="toggleTodos" :class="{ 'active': todosActive }" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
      <button @click="togglePosts" :class="{ 'active': postsActive }" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
    </nav>
    <div v-if="todosActive" class="mt-5">
    <Todos />
    </div>
    <div v-if="postsActive" class="mt-5">
    <Post />
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Todos from './components/Tudos.vue';
import Post from './components/Post.vue';

const todosActive = ref(true);
const postsActive = ref(false);

function toggleTodos() {
  todosActive.value = true;
  postsActive.value = false;
}

function togglePosts() {
  todosActive.value = false;
  postsActive.value = true;
}

</script>

<style>
.container {
  max-width: 100%; 
}

.navbar {
  position: fixed; 
  display: flex;
  top: -10%;
  max-width: 100%;
  transform: translateX(-60%);
  margin-top: -335px;
  z-index: 1000;
  width: 100%;
}
.navbar button {
  position: relative;
  margin-left: 100px;
}

.active {
  background-color: #0056b3;
}


.background img{
  position: fixed;
  top: 0;
  left: 0;
  min-height: 90%;
  min-width: 1500px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  object-fit: cover;
  -webkit-background-size:cover; -moz-background-size:cover; -o-background-size:cover; background-size: cover;
  filter: brightness(0.8);
}
</style>
