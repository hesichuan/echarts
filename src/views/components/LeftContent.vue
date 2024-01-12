<script setup lang="ts">
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'
import ChartThree from '@/components/ChartLibs/ChartThree.vue'

// import OrderCarousel from '@/components/ChartLibs/OrderCarousel.vue'
import CircleChart from '@/components/ChartLibs/CircleChart.vue'
import Summary from '@/components/ChartLibs/Summary.vue'
import WrapTitle from '@/components/icons/WrapTitle.vue'
</script>

<template>
  <div class="left-content">
    <div class="left-content__item border_image content-wrap">
      <WrapTitle :title="'整体概述'" class="wrap__title-content" />
      <Summary />
    </div>
    <div class="left-content__item border_image content-wrap">
      <!-- <OrderCarousel /> -->
      <WrapTitle :title="'人员情况'" class="wrap__title-content" />
      <CircleChart />
    </div>
    <div class="left-content__item border_image content-wrap">
      <!-- <ChartThree /> -->
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
