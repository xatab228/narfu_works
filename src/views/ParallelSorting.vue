<script setup lang="ts">
import {useParallel} from "@/utils/parallel";
import sortingFunctions, {SortingMethods} from "@/utils/sortingFunctions";
import {ref} from "vue";
import type {Ref} from "vue";

const sortingData: Ref<number[]> = ref([])
const createNewBigArray = (len: number, options?: {min?: number, max?: number}): Promise<number[]> => {
  const max = options && options.max ? options.max : 1000000;
  const min = options && options.min ? options.min : 0;
  return new Promise((resolve,reject) => {
    try {
      const newArray = Array.from({length: len}, (_,index) => Math.ceil(Math.random() * (max - min)));
      resolve(newArray)
    } catch (e) {
      reject(e)
    }
  })
}
const parallelOptions = {
  sortingMethod: SortingMethods.DEFAULT
}
const onCreateArray = () => {
  createNewBigArray(1000000).then((response) => {
    sortingData.value = response
  })
}

const onParallelSort = async () => {
  console.time("Parallel Sort");
  const parallelSort = await useParallel(sortingData.value, parallelOptions);
  console.timeEnd("Parallel Sort");
}
const onDefaultSort = async () => {
  console.time("Default Sort");
  const defSort = sortingFunctions[parallelOptions.sortingMethod](sortingData.value);
  console.timeEnd("Default Sort");
}
</script>

<template>
  <div>
    <span>Parallel</span>
    <v-btn
      text
      v-text="'createNewArray'"
      @click="onCreateArray"
    />
    <v-btn
      text
      v-text="'SortParallel'"
      @click="onParallelSort"
    />
    <v-btn
      text
      v-text="'DefaultSort'"
      @click="onDefaultSort"
    />
  </div>
</template>