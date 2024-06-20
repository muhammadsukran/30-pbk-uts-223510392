<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-header" style="background-color: #3B3A3A;">
      <q-toolbar>
        <q-toolbar-title>
          Uas PBK
        </q-toolbar-title>
        <router-link to="/todos" class="nav-btn" active-class="active-btn">
          <q-btn flat label="Todos" />
        </router-link>
        <router-link to="/post" class="nav-btn" active-class="active-btn">
          <q-btn flat label="Posts" />
        </router-link>
        <router-link to="/album" class="nav-btn" active-class="active-btn">
          <q-btn flat label="Album" />
        </router-link>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style lang="scss">
@import 'quasar/src/css/index.sass';

.nav-btn {
  margin-right: 8px;
}

.active-btn .q-btn__content {
  font-weight: 600;
  border-bottom: 1.5px solid lightyellow;
}
</style>
