<script setup lang="ts">
import { ref, unref, computed, watch, inject } from 'vue'
import { propTypes } from '@/utils/propTypes'

import DefaultChart from './DefaultChart.vue'

import hooks from '@/hooks'

import echarts from '@/utils/echarts'

const props = defineProps({
  isScale: propTypes.number.def(1)
})

const loadFinish = ref(false)

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)
const orderComplete = ref({})

const completeData = ref([]) //柱状图数据 完成的
const continuData = ref([]) //柱状图数据 进行中的
const succRate = ref([]) //折线图数据 成功率
const xAxisMonth = ref([]) // x轴

// const completeData = ref([22, 35, 23, 40, 15, 24, 40, 21]) //柱状图数据
// const continuData = ref([30, 30, 21, 35, 19, 17, 30, 33]) //柱状图数据
// const succRate = ref([39, 50, 54, 49, 50, 46, 56, 54]) //折线图数据
// const xAxisMonth = ref(['06-01', '06-02', '06-03', '06-04', '06-05', '06-06', '06-07', '06-08'])

orderComplete.value = inject('orderComplete')

const initData = () => {
  const data = unref(orderComplete.value)
  data.forEach((item) => {
    const { completed, success, toBeContinued, yearMonth } = item
    completeData.value.push(completed)
    continuData.value.push(toBeContinued)
    succRate.value.push(success)
    xAxisMonth.value.push(yearMonth)
  })
  loadFinish.value = true
}

if (props.isScale > 1) {
  initData()
}

watch(
  () => orderComplete.value,
  () => {
    initData()
  },
  {
    deep: true
  }
)

const option = computed(() => {
  return {
    title: {
      text: '过去半年订单完成率',
      top: 0
      // left: 'center',
      // textStyle: {
      //   color: '#999',
      //   fontSize: 12
      // }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none',
        label: {
          show: false
        }
      },
      textStyle: {
        // color: '#fff',
        fontSize: calcFont(14 * props.isScale)
      },
      extraCssText: 'z-index:3'
    },
    grid: {
      left: '10%',
      top: '20%',
      right: '10%',
      bottom: '12%'
    },
    legend: {
      padding: [0, calcFont(100 * props.isScale)],
      data: [
        {
          name: '履行中',
          icon: 'circle',
          textStyle: { color: '#ffffff', fontSize: calcFont(14 * props.isScale) }
        },
        {
          name: '已完成',
          icon: 'circle',
          textStyle: { color: '#ffffff', fontSize: calcFont(14 * props.isScale) }
        },
        {
          name: '成功率',
          icon: 'circle',
          textStyle: { color: '#ffffff', fontSize: calcFont(14 * props.isScale) }
        }
      ],
      top: '10%',
      // right: '3%',
      textStyle: {
        color: '#1FC3CE',
        fontSize: calcFont(16 * props.isScale)
      }
    },
    xAxis: {
      data: xAxisMonth.value,
      axisLine: {
        show: false //隐藏X轴轴线
      },
      axisTick: {
        show: false, //隐藏X轴刻度
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#0b78d5', //X轴文字颜色
          fontSize: calcFont(16 * props.isScale)
        },
        // margin: calcFont(20),
        interval: 0
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '单位：%',
        max: 100,
        splitNumber: 8,
        nameTextStyle: {
          color: '#0b78d5',
          fontSize: calcFont(16 * props.isScale)
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(21, 78, 129, 0.5 )',
            type: 'solid'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#0b78d5',
            fontSize: calcFont(16 * props.isScale)
          }
        }
      },
      {
        type: 'value',
        name: '单位：件',
        max: 100,
        splitNumber: 8,
        nameTextStyle: {
          color: '#0b78d5',
          fontSize: calcFont(16 * props.isScale)
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(92, 229, 192, 0.2)',
            type: 'solid'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#0b78d5',
            fontSize: calcFont(16 * props.isScale)
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '已完成',
        type: 'bar',
        barWidth: calcFont(24 * props.isScale),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(60, 211, 158, 1)'
              },
              {
                offset: 1,
                color: 'rgba(60, 211, 158, 0.1)'
              }
            ])
          }
        },
        data: completeData.value,
        label: {
          show: true,
          position: 'top',
          distance: 5,
          fontSize: calcFont(16 * props.isScale),
          color: '#FFFFFF'
        }
      },
      {
        name: '履行中',
        type: 'bar',
        barWidth: calcFont(24 * props.isScale),
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(218, 227, 108, 1)'
              },
              {
                offset: 1,
                color: 'rgba(218, 227, 108, 0.1)'
              }
            ])
          }
        },
        data: continuData.value,
        // data: continuData.value,
        label: {
          show: true,
          position: 'top',
          distance: 5,
          fontSize: calcFont(16 * props.isScale),
          color: '#FFFFFF'
        }
      },

      {
        name: '成功率',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        showAllSymbol: true, //显示所有图形。
        symbol: 'circle', //标记的图形为实心圆
        symbolSize: calcFont(8 * props.isScale), //标记的大小
        itemStyle: {
          //折线拐点标志的样式
          color: 'rgba(88, 222, 196, 1)'
        },
        lineStyle: {
          color: 'rgba(55, 168, 192, 1)',
          width: calcFont(5),
          shadowBlur: 2
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(92, 106, 142, 0.4)'
                },
                {
                  offset: 1,
                  color: 'rgba(92, 106, 142, 0.4)'
                }
              ],
              false
            )
          }
        },
        data: succRate.value
      }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" :autoplay="true" :autoplayLen="8" />
</template>

<style lang="less" scoped></style>
