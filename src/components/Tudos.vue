<template>
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
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';

const { todosActive: initialTodosActive, initialKegiatanList } = defineProps();

const todosActive = ref(initialTodosActive || true);
const kegiatanList = reactive(initialKegiatanList || [
  { judul: "Work Out", status: "belum selesai" },
  { judul: "Belajar skill baru", status: "selesai" },
  { judul: "Jalan-jalan", status: "belum selesai" }
]);
const judulBaru = ref('');
const notifMessage = ref('');
const originalKegiatanList = reactive([...kegiatanList]);
const isFiltered = ref(false);

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
</script>

  
<style>
  .Tudos{
    position: fixed;
    top: 20%;
    left: 38%;
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
</style>
  