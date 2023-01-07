<script setup lang="ts">
  import { onMounted } from 'vue';
  import GameButtons from './components/GameButtons/GameButtons.vue';
  import Profile from './components/Profile/Profile.vue';

  const documentHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
  };

  onMounted(() => {
    documentHeight();
  });
</script>

<template>
  <main>
    <h1>
      {{ $t('genius_name') }}
    </h1>
    <GameButtons />
    <Profile />
  </main>
</template>
