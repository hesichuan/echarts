<script setup lang="ts">
import { ref, unref, computed, watch, inject } from 'vue'

import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

import JEOJSON from '@/assets/json/china_geo.json'

const loadFinish = ref(false)
const mapDeviceNum = ref([]) as any
const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const deviceMapCount = inject('deviceMapCount', [])

watch(
  () => deviceMapCount,
  (val) => {
    if (unref(val)?.length) {
      packageData()
    }
  },
  {
    deep: true
  }
)

const mapEmitHandle = () => {
  // geoJSON.value = jeoJson
}

const packageData = () => {
  var mapFeatures = JEOJSON.features
  mapFeatures.forEach(function (v) {
    // 地区名称
    var name = v.properties.name
    // 地区经中心经纬度
    var geo = v.properties.center.concat([calcFont(80)])
    for (let i = 0; i < unref(deviceMapCount.value)?.length; i++) {
      const item = unref(deviceMapCount.value)[i]
      if (name.indexOf(item.name) !== -1) {
        const deviceNum = item.deviceNum
        mapDeviceNum.value.push({
          name,
          deviceNum,
          value: geo
        })
        break
      }
    }
  })
  loadFinish.value = true
}

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
        var dotHtml =
          '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0090ff"></span>'
        return `${dotHtml}${params.name}</br>${params.marker}设备数量：${
          params?.data?.deviceNum || '--'
        }`
      }
    },
    geo: {
      type: 'map',
      zoom: 1.2,
      map: 'china',
      roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启。
      itemStyle: {
        normal: {
          areaColor: '#142957',
          borderColor: '#0692a4'
        },
        emphasis: {
          areaColor: 'red'
        }
      }
    },
    series: [
      {
        tooltip: {
          trigger: 'item'
        },
        type: 'map',
        map: 'china',
        zoom: 1.2,
        z: 100,
        itemStyle: {
          areaColor: '#142957',
          borderWidth: 1, //设置外层边框
          borderColor: '#086b77'
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            areaColor: '#4a80ff' // 高亮区域颜色
          }
        },
        select: {
          disabled: true
        },
        data: mapDeviceNum.value
      },
      {
        type: 'effectScatter', // 带有涟漪特效动画的散点（气泡）图
        coordinateSystem: 'geo',
        zlevel: 2,
        rippleEffect: { brushType: 'stroke' },
        label: {
          normal: {
            show: true,
            color: '#fff',
            position: 'bottom',
            formatter: '{b}'
          }
        },
        // emphasis: {
        //   areaColor: '#0b1c2d'
        // },
        itemStyle: { normal: { color: '#3ed4ff' } },
        data: mapDeviceNum.value,
        symbolSize: function (val) {
          return val[2] / 10
        }
      }
    ]
  }
})
</script>

<template>
  <!-- <div ref="elRef" id="main"></div> -->
  <DefaultChart
    :option="option"
    v-if="loadFinish"
    :autoplay="true"
    :type="'map'"
    @mapEmit="mapEmitHandle"
  />
</template>

<style lang="less" scoped></style>
