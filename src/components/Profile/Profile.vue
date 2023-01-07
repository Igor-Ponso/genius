<script lang="ts">
  export default {
    name: 'Profile',
  };
</script>

<script setup lang="ts">
  import { BiLinkedin } from 'oh-vue-icons/icons';
</script>

<template>
  <div id="profile">
    <a href="https://www.linkedin.com/in/igorponso/">
      <v-icon
        :name="BiLinkedin.name"
        label="LinkedIn"
        color="var(--color-blue-4)"
        scale="2"
      />
    </a>
  </div>
</template>

<style lang="stylus" scoped>
  #profile
      margin-top 1rem
</style>
