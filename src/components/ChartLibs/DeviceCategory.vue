<script setup lang="ts">
import { ref, unref, watch, computed, inject } from 'vue'
import { propTypes } from '@/utils/propTypes'

import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const props = defineProps({
  isScale: propTypes.number.def(1)
})

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)
const deviceCategories = ref([])

const loadFinish = ref(false)

let bgColor = '#fff'
let color = [
  '#c065e7',
  '#765deb',
  '#3862d8',
  '#6a89E2',
  '#219CF9',
  '#6efbbf',
  '#40c057',
  '#ffd351',
  '#ff8e43',
  '#f56b6d'
]
let echartData = [
  {
    name: 'A类',
    value: '3720'
  },
  {
    name: 'B类',
    value: '2920'
  },
  {
    name: 'C类',
    value: '2200'
  },
  {
    name: 'D类',
    value: '1420'
  },
  {
    name: 'E类',
    value: '3200'
  },
  {
    name: 'F类',
    value: '2420'
  },
  {
    name: 'G类',
    value: '2200'
  },
  {
    name: 'H类',
    value: '1420'
  },
  {
    name: 'I类',
    value: '3200'
  },
  {
    name: 'J类',
    value: '2420'
  }
]

const categoriesList = inject('deviceCategories', [])

const initData = (newVal) => {
  deviceCategories.value = unref(newVal)?.map((item) => {
    return {
      name: item.typeName,
      value: item.num
    }
  })
  loadFinish.value = true
}

if (props.isScale > 1) {
  initData(categoriesList)
}

watch(
  () => categoriesList,
  (newVal) => {
    if (newVal !== undefined) {
      initData(newVal)
    }
  },
  {
    deep: true
  }
)

let formatNumber = function (num) {
  let reg = /(?=(\B)(\d{3})+$)/g
  return num.toString().replace(reg, ',')
}
let total = echartData.reduce((a, b) => {
  return a + b.value * 1
}, 0)

const option = computed(() => {
  return {
    color: color,
    tooltip: {
      trigger: 'item',
      textStyle: {
        // color: '#fff',
        fontSize: calcFont(14 * props.isScale)
      },
      extraCssText: 'z-index:3'
    },
    title: {
      text: '设备类型统计图',
      top: 'auto',
      // left: '65%',
      left: 'center',
      textStyle: {
        color: '#fff',
        fontSize: calcFont(16 * props.isScale)
      }
    },
    // title: [
    //   {
    //     text: '{name|' + title + '}\n{val|' + formatNumber(total) + '}',
    //     top: 'center',
    //     left: 'center',
    //     textStyle: {
    //       rich: {
    //         name: {
    //           fontSize: calcFont(20),
    //           fontWeight: 'normal',
    //           color: '#000',
    //           padding: [10, 0]
    //         },
    //         val: {
    //           fontSize: 32,
    //           fontWeight: 'bolder',
    //           color: '#000'
    //         }
    //       }
    //     }
    //   },
    //   {
    //     text: '单位：个',
    //     top: 20,
    //     left: 20,
    //     textStyle: {
    //       fontSize: 14,
    //       color: '#666666',
    //       fontWeight: 400
    //     },
    //     show: false
    //   }
    // ],
    series: [
      {
        type: 'pie',
        roseType: 'radius',
        radius: ['25%', '60%'],
        center: ['50%', '50%'],
        data: unref(deviceCategories),
        itemStyle: {
          normal: {
            borderColor: bgColor,
            borderWidth: 2 * props.isScale
          }
        },
        labelLine: {
          length: calcFont(20 * props.isScale),
          length2: calcFont(30 * props.isScale),
          lineStyle: {
            // color: '#e6e6e6'
          }
        },
        label: {
          normal: {
            formatter: (params) => {
              return (
                // '{icon|●}{name|' + params.name + '}\n{value|' + formatNumber(params.value) + '}'
                '{icon|●}{name|' + params.name + '}\n{value|' + formatNumber(params.value) + '}'
              )
            },
            // padding: [0 , -100, 25, -100],
            rich: {
              icon: {
                fontSize: calcFont(18 * props.isScale),
                color: 'inherit'
              },
              name: {
                fontSize: calcFont(16 * props.isScale),
                padding: [0, 0, 0, calcFont(4 * props.isScale)],
                color: '#fff'
              },
              value: {
                fontSize: calcFont(16 * props.isScale),
                fontWeight: 'bolder',
                padding: [calcFont(10 * props.isScale), 0, 0, calcFont(20 * props.isScale)],
                color: 'inherit'
                // color: '#333333'
              }
            }
          }
        }
      }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" :autoplay="true" />
</template>

<style lang="less" scoped></style>
