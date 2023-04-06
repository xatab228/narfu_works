<script setup lang="ts">
import {useParallel} from "@/utils/parallel";

useParallel([1,2,3,4,5], (n) => n);

</script>

<template>
  <div>
    <span>Parallel</span>
  </div>
</template>