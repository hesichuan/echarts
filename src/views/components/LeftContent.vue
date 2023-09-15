<script setup lang="ts">
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'
import ChartFour from '@/components/ChartLibs/ChartFour.vue'
import ChartThree from '@/components/ChartLibs/ChartThree.vue'

import OrderCarousel from '@/components/ChartLibs/OrderCarousel.vue'
</script>

<template>
  <div class="left-content">
    <div class="left-content__item">
      <!-- <CompanyDevice /> -->
      <ChartFour />
    </div>
    <div class="left-content__item">
      <OrderCarousel />
    </div>
    <div class="left-content__item">
      <ChartThree />
    </div>
  </div>
</template>

<style lang="less" scoped>
.left-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__item {
    flex: 1;
    overflow: hidden;
  }
}
</style>
