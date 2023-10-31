<script setup lang="ts">
import DeviceCategory from '@/components/ChartLibs/DeviceCategory.vue'
import AreaMarket from '@/components/ChartLibs/AreaMarket.vue'
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'

import { chartTitle } from '@/utils/enum'

const emits = defineEmits(['curComps'])

const chartClicked = (compsName: string, title: string) => {
  console.log('chartClicked', compsName, title)
  emits('curComps', { compsName, title })
}
</script>

<template>
  <div class="right-content">
    <div class="right-content__item">
      <DeviceCategory @click="chartClicked('DeviceCategory', chartTitle['DeviceCategory'])" />
    </div>
    <div class="right-content__item">
      <CompanyDevice @click="chartClicked('CompanyDevice', chartTitle['CompanyDevice'])" />
    </div>
    <div class="right-content__item">
      <AreaMarket @click="chartClicked('AreaMarket', chartTitle['AreaMarket'])" />
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
