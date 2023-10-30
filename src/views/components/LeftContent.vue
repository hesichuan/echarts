<script setup lang="ts">
import ChartFour from '@/components/ChartLibs/ChartFour.vue'
import ChartThree from '@/components/ChartLibs/ChartThree.vue'
import OrderCarousel from '@/components/ChartLibs/OrderCarousel.vue'

import { chartTitle } from '@/utils/enum'

const emits = defineEmits(['curComps'])

const chartClicked = (compsName: string, title: string) => {
  console.log('chartClicked', compsName, title)
  emits('curComps', { compsName, title })
}
</script>

<template>
  <div class="left-content">
    <div class="left-content__item">
      <ChartFour @click="chartClicked('ChartFour', chartTitle['ChartFour'])" />
    </div>
    <div class="left-content__item">
      <OrderCarousel />
    </div>
    <div class="left-content__item">
      <ChartThree @click="chartClicked('ChartThree', chartTitle['ChartThree'])" />
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
