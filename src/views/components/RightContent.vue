<script setup lang="ts">
import DeviceCategory from '@/components/ChartLibs/DeviceCategory.vue'
import ChartFour from '@/components/ChartLibs/ChartFour.vue'
import AreaMarket from '@/components/ChartLibs/AreaMarket.vue'

import CircleChart from '@/components/ChartLibs/CircleChart.vue'
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'

import WrapTitle from '@/components/icons/WrapTitle.vue'

import Lease from '@/components/ChartLibs/RingCake3D.vue'
</script>

<template>
  <div class="right-content">
    <div class="right-content__item border_image content-wrap">
      <WrapTitle :title="'人员情况'" class="wrap__title-content" />
      <CircleChart />
    </div>
    <div class="right-content__item border_image content-wrap">
      <!-- <ChartFour/> -->
      <WrapTitle :title="'重点项目设备投入'" class="wrap__title-content" />
      <CompanyDevice />
    </div>
    <div class="right-content__item border_image content-wrap">
      <!-- <AreaMarket /> -->
      <WrapTitle :title="'集中租赁'" class="wrap__title-content" />
      <Lease />
    </div>
  </div>
</template>

<style lang="less" scoped>
.right-content {
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
