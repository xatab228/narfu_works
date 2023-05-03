<script setup lang="ts">
import {RouterView} from 'vue-router'
import NavBar from "@/components/bars/NavBar.vue";

</script>

<template>
  <v-app>
    <v-app-bar
      class="main-app-bar"
      app
      color="primary"
    >
      <v-app-bar-nav-icon icon="$file"/>
      <nav-bar/>
    </v-app-bar>
    <v-main class="app-main">
      <RouterView/>
    </v-main>
  </v-app>
</template>

<style lang="scss">
</style>
