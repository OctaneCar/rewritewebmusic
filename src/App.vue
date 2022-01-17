<script lang="ts" setup>
import myhead from '@/pages/head/head.vue'
</script>

<template>
  <div id="app">
    <myhead></myhead>
    <router-view/>
  </div>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
