<template>
  <q-page class="q-pa-md">
    <q-form @submit.prevent="addPost">
      <q-input filled v-model="username" label="Username" class="custom-input" input-class="custom-input-text" />
      <q-input filled v-model="email" label="Email" class="custom-input" input-class="custom-input-text" />
      <q-input filled v-model="description" label="Description" class="custom-input" input-class="custom-input-text" />
      <q-input filled v-model="imageLink" label="Image Link" class="custom-input" input-class="custom-input-text" />
      <div class="q-mt-md">
        <q-btn style="background-color: lightslategrey;" label="Post" type="submit" />
      </div>
    </q-form>
    <div class="select-container q-mt-md">
      <label for="usernameSelect">Pilih User</label>
      <select id="usernameSelect" v-model="selectedPhoto" @change="showPhotoDetailsById">
        <option  value="">-- Pilih User --</option>
        <option v-for="photo in photos" :key="photo.id" :value="photo.id">
          {{ photo.title }}
        </option>
      </select>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const username = ref('');
const email = ref('');
const description = ref('');
const imageLink = ref('');
const posts = ref([]);
const photos = ref([]);
const selectedPhoto = ref('');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    posts.value = response.data.slice(0, 10); 
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function fetchPhotos() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    photos.value = response.data.slice(0, 3); 
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
}

onMounted(() => {
  fetchPosts();
  fetchPhotos();
});

function showPhotoDetailsById() {
  const selectedPhotoObj = photos.value.find(photo => photo.id === selectedPhoto.value);
  if (selectedPhotoObj) {
    Swal.fire({
      title: selectedPhotoObj.title,
      html: `
        <img src="${selectedPhotoObj.url}" alt="Photo image" style="max-width: 100%; height: auto;">
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#007bff',
      customClass: {
        container: 'my-swal'
      }
    });
  }
}

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
      posts.value.unshift(newPost);
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

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.custom-input .q-field__control {
  border: 1px solid gray;
  background-color: white;
}
.custom-input .q-field__label {
  color: white;
}
.custom-input input {
  color: white;
}
.custom-input-text::placeholder {
  color: white !important;
}
.select-container {
  width: 100%;
  max-width: 400px;
}
.select-container select {
  width: 100%;
  padding: 8px;
  border: 1px solid gray;
  border-radius: 4px;
}
.select-container label {
  display: block;
  margin-bottom: 8px;
  color: white;
}
</style>
