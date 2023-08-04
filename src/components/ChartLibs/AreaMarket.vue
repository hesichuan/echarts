<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'
import { getRandomBetween } from '@/utils/commonFn'

const { useModuleData } = hooks
const { calcFont, contrastRatio } = useModuleData(null)

const loadFinish = ref(false)

const data = ref([])

const packageData = () => {
  const areaMarketList = ['华北中心', '华南中心', '东非分中心', '华东中心', '东北分中心']
  for (var i = 0; i < areaMarketList.length; i++) {
    const getRandomSize = contrastRatio.value * getRandomBetween(50, 80)
    const obj = {
      name: areaMarketList[i],
      value: i + 5,
      symbolSize: getRandomSize,
      itemStyle: {
        color:
          'rgb(' +
          Math.round(Math.random() * 255) +
          ', ' +
          Math.round(Math.random() * 255) +
          ', ' +
          Math.round(Math.random() * 255) +
          ')'
      }
    }
    data.value.push(obj)
  }
}

packageData()

const option = computed(() => {
  return {
    title: {
      top: 'auto',
      text: '区域中心统计图',
      // left: '5%',
      bottom: 0
    },
    tooltip: {
      show: true
    },
    grid: {
      bottom: '10%'
    },
    series: [
      {
        type: 'graph', // 关系图
        layout: 'force', //图的布局，类型为力导图，'circular' 采用环形布局
        force: {
          repulsion: [50, 140], //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
          edgeLength: 10 //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
        },
        roam: true,
        label: {
          normal: {
            show: true,
            fontSize: calcFont(20)
          }
        },
        data: data.value
      }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" :autoplay="true" />
</template>

<style lang="less" scoped>
.area-market {
  height: 32vh;
  overflow: hidden;
}
</style>
