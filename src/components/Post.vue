<template>
    <div class="Post">
    <div class="post">
      <form @submit.prevent="addPost">
        <h1>Postingan</h1>
        <div class="form-group">
          <label for="username">Username :</label>
          <input v-model="username" type="text" class="form-control" id="username" placeholder="Username" required>
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input v-model="email" type="email" class="form-control" id="email" placeholder="Email" required>
        </div>
        <div class="form-group">
          <label for="description">Description :</label>
          <input v-model="description" type="text" class="form-control" id="description" placeholder="Description" required>
        </div>
        <div class="form-group">
          <label for="imageLink">Image Link :</label>
          <input v-model="imageLink" type="text" class="form-control" id="imageLink" placeholder="Image Link" required>
        </div>
        <button type="submit" class="btn btn-primary b1">Post</button>
        <button @click="showPostsList = !showPostsList" class="btn btn-secondary ml-3 b2">
          {{ showPostsList ? 'Hide' : 'Show' }} Posts
        </button>
      </form>
    </div>
    <select v-if="showPostsList" v-model="selectedUsername" class="mt-3 btn btn-success">
      <option value="">Select Username</option>
      <option v-for="(post, index) in posts" :key="index" :value="post.username">{{ post.username }}</option>
    </select>
  </div>
  </template>
  
  <script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const username = ref('');
const email = ref('');
const description = ref('');
const imageLink = ref('');
const posts = reactive([]);
const showPostsList = ref(false);
const selectedUsername = ref('');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts.value = response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

onMounted(fetchPosts);

function showPostDetailsByUsername(username) {
  const selectedPost = posts.find(post => post.username === username);
  if (selectedPost) {
    Swal.fire({
      title: `Post by ${username}`,
      html: `
        <p><strong>Email:</strong></p>
        <p>${selectedPost.email}</p>
        <p><strong>Description:</strong></p>
        <p>${selectedPost.description}</p>
        <img src="${selectedPost.imageLink}" alt="Post image" style="max-width: 100%; height: auto;">
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#007bff',
      customClass: {
        container: 'my-swal'
      }
    });
  } 
}

watch(selectedUsername, showPostDetailsByUsername);

function addPost() {
  const newPost = {
    username: username.value,
    email: email.value,
    description: description.value,
    imageLink: imageLink.value,
    id: Date.now(),
  };

  axios.post('https://jsonplaceholder.typicode.com/posts', newPost)
    .then(response => {
      posts.unshift(newPost);
      username.value = '';
      email.value = '';
      description.value = '';
      imageLink.value = '';
      Swal.fire('Post added!', 'Your new post has been added successfully!', 'success');
    })
    .catch(error => {
      console.error('Error adding post:', error);
      Swal.fire('Error!', 'Failed to add post. Please try again later.', 'error');
    });
}
</script>

  
  <style>
  .Post{
  position: fixed;
  width: 20%;
  top: 15%;
  left: 42%;
}
.Post h1{
  color: white;
  font-weight: bold;
  font-family: Courier, monospace;
  text-align: center;
}

.form-group label {
  color: white;
}
.form-group input {
  background-color: transparent;
  color: white;
  backdrop-filter: blur(5px);
}
.form-group input::placeholder{
  color: white;
}
.b1{
  margin-top: 10px;
}
.b2{
  margin-top: 10px;
  margin-left: 10px;
}

  </style>
  