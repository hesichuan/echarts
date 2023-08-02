<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'

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

const option = computed(() => {
  return {
   title: {
      top: 'auto',
      text: '项目统计图',
      // left: '5%',
      bottom: 0
   },
   // 图例
   "legend": {
      "show": true,
      "right": "5%",
      "icon": "circle",
      "data": [
         { "name": "项目数" },
         { "name": "投资额" }
      ],
      textStyle: {
      color: '#C3E3F9',
      fontSize: calcFont(14)
    },
      "selectedMode": false
   },
   "tooltip": {},
   "color": ["rgba(71, 141, 255, 0.83)", "rgba(31, 217, 208, 0.83)"],
   "radar": [
      {
         "shape": "circle",
         "radius": "45%",// 调整圆盘大小
         center: ['50%', '50%'], // 调整圆盘偏移量
         // 雷达图指标名称，用%拼接，分割使用
         "indicator": [
            { "name": "房地产开发项目$23.42%$48.57%" },
            { "name": "工业项目$30.94%$13.31%" },
            { "name": "市政公用设施$10.68%$3.14%" },
            { "name": "公共服务设施$22.12%$14.07%" },
            { "name": "其他$12.83%$20.92%" }
         ],
         "splitArea": {
            "areaStyle": {
               "color": ["#598EFF", "#88aefa", "#bad5fe", "#e2ecff", "#fff"]
            }
         },
         "splitLine": {
            "lineStyle": {
               "color": "#969696",
               "type": "dotted",
               "width": 2
            }
         },
         "axisLine": {
            "lineStyle": {
               "color": "#9EC3FF"
            }
         },
         "axisName": {
            "show": true,
            // 分割指标名后，文字样式
            "rich": {
               "a": {
                  "fontSize": calcFont(20), // 标题名称
                  "lineHeight": calcFont(32)
               },
               "b": {
                  "fontSize": calcFont(18), // 第一个指标
                  "lineHeight": calcFont(32)
               },
               "c": {
                  "fontSize": calcFont(18),// 第一个圆点背景
                  "color": "#478DFF",
                  "lineHeight": calcFont(32)
               },
               "d": {
                  "fontSize": calcFont(18),// 第二个圆点背景
                  "color": "#1FD9D1",
                  "lineHeight": calcFont(32)
               },
               "e": {
                  "fontSize": calcFont(18),// 第二个指标
                  "lineHeight": calcFont(32)
               }
            },
            // 分割上方写的指标名。
            "formatter": (params) => {
               let arrStr = params ? params.split('$') : ['', '', ''];
               return `{a| ${arrStr[0]}}\n{c|●}{b| ${arrStr[1]}}\n{d|●}{e| ${arrStr[2]}}`;
            },
            "color": "#fff"
         }
      },
      {
         "shape": "circle",
         center: ['50%', '50%'],
         "radius": "45%",
         "indicator": [
            { "name": "房地产开发项目$23.42%$48.57%" },
            { "name": "工业项目$30.94%$13.31%" },
            { "name": "市政公用设施$10.68%$3.14%" },
            { "name": "公共服务设施$22.12%$14.07%" },
            { "name": "其他$12.83%$20.92%" }
         ],
         "axisLine": {
            "lineStyle": {
               "color": "transparent"
            }
         }
      }
   ],
   "series": [
      {
         "name": "显示图形",
         "type": "radar",
         "radarIndex": 0,
         "tooltip": {
            "show": false
         },
         "areaStyle": {
            "opacity": 0.95
         },
         "itemStyle": {
            "borderColor": "#fff",
            "borderWidth": 1
         },
         "label": {
            "show": false,
            "color": "#fff"
         },
         "data": [
            {
               "value": [ "23.42", "30.94", "10.68", "22.12", "12.83"],
               "name": "项目数"
            },
            {
               "value": [ "48.57", "13.31", "3.14", "14.07", "20.92"],
               "name": "投资额"
            }
         ]
      },
      {
         "name": "显示提示",
         "type": "radar",
         "symbol": "none",
         "lineStyle": {
            "color": "transparent"
         },
         "radarIndex": 1,
         "zlevel": 2,
         "tooltip": {
            show: true,
            // 自定义显示x轴提示，主要在第二个雷达图中实现，echarts官方tootips设置trigger：axis不生效。
            formatter: (params) => {
               let { data } = params.data;
               return `${params.name}<br />项目数： ${data[0]}个<br />投资额： ${data[1]}元<br/>`;
            }
         },
         "data": [
            {
               "value": [100, 0, 0, 0, 0],
               "data": [ 2335, 54602.95],
               "name": "房地产开发项目"
            },
            {
               "value": [0, 100, 0, 0, 0],
               "data": [3084, 14959.8],
               "name": "工业项目"
            },
            {
               "value": [0, 0, 100, 0, 0],
               "data": [1065, 3530.6],
               "name": "市政公用设施"
            },
            {
               "value": [0, 0, 0, 100, 0],
               "data": [ 2205, 15816.09],
               "name": "公共服务设施"
            },
            {
               "value": [0, 0, 0, 0, 100],
               "data": [1279, 23519.3],
               "name": "其他"
            }
         ]
      }
   ]
};
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

<style lang="less" scoped>

</style>
