<script setup lang="ts">
import { ref, unref, inject, watch, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const loadFinish = ref(false)

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const repairorder = ref([])
const baseData = ref({})

const legendLabel = {
  first: '设备数',
  second: '金额'
}

const repairData = ref({
  manageNum: 0, // 管理人员
  repairNum: 0, // 维修人员
  operateNum: 0 // 操作人员
})

const colors = ['#ECA444', '#33A1DB', '#56B557']
const tipData = ref([])
const indicatorList = ref([])

repairorder.value = inject('repairorder', [])

baseData.value = inject('cnpcBaseData', {})

watch(
  () => baseData.value,
  () => {
    const data = unref(baseData.value) as any
    console.log('circleChart-data:', data)
    repairData.value = {
      ...repairData.value,
      manageNum: Number(data.manageNum),
      repairNum: Number(data.repairNum),
      operateNum: Number(data.operateNum)
    }

    loadFinish.value = true
  },
  {
    deep: true
  }
)

const option = computed(() => {
  return {
    // title: {
    //   top: 'auto',
    //   text: '项目统计图',
    //   left: '5%',
    //   textStyle: {
    //     fontSize: calcFont(14),
    //     color: '#fff'
    //   }
    //   // bottom: 0
    // },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(147, 235, 248, .8)',
      textStyle: {
        color: '#FFF'
      }
    },
    legend: {
      data: ['管理人员', '维修人员', '操作人员'],
      bottom: '5%',
      textStyle: {
        color: '#1FC3CE',
        fontSize: calcFont(14)
      }
      //   left: 'center'
    },
    series: [
      //展示圆点
      {
        name: '订单数量',
        type: 'pie',
        radius: ['30%', '50%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: 'rgba(0,0,0,0)',
          borderWidth: 2
        },

        color: colors,
        data: [
          {
            value: unref(repairData).manageNum,
            name: '管理人员',
            label: {
              shadowColor: colors[0]
            }
          },
          {
            value: unref(repairData).repairNum,
            name: '维修人员',
            label: {
              shadowColor: colors[2]
            }
          },
          {
            value: unref(repairData).operateNum,
            name: '操作人员',
            label: {
              shadowColor: colors[1]
            }
          }
        ],
        tooltip: { show: true },
        label: {
          formatter: '{per|{d}%}',
          position: 'outside',
          rich: {
            b: {
              color: '#fff',
              fontSize: 12
            },
            c: {
              color: '#31ABE3',
              fontSize: 12
            },
            per: {
              color: '#31ABE3',
              fontSize: 14
            }
          }
        },
        labelLine: {
          length: 15, // 第一段线 长度
          length2: 0, // 第二段线 长度
          show: false
        }
        // emphasis: {
        //   show: true
        // }
      }
      //   {
      //     name: '订单数量',
      //     type: 'pie',
      //     radius: ['42%', '65%'],
      //     avoidLabelOverlap: false,
      //     itemStyle: {
      //       borderRadius: 4,
      //       borderColor: 'rgba(0,0,0,0)',
      //       borderWidth: 2
      //     },

      //     color: colors,
      //     data: [
      //       {
      //         value: unref(repairData).manageNum,
      //         name: '管理人员',
      //         label: {
      //           shadowColor: colors[0]
      //         }
      //       },
      //       {
      //         value: unref(repairData).baseRepair,
      //         name: '维修人员',
      //         label: {
      //           shadowColor: colors[2]
      //         }
      //       },
      //       {
      //         value: unref(repairData).carryOn,
      //         name: '操作人员',
      //         label: {
      //           shadowColor: colors[1]
      //         }
      //       },
      //       {
      //         value: unref(repairData).reCreate,
      //         name: '改造再制造',
      //         label: {
      //           shadowColor: colors[3]
      //         }
      //       }
      //     ],
      //     tooltip: { show: true },
      //     label: {
      //       backgroundColor: 'inherit', //圆点颜色，auto：映射的系列色
      //       height: 0,
      //       width: 0,
      //       lineHeight: 0,
      //       borderRadius: 2.5,
      //       shadowBlur: 8,
      //       shadowColor: 'auto',
      //       padding: [2.5, -2.5, 2.5, -2.5]
      //     },
      //     labelLine: {
      //       length: 20, // 第一段线 长度
      //       length2: 36, // 第二段线 长度
      //       show: false
      //     }
      //   }
    ]
  }
})
</script>

<template>
  <DefaultChart :option="option" v-if="loadFinish" :autoplay="false" :autoplayLen="5" />
</template>

<style lang="less" scoped></style>
