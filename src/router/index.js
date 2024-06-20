import { createRouter, createWebHistory } from 'vue-router';
import Todos from '../components/Todos.vue';
import Post from '../components/Post.vue';
import Album from '../components/Album.vue';
import PhotoDetail from '../components/FotoAsli.vue'; 

const routes = [
  { path: '/', redirect: '/todos' },
  { path: '/todos', component: Todos },
  { path: '/post', component: Post },
  { path: '/album', component: Album },
  { path: '/album/:id', component: PhotoDetail }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
