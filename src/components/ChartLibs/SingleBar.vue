<script setup lang="ts">
import { ref, unref, watch, computed, inject } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'
import echarts from '@/utils/echarts'

const loadFinish = ref(false)

// const baseData = ref({})

const companyList = ref<Array<string>>([])
const deviceCount = ref<Array<number>>([]) // 设备数量
const branchCount = ref<Array<number>>([]) // 工作总台班
const typeCount = ref<Array<number>>([]) // 投入人员 typeVoList

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

// const deviceTypeList = inject('deviceTypeList', [])

const baseData = inject('cnpcBaseData', {})

watch(
  () => baseData,
  (newVal) => {
    const list = [...unref(newVal).typeVoList]
    list.forEach((item: any) => {
      const { num, deviceType } = item
      companyList.value.push(deviceType)
      deviceCount.value.push(num)
    })
    loadFinish.value = true
  },
  {
    deep: true
  }
)

const option = computed(() => {
  return {
    // title: {
    //   text: '公司设备数量/工作总台班/投入人员统计图',
    //   top: 0
    //   // left: 'center',
    //   // textStyle: {
    //   //   color: '#999',
    //   //   fontSize: 12
    //   // }
    // },
    tooltip: {
      show: true,
      trigger: 'axis',
      backgroundColor: 'rgba(116,176,222,0.3)',
      extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset;',
      borderWidth: 0,
      confine: false,
      appendToBody: true,
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(35,49,77,0.3)'
        }
      },
      textStyle: {
        color: '#fff',
        fontSize: calcFont(14)
      }
    },
    grid: {
      left: '10%',
      top: '20%',
      right: 'auto',
      bottom: '15%'
    },
    // grid: {
    //   top: 56,
    //   left: 5,
    //   right: 5,
    //   bottom: 0,
    //   containLabel: true
    // },
    // legend: {
    //   data: [
    //     {
    //       name: '设备数量',
    //       itemStyle: {
    //         color: '#4084EE'
    //       }
    //     },
    //     {
    //       name: '工作总台班',
    //       itemStyle: {
    //         color: '#FF8D28'
    //       }
    //     },
    //     {
    //       name: '投入人员',
    //       itemStyle: {
    //         color: '#6ACC29'
    //       }
    //     }
    //   ],
    //   bottom: '3%',
    //   textStyle: {
    //     color: '#1FC3CE',
    //     fontSize: calcFont(14)
    //   }
    //   // show: true,

    //   // top: calcFont(25),
    //   // selectedMode: false,
    //   // type: 'scroll',
    //   // icon: 'circle',
    //   // itemWidth: calcFont(16),
    //   // itemHeight: calcFont(16),
    //   // textStyle: {
    //   //   color: '#C3E3F9',
    //   //   fontSize: calcFont(14)
    //   // }
    // },
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
        fontSize: calcFont(16),
        color: '#87CCFF',
        lineHeight: calcFont(15),
        formatter: function (value: any) {
          var ret = '' //拼接加\n返回的类目项
          var max = 4 //每行显示的文字字数
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
        position: 'left',
        // name: '单位',
        nameGap: 24,
        nameTextStyle: {
          align: 'center',
          fontSize: calcFont(16),
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
          fontSize: calcFont(16),
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
      {
        data: deviceCount.value,
        type: 'bar',
        name: '设备数量',
        barGap: '20%',
        barWidth: calcFont(30),
        label: {
          show: true,
          position: 'top',
          distance: 4.8,
          textStyle: {
            color: '#4084EE',
            fontSize: calcFont(14)
          },
          formatter: function (params: any) {
            return params.value + '台套'
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
          color: function (params) {
            var colorList = [
              ['#8A2BE2FF', '#8A2BE200'],
              ['#1AAF87FF', '#1AAF8700'],
              ['#00B1FFFF', '#00B1FF00'],
              ['#FFA900FF', '#FFA90000'],
              ['#603f8bff', '#603f8b00']
            ]

            var colorItem = colorList[params.dataIndex]
            return new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: colorItem[0]
                },
                {
                  offset: 1,
                  color: colorItem[1]
                }
              ],
              false
            )
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
    :autoplay="false"
    :autoplayLen="companyList.length"
  />
</template>

<style lang="less" scoped></style>
