<script setup lang="ts">
import {computed,} from "vue";
import {ROUTES} from "@/router";

type RouteListItem = {
  title: string,
  prependIcon?: string,
  value: string
}
const routes = computed<RouteListItem[]>(() => [
  {
    title: 'Parallel Sorting',
    value: ROUTES.PARALLEL_SORTING
  },
]);

</script>

<template>
  <v-navigation-drawer
    permanent
  >
    <v-list nav>
      <v-list-item
        v-for="(route, index) in routes"
        :key="index"
        :title="route.title"
        @click="$router.push(route.value)"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>

</style>