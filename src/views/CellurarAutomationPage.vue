<script setup lang="ts">
import {ref, nextTick} from "vue";
import {drawCellurarAutomation} from "@/utils/cellurar";

const rules = ref<number[]>([ 30, 90, 110])
const canvas = ref(null)
let isCanvasVisible = ref(false)
const selectedRule = ref(30)
const draw = async () => {
    isCanvasVisible.value = true;
    await nextTick()
    if (canvas.value) {
        drawCellurarAutomation(canvas.value, selectedRule.value)
    }
}
const resetCanvas = () => {
    isCanvasVisible.value = false;
}
</script>

<template>
    <div class='layout-center cellurar-automation'>
        <div v-if="!isCanvasVisible" class='cellurar-automation__select-container'>
            <div class="d-flex ">
                <span>Choose rule</span>
            </div>
            <div class="d-flex">
                <v-select
                        v-model="selectedRule"
                        label="Rules"
                        :items="rules"
                        variant="solo"
                />
                <v-btn
                        class="ml-1"
                        color="primary"
                        height="56"
                        @click="draw"
                >
                    <span>Draw</span>
                </v-btn>
            </div>
        </div>
        <div v-else class='cellurar-automation__canvas-container'>
            <div class="canvas-toolbar">
                <span>Chosen rule: {{ selectedRule }}</span>
                <v-btn
                        color="primary"
                        @click="resetCanvas"
                >
                    <span>Reset</span>
                </v-btn
                >
            </div>
            <canvas ref='canvas' width="1280" height="1080"/>
        </div>
    </div>
</template>

<style lang="scss">
.cellurar-automation {
  &__select-container {
    width: 50%
  }

  &__canvas-container {
    .canvas-toolbar {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>