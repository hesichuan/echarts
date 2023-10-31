<script setup lang="ts">
import { ref, unref, inject, watch, computed } from 'vue'
import { propTypes } from '@/utils/propTypes'

import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const props = defineProps({
  isScale: propTypes.number.def(1)
})

const loadFinish = ref(false)

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const projectList = ref([])
const legendFirstList = ref([])
const legendSecondList = ref([])

const legendLabel = {
  first: '设备数',
  second: '设备占比'
}

const tipData = ref([])
const indicatorList = ref([])

projectList.value = inject('projectList', [])

const initData = () => {
  const data = unref(projectList.value) as []
  data.forEach((item, index) => {
    const { projectName: name, deviceNum, ratio, totalAmount } = item
    const obj = {
      data: [deviceNum, ratio],
      value: [
        index === 0 ? 100 : 0,
        index === 1 ? 100 : 0,
        index === 2 ? 100 : 0,
        index === 3 ? 100 : 0,
        index === 4 ? 100 : 0
      ],
      name
    }
    const indicatorName = { name: `${name}$${deviceNum}$${ratio}%` }

    legendFirstList.value.push(`${deviceNum}`)
    legendSecondList.value.push(`${ratio * 10}`)
    indicatorList.value.push(indicatorName)
    tipData.value.push(obj)
  })

  loadFinish.value = true
}

if (props.isScale > 1) {
  initData()
}

watch(
  () => projectList.value,
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
      top: 'auto',
      text: '项目统计图',
      left: '5%',
      textStyle: {
        fontSize: calcFont(14 * props.isScale),
        color: '#fff'
      }
      // bottom: 0
    },
    // 图例
    legend: {
      show: true,
      right: `${3 * props.isScale}%`,
      icon: 'circle',
      data: [{ name: legendLabel.first }, { name: legendLabel.second }],
      textStyle: {
        color: '#C3E3F9',
        fontSize: calcFont(14 * props.isScale)
      },
      selectedMode: false
    },
    tooltip: {
      show: true,
      extraCssText: 'z-index:3'
    },
    color: ['rgba(71, 141, 255, 0.83)', 'rgba(31, 217, 208, 0.83)'],
    radar: [
      {
        shape: 'circle',
        radius: '45%', // 调整圆盘大小
        center: ['50%', '50%'], // 调整圆盘偏移量
        // 雷达图指标名称，用%拼接，分割使用
        indicator: indicatorList.value,
        splitArea: {
          areaStyle: {
            color: ['#598EFF', '#88aefa', '#bad5fe', '#e2ecff', '#fff']
          }
        },
        splitLine: {
          lineStyle: {
            color: '#969696',
            type: 'dotted',
            width: 2 * props.isScale
          }
        },
        axisLine: {
          lineStyle: {
            color: '#9EC3FF'
          }
        },
        axisName: {
          show: true,
          // 分割指标名后，文字样式
          rich: {
            a: {
              fontSize: calcFont(16 * props.isScale), // 标题名称
              lineHeight: calcFont(25 * props.isScale)
            },
            b: {
              fontSize: calcFont(16 * props.isScale), // 第一个指标
              lineHeight: calcFont(25 * props.isScale)
            },
            c: {
              fontSize: calcFont(16 * props.isScale), // 第一个圆点背景
              color: '#478DFF',
              lineHeight: calcFont(25 * props.isScale)
            },
            d: {
              fontSize: calcFont(16 * props.isScale), // 第二个圆点背景
              color: '#1FD9D1',
              lineHeight: calcFont(25 * props.isScale)
            },
            e: {
              fontSize: calcFont(16 * props.isScale), // 第二个指标
              lineHeight: calcFont(25 * props.isScale)
            }
          },
          // 分割上方写的指标名。
          formatter: (params) => {
            let arrStr = params ? params.split('$') : ['', '', '']
            return `{a| ${arrStr[0]}}\n{c|●}{b| ${arrStr[1]}}\n{d|●}{e| ${arrStr[2]}}`
          },
          color: '#fff'
        }
      },
      {
        shape: 'circle',
        center: ['50%', '50%'],
        radius: '45%',
        indicator: indicatorList.value,
        axisLine: {
          lineStyle: {
            color: 'transparent'
          }
        }
      }
    ],
    series: [
      {
        name: '显示图形',
        type: 'radar',
        radarIndex: 0,
        tooltip: {
          show: false
        },
        areaStyle: {
          opacity: 0.95
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1 * props.isScale
        },
        label: {
          show: false,
          color: '#fff'
        },
        data: [
          {
            // value: ['23.42', '30.94', '10.68', '22.12', '12.83'],
            value: legendFirstList.value,
            name: legendLabel.first
          },
          {
            // value: ['48.57', '13.31', '3.14', '14.07', '20.92'],
            value: legendSecondList.value,
            name: legendLabel.second
          }
        ]
      },
      {
        name: '显示提示',
        type: 'radar',
        symbol: 'none',
        lineStyle: {
          color: 'transparent'
        },
        radarIndex: 1,
        zlevel: 2,
        tooltip: {
          show: true,
          // 自定义显示x轴提示，主要在第二个雷达图中实现，echarts官方tootips设置trigger：axis不生效。
          formatter: (params) => {
            console.log('params', params)
            let { data } = params.data
            return `${params.name}<br />${legendLabel.first}： ${data[0]}个<br />${legendLabel.second}： ${data[1]}%<br/>`
          }
        },
        data: tipData.value
      }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" :autoplay="true" :autoplayLen="5" />
</template>

<style lang="less" scoped></style>
