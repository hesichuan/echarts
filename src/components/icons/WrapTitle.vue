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
    <div class="title-icon">
      <img src="~@/assets/imgs/title_arrow.png" class="title-arrow" />
    </div>
    <div class="title-ctx">{{ title }}</div>
  </div>
</template>

<style lang="less" scoped>
.wrap-title {
  position: absolute;
  left: calc(8 * var(--app-base-unit));
  top: calc(6 * var(--app-base-unit));
  display: flex;
  align-items: center;
  .title-icon {
    display: flex;
    margin-right: calc(10 * var(--app-base-unit));
    .title-arrow {
      width: calc(24 * var(--app-base-unit));
      transform: rotate(180deg);
    }
  }
  .title-ctx {
    font-size: calc(20 * var(--app-base-unit));
  }
}
</style>
