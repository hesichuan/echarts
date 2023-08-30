<script setup lang="ts">
import { ref, unref, onMounted, onUnmounted, markRaw, computed, nextTick } from 'vue'

import { propTypes } from '@/utils/propTypes'

import echarts from '@/utils/echarts'

import hooks from '@/hooks'

import { getChinaGeoJson } from '@/api'

import JEOJSON from '@/assets/json/china_geo.json'

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const props = defineProps({
  option: propTypes.object.def({}),
  autoplay: propTypes.bool.def(false),
  autoplayLen: propTypes.number.def(1),
  type: propTypes.string.def('')
})

const commonTitle = computed(() => {
  return {
    top: calcFont(25),
    left: 'center',
    textStyle: {
      color: '#fff',
      fontSize: calcFont(20)
    }
  }
})

const chartDom = ref<any>() // 获取元素实例
const myChart = ref<any>(null) // 获取echarts
const chartTitle = computed(() => {
  const title = {
    ...unref(commonTitle),
    ...props.option.title
  }
  return title
})

const outoPaly = (myChart) => {
  let currentIndex = -1
  setInterval(function () {
    var dataLen = props.autoplayLen !== 1 ? props.autoplayLen : props.option.series[0].data.length
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

const init = async () => {
  myChart.value = markRaw(echarts.init(chartDom.value))

  const option = props.option
  option.title = chartTitle.value

  if (props.type === 'map') {
    // const JEOJSON = await getChinaGeoJson().catch((err) => {
    //   console.log('JEOJSON-err', err)
    // })

    echarts.registerMap('china', JEOJSON)
  }
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
  nextTick(() => init())
})

onUnmounted(() => {
  myChart.value.dispose()
  window.removeEventListener('resize', myChart.value)
})
</script>

<template>
  <div ref="chartDom" class="default-echart"></div>
</template>

<style lang="less" scoped>
.default-echart {
  width: 100%;
  height: 100%;
}
</style>
