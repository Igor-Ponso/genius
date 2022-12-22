<script setup lang="ts">
import { reactive } from "vue";

const gameArray: number[] = reactive([]);
const playerArray: number[] = reactive([]);

const addValue = (buttonValue: number) => {
  playerArray.push(buttonValue);
  console.log(gameArray);
};

const clearplayerArray = () => {
  playerArray.length = 0;
};

const clearGameArray = () => {
  gameArray.length = 0;
};

const addRandomArrayPosition = () => {
  gameArray.push(Math.floor(Math.random() * 4));
};
</script>

<template>
  {{ gameArray }}
  {{ playerArray }}
  <article id="genius-buttons">
    <button @click="addValue(0)">RED</button>
    <button @click="addValue(1)">GREEN</button>
    <button @click="addValue(2)">BLUE</button>
    <button @click="addValue(3)">YELLOW</button>
  </article>
  <button @click="clearplayerArray(), clearGameArray()">Clear</button>
  <button @click="addRandomArrayPosition">Random</button>
</template>

<style scoped lang="stylus">

#genius-buttons
  display flex
  gap 1.5rem

</style>
