<script setup lang="ts">
import { ref, reactive } from "vue";

const gameArray: number[] = reactive([]);
const playerArray: number[] = reactive([]);
const actualPosition = ref(0);
const gameStart = ref(false);

const addValue = (buttonValue: number) => {
  playerArray.push(buttonValue);
};

const clearPlayerArray = () => {
  playerArray.length = 0;
};

const clearGameArray = () => {
  gameArray.length = 0;
  gameStart.value = false;
};

const addRandomArrayPosition = () => {
  gameArray.push(Math.floor(Math.random() * 4));
  repeatGameArray();
};

const repeatGameArray = async () => {
  gameArray.forEach((num) => setTimeout(() => console.log(num), 1000));
};

const startGame = () => {
  gameStart.value = true;
  addRandomArrayPosition();
};
</script>

<template>
  <article id="genius-buttons">
    <button @click="addValue(0)">RED</button>
    <button @click="addValue(1)">GREEN</button>
    <button @click="addValue(2)">BLUE</button>
    <button @click="addValue(3)">YELLOW</button>
  </article>
  <button v-if="gameStart" @click="clearPlayerArray(), clearGameArray()">
    Clear
  </button>
  <button v-if="!gameStart" @click="startGame">Start Game</button>
  <button @click="addRandomArrayPosition">Add</button>
</template>

<style scoped lang="stylus">

#genius-buttons
  display flex
  gap 1.5rem
</style>
