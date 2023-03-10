<script lang="ts">
  export default {
    name: 'GameButtons',
  };
</script>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import errorSound from '@/assets/sounds/error.mp3';
  import gameButtons from '@/interfaces/GameButtons';

  const gameArray: number[] = reactive([]);
  const playerArray: number[] = reactive([]);
  const hasGameStart = ref(false);
  const isRepeating = ref(false);
  const level = ref(0);
  const maxLevel = ref(0);
  const status = ref('');
  const audioUrl = 'https://s3.amazonaws.com/freecodecamp/simonSound';

  const startGame = () => {
    hasGameStart.value = true;
    status.value = 'game started';
    levelUp();
  };

  const levelUp = async () => {
    level.value++;
    checkMaxLvl();
    addRandomArrayPosition();
    await Promise.resolve(repeatGameArray());
  };

  const checkMaxLvl = () => {
    if (level.value > maxLevel.value) maxLevel.value = level.value;
  };

  const addRandomArrayPosition = () => {
    gameArray.push(Math.floor(Math.random() * 4));
  };

  const repeatGameArray = () => {
    let delay = 0;
    return new Promise(() => {
      gameArray.forEach((arrayPosition) => {
        setTimeout(() => {
          playTileSound(arrayPosition);
        }, delay);
        delay += 700;
      });
    });
  };

  const playTileSound = (tileValue: number) => {
    gameButtons[tileValue].isActive = true;
    setTimeout(() => {
      gameButtons[tileValue].isActive = false;
    }, 400);
    new Audio(`${audioUrl}${tileValue + 1}.mp3`).play();
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
    status.value = 'Game Over';
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
          :class="['btn__' + button.name, { active: button.isActive }]"
          :disabled="isRepeating"
        ></button>
      </template>
    </article>
    <article id="main-buttons">
      <div v-if="maxLevel > 0">
        <p>{{ $t('level') }}{{ level }}</p>
        <p>{{ $t('max_level') }} {{ maxLevel }}</p>
      </div>
      <div>
        <button v-if="hasGameStart" @click="gameOver()">
          {{ $t('button.clear') }}
        </button>
        <button v-if="!hasGameStart" @click="startGame">
          {{ $t('button.start_game') }}
        </button>
      </div>
    </article>
  </main>
</template>

<style scoped lang="stylus" src="./__game_butons.styl" />
