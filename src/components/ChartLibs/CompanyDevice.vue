<script setup lang="ts">
import { ref, unref, watch, computed, inject } from 'vue'
import { propTypes } from '@/utils/propTypes'

import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const props = defineProps({
  isScale: propTypes.number.def(1)
})

const loadFinish = ref(false)

const companyList = ref<Array<string>>([])
const deviceCount = ref<Array<number>>([]) // 设备数量
const branchCount = ref<Array<number>>([]) // 品牌数量
const typeCount = ref<Array<number>>([]) // 类型数量

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const deviceCompany = inject('deviceCompany', [])

const initData = (newVal) => {
  unref(newVal)?.forEach((item: any) => {
    const { deviceTypeCount: dTC, orgName, deviceCount: dC, brandCount: bC } = item
    companyList.value.push(orgName)
    deviceCount.value.push(dC)
    branchCount.value.push(bC)
    typeCount.value.push(dTC)
  })
  loadFinish.value = true
}

if (props.isScale > 1) {
  initData(deviceCompany)
}

watch(
  () => deviceCompany,
  (newVal) => {
    initData(newVal)
  },
  {
    deep: true
  }
)

const option = computed(() => {
  return {
    title: {
      text: '公司设备数量/品牌数量/类型数量统计图',
      top: 0
      // left: 'center',
      // textStyle: {
      //   color: '#999',
      //   fontSize: 12
      // }
    },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(116,176,222,0.3)',
      extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset; z-index:3;',
      borderWidth: 0,
      // confine: false,
      // appendToBody: true,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(35,49,77,0.3)'
        }
      },
      textStyle: {
        color: '#fff',
        fontSize: calcFont(14 * props.isScale)
      }
      // extraCssText: 'z-index:30'
    },
    grid: {
      left: '10%',
      top: '20%',
      right: 'auto',
      bottom: '12%'
    },
    // grid: {
    //   top: 56,
    //   left: 5,
    //   right: 5,
    //   bottom: 0,
    //   containLabel: true
    // },
    legend: {
      show: true,
      data: [
        {
          name: '设备数量',
          itemStyle: {
            color: '#4084EE'
          }
        },
        {
          name: '品牌数量',
          itemStyle: {
            color: '#FF8D28'
          }
        },
        {
          name: '类型数量',
          itemStyle: {
            color: '#6ACC29'
          }
        }
      ],
      top: calcFont(25 * props.isScale),
      selectedMode: false,
      type: 'scroll',
      icon: 'circle',
      itemWidth: calcFont(16 * props.isScale),
      itemHeight: calcFont(16 * props.isScale),
      textStyle: {
        color: '#C3E3F9',
        fontSize: calcFont(14 * props.isScale)
      }
    },
    xAxis: {
      data: companyList.value, // x轴公司
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#2B72A1'
        }
      },
      axisLabel: {
        fontSize: calcFont(12 * props.isScale),
        color: '#87CCFF',
        lineHeight: calcFont(15 * props.isScale),
        formatter: function (value: any) {
          var ret = '' //拼接加\n返回的类目项
          var max = 6 //每行显示的文字字数
          var val = value.length //X轴内容的文字字数
          var rowN = Math.ceil(val / max) //需要换的行数
          if (rowN > 1) {
            //判断 如果字数大于2就换行
            for (var i = 0; i < rowN; i++) {
              var temp = '' //每次截取的字符串
              var start = i * max //开始截取的位置
              var end = start + max //结束截取的位置
              temp = value.substring(start, end) + '\n'
              ret += temp //最终的字符串
            }
            return ret
          } else {
            return value
          }
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      interval: 0
    },
    yAxis: [
      {
        type: 'value',
        name: '单位',
        nameGap: 24,
        nameTextStyle: {
          align: 'center',
          fontSize: calcFont(16 * props.isScale),
          color: '#2869A9'
        },
        splitNumber: 4,
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          margin: 10,
          fontSize: calcFont(16 * props.isScale),
          color: '#2869A9'
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: '#2869A9'
          }
        }
      }
    ],
    series: [
      // {
      //   // 下面
      //   data: [1, 1, 1, 1, 1],
      //   color: '#1E7EFF',
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barWidth: calcFont(26),
      //   symbol: 'diamond',
      //   symbolPosition: 'start',
      //   // symbolOffset: [0, 0],
      //   symbolOffset: ['-55%', '50%'],
      //   zlevel: 3,
      //   symbolSize: [calcFont(26), calcFont(12)] // 菱形宽高
      // },
      // {
      //   // 上面
      //   data: deviceCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   color: '#1E7EFF',
      //   symbolPosition: 'end',
      //   symbol: 'diamond',
      //   symbolOffset: [-calcFont(24), '-50%'],
      //   symbolSize: [calcFont(32), calcFont(12)],
      //   zlevel: 2
      // },
      // {
      //   // 阴影
      //   data: deviceCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   color: {
      //     x: 0,
      //     y: 1,
      //     x2: 0,
      //     y2: 0,
      //     type: 'linear',
      //     global: false,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: 'rgba(0,0,0,0.2)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(0,0,0,0.3)'
      //       }
      //     ]
      //   },
      //   symbolPosition: 'end',
      //   symbol: 'rect',
      //   symbolSize: [13, '100%'],
      //   symbolOffset: [-37.699999999999996, 0],
      //   zlevel: 1
      // },
      {
        data: deviceCount.value,
        type: 'bar',
        name: '设备数量',
        barGap: '20%',
        barWidth: calcFont(22 * props.isScale),
        label: {
          show: true,
          position: 'top',
          distance: 4.8,
          textStyle: {
            color: '#4084EE',
            fontSize: calcFont(14 * props.isScale)
          }
        },
        showBackground: false,
        backgroundStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64,132,238,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(64,132,238,1)'
              }
            ]
          },
          opacity: 0.1
        },
        itemStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(64,132,238,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(64,132,238,1)'
              }
            ]
          }
        }
      },
      // {
      //   data: [1, 1, 1, 1],
      //   color: '#FFA75A',
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   symbol: 'diamond',
      //   zlevel: 3,
      //   symbolOffset: [calcFont(8), '50%'],
      //   symbolSize: [calcFont(32), calcFont(12)]
      // },
      // {
      //   data: branchCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   color: '#FFA75A',
      //   symbolPosition: 'end',
      //   symbol: 'diamond',
      //   // symbolOffset: [0, '-50%'],
      //   // symbolSize: [26, 10.4],
      //   symbolOffset: [calcFont(8), '-50%'],
      //   symbolSize: [calcFont(32), calcFont(12)],
      //   zlevel: 2
      // },
      // {
      //   data: branchCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   color: {
      //     x: 0,
      //     y: 1,
      //     x2: 0,
      //     y2: 0,
      //     type: 'linear',
      //     global: false,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: 'rgba(0,0,0,0.2)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(0,0,0,0.3)'
      //       }
      //     ]
      //   },
      //   symbolPosition: 'end',
      //   symbol: 'rect',
      //   symbolSize: [13, '100%'],
      //   symbolOffset: [-6.5, 0],
      //   zlevel: 1
      // },
      {
        data: branchCount.value,
        type: 'bar',
        name: '品牌数量',
        barGap: '20%',
        barWidth: calcFont(22 * props.isScale),
        barMaxWidth: calcFont(48 * props.isScale),
        label: {
          show: true,
          position: 'top',
          distance: 4.8,
          textStyle: {
            color: '#FF8D28',
            fontSize: calcFont(14 * props.isScale)
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255,141,40,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(255,141,40,1)'
              }
            ]
          },
          opacity: 0.1
        },
        itemStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255,141,40,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(255,141,40,1)'
              }
            ]
          }
        }
      },
      // {
      //   data: [1, 1, 1, 1],
      //   color: '#6ACC29',
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: calcFont(48),
      //   symbol: 'diamond',
      //   symbolOffset: [calcFont(40), '50%'],
      //   zlevel: 3,
      //   symbolSize: [calcFont(32), calcFont(12)]
      // },
      // {
      //   data: typeCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: 48,
      //   color: '#6ACC29',
      //   symbolPosition: 'end',
      //   symbol: 'diamond',
      //   symbolOffset: [calcFont(31), '-50%'],
      //   symbolSize: [calcFont(32), calcFont(12)],
      //   zlevel: 2
      // },
      // {
      //   data: typeCount.value,
      //   type: 'pictorialBar',
      //   tooltip: {
      //     show: false
      //   },
      //   barMaxWidth: 48,
      //   color: {
      //     x: 0,
      //     y: 1,
      //     x2: 0,
      //     y2: 0,
      //     type: 'linear',
      //     global: false,
      //     colorStops: [
      //       {
      //         offset: 0,
      //         color: 'rgba(0,0,0,0.2)'
      //       },
      //       {
      //         offset: 1,
      //         color: 'rgba(0,0,0,0.3)'
      //       }
      //     ]
      //   },
      //   symbolPosition: 'end',
      //   symbol: 'rect',
      //   symbolSize: [13, '100%'],
      //   symbolOffset: [24.700000000000003, 0],
      //   zlevel: 1
      // },
      {
        data: typeCount.value,
        type: 'bar',
        name: '类型数量',
        barGap: '20%',
        barWidth: calcFont(22 * props.isScale),
        label: {
          show: true,
          position: 'top',
          distance: 4.8,
          textStyle: {
            color: '#6ACC29',
            fontSize: calcFont(14 * props.isScale)
          }
        },
        showBackground: true,
        backgroundStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(106,204,41,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(106,204,41,1)'
              }
            ]
          },
          opacity: 0.1
        },
        itemStyle: {
          color: {
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            type: 'linear',
            global: false,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(106,204,41,0.2)'
              },
              {
                offset: 1,
                color: 'rgba(106,204,41,1)'
              }
            ]
          }
        }
      }
    ]
  }
})
</script>

<template>
  <DefaultChart
    :option="option"
    v-if="loadFinish"
    :autoplay="true"
    :autoplayLen="companyList.length"
  />
</template>

<style lang="less" scoped></style>
