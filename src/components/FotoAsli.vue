<template>
    <q-page class="q-pa-md">
      <q-btn label="Back" @click="goBack" class="q-mb-md" />
      <q-card v-if="photo">
        <q-img :src="photo.url" />
        <q-card-section>
          <div class="text-h6">{{ photo.title }}</div>
        </q-card-section>
      </q-card>
      <q-spinner v-else />
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const router = useRouter();
  const photo = ref(null);
  
  onMounted(async () => {
    const id = route.params.id;
    const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
    photo.value = response.data;
  });
  
  function goBack() {
    router.push('/album');
  }
  </script>
  
  <style scoped>
  .q-page {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .q-mb-md {
    margin-bottom: 16px;
    align-items: start;
    background-color: lightsteelblue;
  }
  </style>
  