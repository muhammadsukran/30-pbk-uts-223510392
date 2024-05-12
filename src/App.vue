<template>
  <div class="background">
    <img src="https://i.ibb.co/7bWT6Lk/image.png" />
  </div>
  <div class="container">
    <nav class="navbar navbar-light">
      <button @click="toggleTodos" :class="{ 'active': todosActive }" class="navbar-brand btn btn-primary" style="color: white;">Todos</button>
      <button @click="togglePosts" :class="{ 'active': postsActive }" class="navbar-brand btn btn-primary" style="color: white;">Posts</button>
    </nav>
  </div>

  <div class="Tudos">
  <div v-if="todosActive" class="mt-5">
    <div class="filter-buttons">
      <button @click="filterStatus('belum selesai')">Tampilkan Belum Selesai</button>
      <button v-if="isFiltered" @click="resetFilter">Reset Filter</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Judul</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(kegiatan, index) in kegiatanList" :key="index">
          <td>{{ kegiatan.judul }}</td>
          <td>{{ kegiatan.status }}</td>
          <td>
            <button v-if="kegiatan.status === 'belum selesai'" @click="selesaiKegiatan(index)" class="btn btn-success" style="background-color: aquamarine; border: none; margin: 2px; font-weight: bold;">Selesai</button>
            <button v-if="kegiatan.status === 'selesai'" @click="batalKegiatan(index)" class="btn btn-warning" style="background-color: yellow; border: none; margin: 2px; font-weight: bold; ">Batal</button>
            <button @click="hapusKegiatan(index)" class="btn btn-danger" style="background-color: red; border: none; margin: 2px; font-weight: bold; ">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="input-container">
      <input type="text" placeholder="Tambah kegiatan" v-model="judulBaru" class="form-control">
      <button @click="tambahKegiatan" class="btn btn-primary">Tambah</button>
    </div>
    <div class="notif" v-if="notifMessage">{{ notifMessage }}</div>
  </div>
</div>

<div class="Post">
  <div v-if="postsActive" class="mt-5">
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
</div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const todosActive = ref(true);
const postsActive = ref(false);
const username = ref('');
const email = ref('');
const description = ref('');
const imageLink = ref('');
const posts = reactive([]);
const showPostsList = ref(false);
const selectedUsername = ref('');
const kegiatanList = reactive([
  { judul: "Work Out", status: "belum selesai" },
  { judul: "Belajar skill baru", status: "selesai" },
  { judul: "Jalan-jalan", status: "belum selesai" }
]);
const judulBaru = ref('');
const notifMessage = ref('');
const originalKegiatanList = reactive([...kegiatanList]);
const isFiltered = ref(false);

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

function toggleTodos() {
  todosActive.value = true;
  postsActive.value = false;
}

function togglePosts() {
  todosActive.value = false;
  postsActive.value = true;
}

function filterStatus(status) {
  if (status === 'semua') {
    kegiatanList.splice(0, kegiatanList.length, ...originalKegiatanList);
    isFiltered.value = false;
  } else {
    kegiatanList.splice(0, kegiatanList.length, ...originalKegiatanList.filter(kegiatan => kegiatan.status === status));
    isFiltered.value = true;
  }
}

function resetFilter() {
  kegiatanList.splice(0, kegiatanList.length, ...originalKegiatanList);
  isFiltered.value = false;
}

function selesaiKegiatan(index) {
  kegiatanList[index].status = "selesai";
  notifMessage.value = "Kegiatan telah diselesaikan.";
  tampilkanNotifikasi();
}

function batalKegiatan(index) {
  kegiatanList[index].status = "belum selesai";
  notifMessage.value = "Status kegiatan dikembalikan menjadi belum selesai.";
  tampilkanNotifikasi();
}

function hapusKegiatan(index) {
  kegiatanList.splice(index, 1);
  notifMessage.value = "Kegiatan berhasil dihapus.";
  tampilkanNotifikasi();
}

function tambahKegiatan() {
  if (judulBaru.value.trim() !== "") {
    kegiatanList.push({ judul: judulBaru.value, status: "belum selesai" });
    judulBaru.value = "";
    notifMessage.value = "Kegiatan berhasil ditambahkan.";
    tampilkanNotifikasi();
  } else {
    notifMessage.value = "Harap isi judul kegiatan terlebih dahulu.";
    tampilkanNotifikasi();
  }
}

function tampilkanNotifikasi() {
  setTimeout(() => {
    notifMessage.value = "";
  }, 1000);
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
.Tudos{
  position: fixed;
  top: 20%;
  left: 38%;
}
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
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid white;
  top: 30%;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: wheat;
  backdrop-filter: blur(5px);
}

th {
  background-color: gray;
  color: white;
  font-weight: bolder;
}
.filter-buttons {
  margin-bottom: 10px;
}

.filter-buttons button {
  background-color: transparent;
  backdrop-filter: blur(5px);
  border: 1px solid #007bff;
  color: #007bff;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}

.filter-buttons button:hover {
  background-color: #007bff;
  color: white;
}

.input-container {
  margin-top: 10px;
}

.input-container input {
  background-color: transparent;
  backdrop-filter: blur(10px);
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  margin-right: 10px;
}
.input-container input::placeholder{
  color: white !important;
}

.input-container button {
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
  backdrop-filter: blur(10px);
  margin-top: 10px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #007bff;
  color: white;
}

.notif {
  margin-top: 10px;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
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
