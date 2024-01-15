<script setup lang="ts">
import { ref, unref, inject, watch, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const apiData = inject('pieData', {})
const loadFinish = ref(false)
const { useModuleData } = hooks
const { calcFont } = useModuleData(null)
// 传入数据生成 option
// let legendData = ref([])
let series = ref([])
// 传入数据生成 option
let optionsData = ref([])

watch(
  () => apiData.value,
  (newVal) => {
    if (newVal) {
      optionsData.value = newVal.deviceList
        .sort((a, b) => {
          return b.num - a.num
        })
        .map((item) => {
          return {
            name: item.deviceType,
            value: +item.num
          }
        })
      init()

      loadFinish.value = true
    }
  },
  {
    deep: true
  }
)

function getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, height, i) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2

  let startRadian = startRatio * Math.PI * 2
  let endRadian = endRatio * Math.PI * 2
  let midRadian = midRatio * Math.PI * 2

  // 如果只有一个扇形，则不实现选中效果。
  if (startRatio === 0 && endRatio === 1) {
    isSelected = false
  }

  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== 'undefined' ? k : 1 / 3

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.cos(midRadian) * 0.1 : 0
  let offsetY = isSelected ? Math.sin(midRadian) * 0.1 : 0
  let offsetZ = i == 1 ? 2 : 0
  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20
    },

    x: function (u, v) {
      if (u < startRadian) {
        return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    y: function (u, v) {
      if (u < startRadian) {
        return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      if (u > endRadian) {
        return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate
    },

    z: function (u, v) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u)
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u)
      }
      return Math.sin(v) > 0 ? 1 * height : -1
    }
  }
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData, internalDiameterRatio) {
  let sumValue = 0
  let startValue = 0
  let endValue = 0

  let k =
    typeof internalDiameterRatio !== 'undefined'
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3
  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value

    let seriesItem: any = {
      name: typeof pieData[i].name === 'undefined' ? `series${i}` : pieData[i].name,
      type: 'surface',
      parametric: true,
      wireframe: {
        show: false
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: k
      }
    }

    if (typeof pieData[i].itemStyle != 'undefined') {
      let itemStyle: any = {}

      typeof pieData[i].itemStyle.color != 'undefined'
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null
      typeof pieData[i].itemStyle.opacity != 'undefined'
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null

      seriesItem.itemStyle = itemStyle
    }
    series.value.push(seriesItem)
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.value.length; i++) {
    endValue = startValue + series.value[i]?.pieData?.value ?? 0
    series.value[i].pieData.startRatio = startValue / sumValue
    series.value[i].pieData.endRatio = endValue / sumValue
    series.value[i].parametricEquation = getParametricEquation(
      series.value[i].pieData.startRatio,
      series.value[i].pieData.endRatio,
      false,
      false,
      k,
      // 调整扇形高度
      i === 0 ? 10 : 10,
      i
    )

    startValue = endValue
    // legendData.value.push(series.value[i].name)
  }
  return series.value
}

const init = () => {
  series.value = getPie3D(optionsData.value, 0) // 可做为调整内环大小 0为实心圆饼图，大于0 小于1 为圆环
  series.value.push({
    name: 'pie2d',
    type: 'pie',
    label: {
      opacity: 1,
      // fontSize: calcFont(12),
      lineHeight: calcFont(20),
      // position: 'inner',
      // distanceToLabelLine: -90,
      top: 200,
      textStyle: {
        fontSize: calcFont(14),
        color: '#fff'
      },
      formatter: function (params) {
        const nameStr = params.data.name.replace(/.{1,5}/g, '$&\n')
        const _value = params.value
        const percent = params.percent
        // return nameStr + '\n' + params.percent // 使用\n进行换行
        // return `${nameStr}${_value}（${percent}%）`
        return `${nameStr}${_value}（${percent}%）`
        // return nameStr + params.percent + '%' // 使用\n进行换行
      }
    },
    labelLine: {
      show: true,
      length: 20,
      length2: 20
    },
    startAngle: -30, //起始角度，支持范围[0, 360]。
    clockwise: false, //饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
    radius: ['60%', '60%'],
    center: ['50%', '50%'],
    data: optionsData.value,
    itemStyle: {
      opacity: 0
    }
  })
}
// 准备待返回的配置项，把准备好的 legendData、series 传入。
let option = computed(() => {
  return {
    animation: true,
    tooltip: {
      formatter: (params) => {
        if (params.seriesName !== 'mouseoutSeries' && params.seriesName !== 'pie2d') {
          return `${
            params.seriesName
          }<br/><span style="display:inline-block;margin-right:5px;border-radius:5px;width:10px;height:10px;background-color:${
            params.color
          };"></span>${series[params.seriesIndex].pieData.value}`
        }
      },
      textStyle: {
        fontSize: calcFont(14)
      }
    },
    xAxis3D: {
      min: -1,
      max: 1
    },
    yAxis3D: {
      min: -1,
      max: 1
    },
    zAxis3D: {
      min: -1,
      max: 1
    },
    grid3D: {
      show: false,
      boxHeight: 5,
      left: '2%',
      bottom: '15%',
      // environment: "rgba(255,255,255,0)",
      viewControl: {
        // 3d效果可以放大、旋转等，
        alpha: 30, // 饼图翻转的程度
        beta: 30,
        rotateSensitivity: 0,
        zoomSensitivity: 0,
        panSensitivity: 0,
        autoRotate: false, // 是否自动旋转
        maxDistance: 300,
        distance: 300 // 距离越小看到的饼图越大
      }
    },
    series: series.value
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" />
</template>

<style lang="less" scoped></style>
