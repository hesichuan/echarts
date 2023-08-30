<script setup lang="ts">
import { ref, unref, computed } from 'vue'

import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const option = computed(() => {
  return {
    title: {
      left: 'left',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: function (params) {
        return params?.data?.num || '--'
      }
    },
    // legend: {
    //   orient: 'vertical',
    //   top: 'bottom',
    //   left: 'right',
    //   data: ['汉中', '上海 Top10', '广州 Top10'],
    //   textStyle: {
    //     color: '#fff'
    //   },
    //   selectedMode: 'single'
    // },
    geo: {
      map: 'china',
      zoom: 1.2,
      label: {
        emphasis: {
          show: false
        }
      },
      roam: false,
      itemStyle: {
        normal: {
          areaColor: '#142957',
          borderColor: '#0692a4'
        },
        emphasis: {
          areaColor: '#0b1c2d'
        }
      }
    },
    series: [
      // {
      //   name: '汉中',
      //   type: 'lines',
      //   zlevel: 1,
      //   effect: {
      //     show: true,
      //     period: 6,
      //     trailLength: 0.7,
      //     color: 'red',
      //     symbolSize: 3,
      //     symbol: 'circle'
      //   },
      //   data: [
      //     {
      //       coords: [
      //         [116.402217, 35.311657],
      //         [111.4124, 40.4901]
      //       ],
      //       lineStyle: { normal: { color: '#3ed4ff', width: 0, curveness: 0.2 } }
      //     },
      //     {
      //       coords: [
      //         [116.402217, 35.311657],
      //         [127.9688, 45.368]
      //       ],
      //       lineStyle: { normal: { color: '#3ed4ff', width: 0, curveness: 0.2 } }
      //     }
      //   ]
      // },
      // {
      //   name: '设备',
      //   type: 'lines',
      //   zlevel: 2,
      //   effect: {
      //     show: true,
      //     period: 6,
      //     trailLength: 0,
      //     symbol:
      //       'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705',
      //     symbolSize: 15
      //   },
      //   data: [
      //     {
      //       coords: [
      //         [109.1162, 34.2004], // 西安
      //         [111.4124, 40.4901]
      //       ],
      //       lineStyle: { normal: { color: '#3ed4ff', width: 1, opacity: 0.4, curveness: 0.2 } }
      //     },
      //     {
      //       coords: [
      //         [109.1162, 34.2004], // 西安
      //         [127.9688, 45.368]
      //       ],
      //       lineStyle: { normal: { color: '#3ed4ff', width: 1, opacity: 0.4, curveness: 0.2 } }
      //     },
      //     {
      //       coords: [
      //         [109.1162, 34.2004], // 西安
      //         [87.617733, 43.792818]
      //       ],
      //       lineStyle: { normal: { color: '#3ed4ff', width: 1, opacity: 0.4, curveness: 0.2 } }
      //     }
      //   ]
      // },
      {
        name: '设备所在地',
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { brushType: 'stroke' },
        label: { normal: { show: true, position: 'bottom', formatter: '{b}' } },
        itemStyle: { normal: { color: '#3ed4ff' } },
        data: [
          { name: '新乡', value: [116.402217, 35.311657, 40], num: '30' }, // 0: 经度、1：纬度、2：“显示点的大小”
          { name: '呼和浩特', value: [111.4124, 40.4901, 90], num: '60' },
          { name: '哈尔滨', value: [127.9688, 45.368, 90], num: '999' },
          { name: '西安', value: [109.1162, 34.2004, 60] },
          { name: '武汉', value: [114.3896, 30.6628, 50], num: '99' },
          { name: '沈阳', value: [123.1238, 42.1216, 20], num: '10000' },
          { name: '成都', value: [103.9526, 30.7617, 10] },
          {
            name: '乌鲁木齐',
            value: [87.617733, 43.792818, 40],
            num: '111',
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  console.log('params', params)
                  return params.name + '--' + params.data.num //地图上展示文字 + 数值
                }
              }
            }
          }
        ],
        symbolSize: function (val) {
          return val[2] / 10
        }
      }
      // {
      //   name: "汉中",
      //   type: "lines",
      //   zlevel: 1,
      //   effect: { show: true, period: 6, trailLength: 0.7, color: "#fff", symbolSize: 3, symbol: "circle" },
      //   data: [
      //     {
      //       coords: [
      //         [116.402217, 35.311657],
      //         [111.4124, 40.4901],
      //       ],
      //       lineStyle: { normal: { color: "#3ed4ff", width: 0, curveness: 0.2 } },
      //     },
      //     {
      //       coords: [
      //         [116.402217, 35.311657],
      //         [127.9688, 45.368],
      //       ],
      //       lineStyle: { normal: { color: "#3ed4ff", width: 0, curveness: 0.2 } },
      //     },
      //   ],
      // },
    ]
  }
})
</script>

<template>
  <!-- <div ref="elRef" id="main"></div> -->
  <DefaultChart :option="option" :autoplay="true" :autoplayLen="8" :type="'map'" />
</template>

<style lang="less" scoped></style>
