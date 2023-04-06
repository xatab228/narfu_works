<script setup lang="ts">
import {computed} from "vue";
import {ROUTES} from "@/router";

type RouteBtn = {
    name: string,
    icon: string,
    path: string
}

const routeButtons = computed<RouteBtn[]>(() => [
    {
      name: 'Parallel Sorting',
      icon: 'mdi-heart',
      path: ROUTES.PARALLEL_SORTING
    },
    {
        name: 'Cellular Automaton',
        icon: 'mdi-heart',
        path: ROUTES.CELLURAR_AUTOMATION
    },
    {
        name: 'Settings',
        icon: 'mdi-heart',
        path: ROUTES.SETTINGS
    }
])

</script>

<template>
    <div class="navbar">
        <v-btn
                v-for="(routeBtn, index) in routeButtons"
                :key="index"
                @click="$router.push(routeBtn.path)"
        >
            <span>{{ routeBtn.name }}</span>
        </v-btn>
    </div>
</template>

<style lang="scss">
.navbar {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  padding: 0 16px;
}
</style>