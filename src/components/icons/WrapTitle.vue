<script setup lang="ts">
defineProps({
  title: {
    default: '',
    type: String
  }
})
</script>

<template>
  <div class="wrap-title">
    <div class="title-icon"></div>
    <div class="title-ctx">{{ title }}</div>
  </div>
</template>

<style lang="less" scoped>
.wrap-title {
  position: absolute;
  left: calc(8 * var(--app-base-unit));
  top: calc(8 * var(--app-base-unit));
  .title-icon {
  }
  .title-ctx {
    font-size: calc(22 * var(--app-base-unit));
  }
}
</style>
