<script setup lang="ts">
import DeviceCategory from '@/components/ChartLibs/DeviceCategory.vue'
import ChartFour from '@/components/ChartLibs/ChartFour.vue'
import AreaMarket from '@/components/ChartLibs/AreaMarket.vue'
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'
</script>

<template>
  <div class="right-content">
    <div class="right-content__item">
      <DeviceCategory />
    </div>
    <div class="right-content__item">
      <!-- <ChartFour/> -->
      <CompanyDevice />
    </div>
    <div class="right-content__item">
      <AreaMarket />
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
