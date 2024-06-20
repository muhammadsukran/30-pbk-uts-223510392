<template>
  <q-page class="q-pa-md">
    <q-list bordered separator class="List">
      <q-item v-for="photo in photos" :key="photo.id" clickable @click="navigateToPhoto(photo.id)">
        <q-item-section avatar>
          <q-img :src="photo.thumbnailUrl" />
        </q-item-section>
        <q-item-section>{{ photo.title }}</q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const photos = ref([]);
const router = useRouter();

onMounted(async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
  photos.value = response.data.slice(0, 10); 
});

function navigateToPhoto(id) {
  router.push(`/album/${id}`);
}
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.q-img {
  max-width: 100%;
  max-height: 100%;
}
.List{
  background-color: rgba(112, 110, 110, 0.5);
}
</style>
