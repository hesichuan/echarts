<script setup lang="ts">
import { ref, onMounted, onUnmounted, markRaw, computed, watch } from 'vue'

import { propTypes } from '@/utils/propTypes'

import * as echarts from 'echarts'

// import { useFullscreen } from '@vueuse/core'

// const { isFullscreen } = useFullscreen()

// watch(isFullscreen, () => {
//   myChart.value?.resize()
// })

const props = defineProps({
  option: propTypes.object.def({}),
  autoplay: propTypes.bool.def(false),
  autoplayLen: propTypes.number.def(1)
})

const commonTitle = {
  top: 25,
  left: 'center',
  textStyle: {
    color: '#eee',
    fontSize: 16
  }
}

const chartDom = ref<any>() // 获取元素实例
const myChart = ref<any>(null) // 获取echarts
const chartTitle = computed(() => {
  const title = {
    ...commonTitle,
    ...props.option.title
  }
  return title
})

const outoPaly = (myChart) => {
  let currentIndex = -1
  setInterval(function () {
    var dataLen = props.autoplayLen || props.option.series[0].data.length
    // 取消之前高亮的图形
    myChart.dispatchAction({
      type: 'downplay',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    currentIndex = (currentIndex + 1) % dataLen
    // // 高亮当前图形
    myChart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    // 显示 tooltip
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: currentIndex
      // position: 'top'
    })
  }, 2000)
}

const init = () => {
  myChart.value = markRaw(echarts.init(chartDom.value))
  const option = props.option
  option.title = chartTitle.value
  myChart.value.setOption(option)

  //过渡完成后开始动画
  myChart.value.on('finished', () => {
    // outoPaly(myChart)
  })
  props.autoplay && outoPaly(myChart.value)
}

onMounted(() => {
  // 只要窗口大小发生像素变化就会触发
  window.addEventListener('resize', () => {
    console.log('屏幕大小变了')
    myChart.value.resize() // 窗口发生改变就更新echarts
  })
  init()
})

onUnmounted(() => {
  myChart.value.dispose()
  window.removeEventListener('resize', myChart.value)
})
</script>

<template>
  <div ref="chartDom" class="default-echart"> </div>
</template>

<style lang="less" scoped>
.default-echart {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  //   background: #06032f;
}
</style>
