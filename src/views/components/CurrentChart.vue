<script setup lang="ts">
import { ref, provide, computed, shallowRef } from 'vue'
import { BorderBox11, Decoration5 } from '@dataview/datav-vue3'

import CloseBtn from '@/assets/imgs/close_btn.png'

import ChartFour from '@/components/ChartLibs/ChartFour.vue'
import ChartThree from '@/components/ChartLibs/ChartThree.vue'
import DeviceCategory from '@/components/ChartLibs/DeviceCategory.vue'
import AreaMarket from '@/components/ChartLibs/AreaMarket.vue'
import OrderCarousel from '@/components/ChartLibs/OrderCarousel.vue'
import CompanyDevice from '@/components/ChartLibs/CompanyDevice.vue'

import CountStatistic from '@/components/ChartLibs/CountStatistic.vue'
import ChinaChart from '@/components/ChartLibs/ChinaChart.vue'
import Notice from '@/components/ChartLibs/Notice.vue'

const emits = defineEmits(['close'])

const currentCompsTitle = ref('')
const showCurComps = ref(false)
const parentComps = ref('')

const currentComp = computed(() => {
  if (parentComps.value === 'ChartFour') {
    return ChartFour
  } else if (parentComps.value === 'ChartThree') {
    return ChartThree
  } else if (parentComps.value === 'DeviceCategory') {
    return DeviceCategory
  } else if (parentComps.value === 'CompanyDevice') {
    return CompanyDevice
  } else if (parentComps.value === 'AreaMarket') {
    return AreaMarket
  } else if (parentComps.value === 'ChinaChart') {
    return ChinaChart
  } else if (parentComps.value === 'CountStatistic') {
    return CountStatistic
  } else if (parentComps.value === 'Notice') {
    return Notice
  } else if (parentComps.value === 'OrderCarousel') {
    return OrderCarousel
  } else return null
})

provide('showTitle', false)

const init = ({ title, compsName }: { compsName: string; title: string }) => {
  console.log('当前组件', title, compsName)
  currentCompsTitle.value = title
  parentComps.value = compsName
  showCurComps.value = true
}

const closeHandle = () => {
  emits('close')
}

defineExpose({ init })
</script>

<template>
  <div class="current-chart-content">
    <div :title="currentCompsTitle" class="custom-border11">
      <div class="current-chart-content__container">
        <!-- <ChartFour :isScale="2" /> -->
        <component :is="currentComp" :isScale="2"></component>
      </div>
    </div>
    <div class="close" @click="closeHandle">
      <img :src="CloseBtn" class="img_btn" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.current-chart-content {
  //   height: calc(100vh - 75 * var(--app-base-unit));
  position: fixed;
  z-index: 1000000;
  width: 100%;
  height: 100%;
  //   background: #06032f;
  //   display: none;
  //   &.showCurrent {
  //     display: block;
  //   }
  &__container {
    color: #fff;
    padding: calc(70 * var(--app-base-unit)) calc(20 * var(--app-base-unit))
      calc(20 * var(--app-base-unit));
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .custom-border11 {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .close {
    position: absolute;
    right: calc(40 * var(--app-base-unit));
    top: calc(80 * var(--app-base-unit));
    cursor: pointer;
    .img_btn {
      width: calc(60 * var(--app-base-unit));
      height: calc(60 * var(--app-base-unit));
    }
  }
}
</style>
