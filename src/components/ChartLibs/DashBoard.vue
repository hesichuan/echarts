<script setup lang="ts">
import { ref, unref, inject, watch, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const apiData = inject('cnpcBaseData', null)
const loadFinish = ref(false)

// 传入数据生成 option
let optionsData = [0, 0, 0]
let legendData = []

watch(
  () => apiData,
  (newVal) => {
    if (newVal) {
      optionsData = [+newVal.value.intactRate, +newVal.value.utilizeRate, +newVal.value.repairRate]
      loadFinish.value = true
    }
  },
  {
    deep: true
  }
)

// 准备待返回的配置项，把准备好的 legendData、series 传入。
let option = computed(() => {
  return {
    backgroundColor: 'transparent',
    tooltip: {
      // formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: '完好率',
        type: 'gauge',
        radius: '70%',
        center: ['20%', '40%'],
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: true,
          length: '60%',
          width: 4,
          itemStyle: {
            color: '#2F8FFF'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 4,
          itemStyle: {
            color: '#030A2C'
          }
        },
        detail: {
          formatter: '{value}%',
          fontSize: 12,
          color: '#fff',
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: optionsData[0],
            name: '完好率',
            title: {
              offsetCenter: ['0%', '110%'],
              fontSize: 12,
              color: '#C9D2FA',
              show: true
            }
          }
        ],
        title: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [+(optionsData[0] / 100).toFixed(2), '#2F8FFF'],
              [1, '#566093']
            ],
            width: 5,
            // shadowBlur: 15,
            // shadowColor: '#B0C4DE',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        axisLabel: {
          show: false
        }, //刻度标签。
        axisTick: {
          splitNumber: 3,
          distance: 4,
          show: true,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 2
        }, //刻度样式
        splitLine: {
          show: true,
          distance: 4,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 4
        }, //分隔线样式
        animationDuration: 4000
      },
      {
        name: '利用率',
        type: 'gauge',
        radius: '70%',
        center: ['50%', '40%'],
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: true,
          length: '60%',
          width: 4,
          itemStyle: {
            color: '#4ACBAC'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 4,
          itemStyle: {
            color: '#030A2C'
          }
        },
        detail: {
          formatter: '{value}%',
          fontSize: 12,
          color: '#fff',
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: optionsData[1],
            name: '利用率',
            title: {
              offsetCenter: ['0%', '110%'],
              fontSize: 12,
              color: '#C9D2FA',
              show: true
            }
          }
        ],
        title: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [+(optionsData[1] / 100).toFixed(2), '#4ACBAC'],
              [1, '#566093']
            ],
            width: 5,
            // shadowBlur: 15,
            // shadowColor: '#B0C4DE',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        axisLabel: {
          show: false
        }, //刻度标签。
        axisTick: {
          splitNumber: 3,
          distance: 4,
          show: true,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 2
        }, //刻度样式
        splitLine: {
          show: true,
          distance: 4,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 4
        }, //分隔线样式
        animationDuration: 4000
      },
      {
        name: '维修费率',
        type: 'gauge',
        radius: '70%',
        center: ['80%', '40%'],
        startAngle: '225',
        endAngle: '-45',
        pointer: {
          show: true,
          length: '60%',
          width: 4,
          itemStyle: {
            color: '#BC53EE'
          }
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 4,
          itemStyle: {
            color: '#030A2C'
          }
        },
        detail: {
          formatter: '{value}%',
          fontSize: 12,
          color: '#fff',
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: optionsData[2],
            name: '维修费率',
            title: {
              offsetCenter: ['0%', '110%'],
              fontSize: 12,
              color: '#C9D2FA',
              show: true
            }
          }
        ],
        title: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: [
              [+(optionsData[2] / 100).toFixed(2), '#BC53EE'],
              [1, '#566093']
            ],
            width: 5,
            // shadowBlur: 15,
            // shadowColor: '#B0C4DE',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            opacity: 1
          }
        },
        axisLabel: {
          show: false
        }, //刻度标签。
        axisTick: {
          splitNumber: 3,
          distance: 4,
          show: true,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 2
        }, //刻度样式
        splitLine: {
          show: true,
          distance: 4,
          lineStyle: {
            color: '#566093',
            width: 2
          },
          length: 4
        }, //分隔线样式
        animationDuration: 4000
      }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" />
</template>

<style lang="less" scoped></style>
