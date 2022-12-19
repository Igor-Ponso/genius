<script setup lang="ts">
const gameArray: number[] = [];

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
</template>

<style scoped></style>
