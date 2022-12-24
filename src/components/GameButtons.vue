<script setup lang="ts">
import { ref, reactive } from "vue";
import errorSound from "../assets/sounds/error.mp3";

const gameArray: number[] = reactive([]);
const playerArray: number[] = reactive([]);
const actualPosition = ref(0);
const gameStart = ref(false);

const addValue = (buttonValue: number) => {
  playerArray.push(buttonValue);
  const soundFile = "sound".concat(buttonValue.toString());
  console.log(soundFile);
  new Audio(
    `https://s3.amazonaws.com/freecodecamp/simonSound${buttonValue + 1}.mp3`
  ).play();
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

const playErrorSound = () => {
  new Audio(errorSound).play();
}
</script>

<template>
  <main>
    <article id="genius-buttons">
      <button @click="addValue(0)" class="btn__red"></button>
      <button @click="addValue(1)" class="btn__green"></button>
      <button @click="addValue(2)" class="btn__blue"></button>
      <button @click="addValue(3)" class="btn__yellow"></button>
    </article>
    <article id="main-buttons">
      <button v-if="gameStart" @click="clearPlayerArray(), clearGameArray()">
        Clear
      </button>
      <button v-if="!gameStart" @click="startGame">Start Game</button>
      <button @click="addRandomArrayPosition">Add</button>
      <button @click="playErrorSound()">Error</button>
    </article>
  </main>
</template>

<style scoped lang="stylus">
main
  display flex
  flex-direction: column
  gap 2rem

#genius-buttons,
#main-buttons
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--gap-2)

#genius-buttons
  grid-auto-rows: 12.5rem

.btn
  &__red
    background var(--color-red-1)
    &:hover
      border 5px solid var(--color-red-2)
  &__green
    background var(--color-green-1)
    &:hover
      border 5px solid var(--color-green-2)
  &__blue
    background var(--color-blue-1)
    &:hover
      border 5px solid var(--color-blue-2)
  &__yellow
    background var(--color-yellow-1)
    &:hover
      border 5px solid var(--color-yellow-2)
</style>
