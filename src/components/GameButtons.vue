<script setup lang="ts">
import { reactive } from "vue";

const gameArray: number[] = reactive([]);

const addValue = (buttonValue: number) => {
  gameArray.push(buttonValue);
  console.log(gameArray);
};
</script>

<template>
  <article>
    <button @click="addValue(1)">RED</button>
    <button @click="addValue(2)">GREEN</button>
    <button @click="addValue(3)">BLUE</button>
    <button @click="addValue(4)">YELLOW</button>
  </article>
  {{ gameArray }}
</template>

<style scoped lang="stylus"></style>
