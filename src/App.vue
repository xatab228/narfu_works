<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from "@/components/bars/NavBar.vue";

</script>

<template>
   <v-app>
    <v-app-bar
      app
      color="primary"
    >
        <nav-bar/>
     </v-app-bar>
    <v-main class="app-main">
      <RouterView />
     </v-main>
  </v-app>
</template>

<style scoped>

</style>
