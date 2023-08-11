<script setup lang="ts">
import { Loading } from '@dataview/datav-vue3'
</script>

<template>
  <div class="global-loading">
    <div class="global-loading__content">
      <Loading style="width: 150px; height: 150px">正在初始化...</Loading>
    </div>
  </div>
</template>

<style lang="less" scoped>
.global-loading {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background: #06032f;
  z-index: 10000000;
  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
