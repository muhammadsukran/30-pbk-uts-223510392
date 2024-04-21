<template>
  <div class="container">
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
</template>

<script>
export default {
  data() {
    return {
      kegiatanList: [
        { judul: "Work Out", status: "belum selesai" },
        { judul: "Belajar skill baru", status: "selesai" },
        { judul: "Jalan-jalan", status: "belum selesai" }
      ],
      judulBaru: "",
      notifMessage: "",
      originalKegiatanList: [],
      isFiltered: false
    };
  },
  created() {
    this.originalKegiatanList = [...this.kegiatanList];
  },
  methods: {
    filterStatus(status) {
      if (status === 'semua') {
        this.kegiatanList = [...this.originalKegiatanList];
        this.isFiltered = false;
      } else {
        this.kegiatanList = this.originalKegiatanList.filter(kegiatan => kegiatan.status === status);
        this.isFiltered = true;
      }
    },
    resetFilter() {
      this.kegiatanList = [...this.originalKegiatanList];
      this.isFiltered = false;
    },
    selesaiKegiatan(index) {
      this.kegiatanList[index].status = "selesai";
      this.notifMessage = "Kegiatan telah diselesaikan.";
      this.tampilkanNotifikasi();
    },
    batalKegiatan(index) {
      this.kegiatanList[index].status = "belum selesai";
      this.notifMessage = "Status kegiatan dikembalikan menjadi belum selesai.";
      this.tampilkanNotifikasi();
    },
    hapusKegiatan(index) {
      this.kegiatanList.splice(index, 1);
      this.notifMessage = "Kegiatan berhasil dihapus.";
      this.tampilkanNotifikasi();
    },
    tambahKegiatan() {
      if (this.judulBaru.trim() !== "") {
        this.kegiatanList.push({ judul: this.judulBaru, status: "belum selesai" });
        this.judulBaru = "";
        this.notifMessage = "Kegiatan berhasil ditambahkan.";
        this.tampilkanNotifikasi();
      } else {
        this.notifMessage = "Harap isi judul kegiatan terlebih dahulu.";
        this.tampilkanNotifikasi();
      }
    },
    tampilkanNotifikasi() {
      setTimeout(() => {
        this.notifMessage = "";
      }, 1000);
    }
  }
};
</script>

<style>
.container {
  margin: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  color: wheat;
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
  margin-top: 20px;
}

.input-container input {
  padding: 10px;
  border: 1px solid #007bff;
  border-radius: 5px;
  margin-right: 10px;
}

.input-container button {
  background-color: transparent;
  border: 1px solid #007bff;
  color: #007bff;
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
