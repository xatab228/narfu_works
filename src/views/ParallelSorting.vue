<script setup lang="ts">
import {useParallel} from "@/utils/parallel";
import sortingFunctions, {SortingMethods} from "@/utils/sortingFunctions";
import {ref} from "vue";
import type {Ref} from "vue";

const sortingData: Ref<number[]> = ref([])
const isLoadingParallel = ref<boolean>(false);
const parallelSortingTime = ref<number>(0);
const isLoadingDefault = ref<boolean>(false);
const defaultSortingTime = ref<number>(0);
const arrayLength = ref<number>(1000000);
const createArrayBtnIsLoading = ref<boolean>(false);

const createNewBigArray = (len: number, options?: {min?: number, max?: number}): Promise<number[]> => {
  const max = options && options.max ? options.max : 1000000;
  const min = options && options.min ? options.min : 0;
  return new Promise((resolve,reject) => {
    try {
      const newArray = Array.from({length: len}, () => Math.ceil(Math.random() * (max - min)));
      resolve(newArray)
    } catch (e) {
      reject(e)
    }
  })
}
const parallelOptions = {
  sortingMethod: SortingMethods.QUICK
}
const onCreateArray = () => {
  createArrayBtnIsLoading.value = true;
  createNewBigArray(arrayLength.value)
    .then((response) => {
      sortingData.value = response;
      createArrayBtnIsLoading.value = false;
    })
    .catch((e) => {
      createArrayBtnIsLoading.value = false
      console.log(e)
    })
}

const onParallelSort = async () => {
  isLoadingParallel.value = true
  const t0 = performance.now();
  const parallelSort = await useParallel(sortingData.value, parallelOptions);
  console.log(parallelSort)
  const t1 = performance.now();
  parallelSortingTime.value = t1 - t0;
  isLoadingParallel.value = false
}
const onDefaultSort = async () => {
  isLoadingDefault.value = true
  const t0 = performance.now();
  // TODO: need promise
  const defSort = sortingFunctions[parallelOptions.sortingMethod](sortingData.value);
  const t1 = performance.now();
  defaultSortingTime.value = t1 - t0;
  isLoadingDefault.value = false
}
</script>

<template>
  <div class="parallel-sorting layout-center">
    <div class="parallel-sorting__content">
      <div class="timer-card mr-2">
        <span
          v-text="'Parallel'"
          class="mb-2"
        />
        <v-progress-circular
          v-if="isLoadingParallel"
          :size="70"
          :width="7"
          color="blue"
          indeterminate
        />
        <span
          v-else
          v-text="parallelSortingTime.toFixed(2) + ' ms'"
        />
        <v-btn
          text
          v-text="'Parallel Sorting'"
          @click="onParallelSort"
        />
      </div>
      <div class="timer-card">
        <span
          v-text="'Default'"
          class="mb-2"
        />
        <v-progress-circular
          v-if="isLoadingDefault"
          :size="70"
          :width="7"
          color="blue"
          indeterminate
        />
        <span
          v-else
          v-text="defaultSortingTime.toFixed(2) + ' ms'"
        />
        <v-btn
          text
          v-text="'Default Sorting'"
          @click="onDefaultSort"
        />
      </div>
    </div>
    <div class="parallel-sorting__actions d-flex mt-3">
      <v-text-field
        v-model="arrayLength"
        variant="solo"
        style="width: 200px"
      />
      <v-btn
        class="ml-2"
        height="56"
        :disabled="createArrayBtnIsLoading.value"
        text
        v-text="'Create New Array'"
        @click="onCreateArray"
      />
    </div>
  </div>
</template>

<style lang="scss">
.parallel-sorting {
  flex-direction: column;
  &__content {
    display: flex;
    .timer-card {
      min-width: 150px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>