<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'

import { graphic } from 'echarts'

import { deviceEchartCountApi } from '@/api'

import hooks from '@/hooks'

import { chartOneData } from '@/utils/demo'

const loadFinish = ref(false)

const companyList = ref<Array<string>>([])
const deviceCount = ref<Array<number>>([]) // 设备数量
const branchCount = ref<Array<number>>([]) // 品牌数量
const typeCount = ref<Array<number>>([]) // 类型数量

const { useModuleData  } = hooks
const { calcFont, contrastRatio } = useModuleData(null)

const getDeviceEchartCount = async () => {
  try {
    // const res = await deviceEchartCountApi()
    const res = chartOneData
    res?.data.forEach((item: any) => {
      const { deviceTypeCount, orgName, deviceCount: dC, brandCount: bC } = item
      companyList.value.push(orgName)
      deviceCount.value.push(dC)
      branchCount.value.push(bC)
      typeCount.value.push(deviceTypeCount)
    })
    console.log('companyList.value', companyList)
    loadFinish.value = true
    console.log('getDeviceEchartCount-res', res)
  } catch (err) {}
}

getDeviceEchartCount()

const barData1 = [30, 30, 21, 35, 19, 17, 30, 33]; //柱状图数据
const barData2 = [22, 35, 23, 40, 15, 24, 40, 21]; //柱状图数据
const lineData = [39, 50, 54, 49, 50, 46, 56, 54]; //折线图数据

const option = computed(() => {
   return {
      tooltip: {
         trigger: 'axis',
         axisPointer: {
               type: 'none',
               label: {
                  show: false,
               },
         },
         textStyle: {
            // color: '#fff',
            fontSize: calcFont(14)
         }
      },
      grid: {
         left: '10%',
         top: '20%',
         right: '10%',
         bottom: '12%',
      },
      legend: {
         padding: [0, 100],
         data: [
               {
                  name: '未完成',
                  icon: 'circle',
                  textStyle: { color: '#ffffff' },
               },
               {
                  name: '已完成',
                  icon: 'circle',
                  textStyle: { color: '#ffffff' },
               },
               {
                  name: '成功率',
                  icon: 'circle',
                  textStyle: { color: '#ffffff' },
               },
         ],
         top: '4%',
         right: '3%',
         textStyle: {
               color: '#1FC3CE',
               fontSize: calcFont(16),
         },
      },
      xAxis: {
         data: [
               '06-01',
               '06-02',
               '06-03',
               '06-04',
               '06-05',
               '06-06',
               '06-07',
               '06-08'
         ],
         axisLine: {
               show: false, //隐藏X轴轴线
         },
         axisTick: {
               show: false, //隐藏X轴刻度
               alignWithLabel: true,
         },
         axisLabel: {
               show: true,
               textStyle: {
                  color: '#0b78d5', //X轴文字颜色
                  fontSize: calcFont(20),
               },
               margin: calcFont(20),
               interval: 0
         },
      },
      yAxis: [
         {
               type: 'value',
               name: '单位：%',
               max: 100,
               splitNumber: 8,
               nameTextStyle: {
                  color: '#0b78d5',
                  fontSize: calcFont(20),
               },
               splitLine: {
                  show: true,
                  lineStyle: {
                     color: 'rgba(21, 78, 129, 0.5 )',
                     type: 'solid',
                  },
               },
               axisTick: {
                  show: false,
               },
               axisLine: {
                  show: false
               },
               axisLabel: {
                  show: true,
                  textStyle: {
                     color: '#0b78d5',
                     fontSize: calcFont(20),
                  },
               },
         },
         {
               type: 'value',
               name: '单位：件',
               max: 100,
               splitNumber: 8,
               nameTextStyle: {
                  color: '#0b78d5',
                  fontSize: calcFont(20),
               },
               splitLine: {
                  show: true,
                  lineStyle: {
                     color: 'rgba(92, 229, 192, 0.2)',
                     type: 'solid',
                  },
               },
               axisLabel: {
                  show: true,
                  textStyle: {
                     color: '#0b78d5',
                     fontSize: calcFont(20),
                  },
               },
               axisLine: {
                  show: false,
               },
               axisTick: {
                  show: false
               },
         },
      ],
      series: [
         {
               name: '已完成',
               type: 'bar',
               barWidth: calcFont(24),
               itemStyle: {
                  normal: {
                     color: new graphic.LinearGradient(0, 0, 0, 1, [
                           {
                              offset: 0,
                              color: 'rgba(60, 211, 158, 1)',
                           },
                           {
                              offset: 1,
                              color: 'rgba(60, 211, 158, 0.1)',
                           },
                     ]),
                  },
               },
               data: barData2,
               label: {
                  show: true,
                  position: 'top',
                  distance: 5,
                  fontSize: calcFont(20),
                  color: '#FFFFFF',
               },
         },
         {
               name: '未完成',
               type: 'bar',
               barWidth: calcFont(24),
               itemStyle: {
                  normal: {
                     color: new graphic.LinearGradient(0, 0, 0, 1, [
                           {
                              offset: 0,
                              color: 'rgba(218, 227, 108, 1)',
                           },
                           {
                              offset: 1,
                              color: 'rgba(218, 227, 108, 0.1)',
                           },
                     ]),
                  },
               },
               data: barData1,
               label: {
                  show: true,
                  position: 'top',
                  distance: 5,
                  fontSize: calcFont(20),
                  color: '#FFFFFF',
               },
         },

         {
               name: '成功率',
               type: 'line',
               smooth: true,
               yAxisIndex: 1,
               showAllSymbol: true, //显示所有图形。
               symbol: 'circle', //标记的图形为实心圆
               symbolSize: 8, //标记的大小
               itemStyle: {
                  //折线拐点标志的样式
                  color: 'rgba(88, 222, 196, 1)',
               },
               lineStyle: {
                  color: 'rgba(55, 168, 192, 1)',
                  width: calcFont(5),
                  shadowBlur: 2,
               },
               areaStyle: {
                  normal: {
                     color: new graphic.LinearGradient(0, 0, 0, 1, [
                           {
                              offset: 0,
                              color: 'rgba(92, 106, 142, 0.4)'
                           },
                           {
                              offset: 1,
                              color: 'rgba(92, 106, 142, 0.4)'
                           }
                     ], false),
                  }
               },
               data: lineData,
         },
      ],
   };
})


</script>

<template>
  <DefaultChart
    :option="option"
    v-if="loadFinish"
    :autoplay="true"
    :autoplayLen="8"
  />
</template>

<style lang="less" scoped>

</style>
