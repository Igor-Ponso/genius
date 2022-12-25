<script setup lang="ts">
import { ref, reactive } from "vue";
import errorSound from "../assets/sounds/error.mp3";
import gameButtons from "@/interfaces/GameButtons";

const gameArray: number[] = reactive([]);
const playerArray: number[] = reactive([]);
const hasGameStart = ref(false);
const isRepeating = ref(false);
const level = ref(0);
const status = ref("");

const startGame = () => {
  hasGameStart.value = true;
  status.value = "game started";
  levelUp();
};

const levelUp = () => {
  level.value++;
  addRandomArrayPosition();
  repeatGameArray();
};

const addRandomArrayPosition = () => {
  gameArray.push(Math.floor(Math.random() * 4));
};

const repeatGameArray = () => {
  let delay = 0;
  gameArray.forEach((arrayPosition) => {
    setTimeout(() => {
      playTileSound(arrayPosition);
    }, delay);
    delay += 700;
  });
};

const playTileSound = (tileValue: number) => {
  gameButtons[tileValue].isActive = true;
  console.log(gameButtons[tileValue], "ativo");
  setTimeout(() => {
    gameButtons[tileValue].isActive = false;
    console.log(gameButtons[tileValue], "desativo");
  }, 400);
  new Audio(
    `https://s3.amazonaws.com/freecodecamp/simonSound${tileValue + 1}.mp3`
  ).play();
};

const playErrorSound = () => {
  new Audio(errorSound).play();
};

const pushTile = (tileValue: number) => {
  checkWinLose(tileValue);
};

//TODO: Refactor! Maybe use array.every()
const checkWinLose = async (tileValue: number) => {
  playerArray.push(tileValue);
  for (let i = 0; i < playerArray.length; i++) {
    if (playerArray[i] !== gameArray[i]) {
      return gameOver();
    }
  }
  playTileSound(tileValue);
  if (JSON.stringify(playerArray) === JSON.stringify(gameArray)) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return nextStep();
  }
};

const gameOver = () => {
  gameArray.length = 0;
  hasGameStart.value = false;
  level.value = 0;
  status.value = "Game Over";
  clearPlayerArray();
  playErrorSound();
};

const nextStep = () => {
  clearPlayerArray();
  levelUp();
};

const clearPlayerArray = () => {
  playerArray.length = 0;
};
</script>

<template>
  <main>
    <article id="genius-buttons">
      <template v-for="(button, index) in gameButtons" :key="index">
        <button
          @click="pushTile(index)"
          class="btn"
          :class="[
            'btn__' + button.name,
            { disabled: isRepeating, active: button.isActive },
          ]"
          :data-index="index"
          :disabled="isRepeating"
        ></button>
      </template>
    </article>
    <article id="main-buttons">
      <button v-if="hasGameStart" @click="gameOver()">Clear</button>
      <button v-if="!hasGameStart" @click="startGame">Start Game</button>
    </article>
  </main>
</template>

<style scoped lang="stylus">
main
  display flex
  flex-direction: column
  gap 2rem

#genius-buttons
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--gap-2)

#genius-buttons
  grid-auto-rows: 12.5rem

.btn
  &__red
    background var(--color-red-1)
  and.active,
  &:hover
    border none
    -webkit-box-shadow:0px 0px 55px 10px var(--color-red-2);
    -moz-box-shadow: 0px 0px 55px 10px var(--color-red-2);
    box-shadow: 0px 0px 55px 10px var(--color-red-2);
  &__green
    background var(--color-green-1)
    and.active,
    &:hover
      border none
      -webkit-box-shadow:0px 0px 55px 10px var(--color-green-2);
      -moz-box-shadow: 0px 0px 55px 10px var(--color-green-2);
      box-shadow: 0px 0px 55px 10px var(--color-green-2);
  &__blue
    background var(--color-blue-1)
    and.active,
    &:hover
      border none
      -webkit-box-shadow:0px 0px 55px 10px var(--color-blue-2);
      -moz-box-shadow: 0px 0px 55px 10px var(--color-blue-2);
      box-shadow: 0px 0px 55px 10px var(--color-blue-2);
  &__yellow
    background var(--color-yellow-1)
    and.active,
    &:hover
      border none
      -webkit-box-shadow:0px 0px 55px 10px var(--color-yellow-2);
      -moz-box-shadow: 0px 0px 55px 10px var(--color-yellow-2);
      box-shadow: 0px 0px 55px 10px var(--color-yellow-2);
</style>
