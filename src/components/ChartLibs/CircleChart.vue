<script setup lang="ts">
import { ref, unref, inject, watch, computed } from 'vue'
import DefaultChart from './DefaultChart.vue'
import hooks from '@/hooks'

const loadFinish = ref(false)

const { useModuleData } = hooks
const { calcFont } = useModuleData(null)

const repairorder = ref([])

const legendLabel = {
  first: '设备数',
  second: '金额'
}

const repairData = ref({
  guarantee: 0,
  baseRepair: 0,
  carryOn: 0,
  reCreate: 0,
  total: 0
})

const colors = ['#ECA444', '#33A1DB', '#56B557']
const tipData = ref([])
const indicatorList = ref([])

repairorder.value = inject('repairorder', [])

watch(
  () => repairorder.value,
  () => {
    const data = unref(repairorder.value) as any
    console.log('circleChart-data:', data)
    if (data.guarantee !== undefined) {
      repairData.value = {
        ...repairData.value,
        guarantee: Number(data.guarantee.orderNum),
        baseRepair: Number(data.baseRepair.orderNum),
        reCreate: Number(data.reCreate.orderNum),
        carryOn: Number(data.carryOn.orderNum),
        total: Number(data.total.orderNum)
      }
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
      data: ['现场维保', '基地维修', '对外承揽'],
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
            value: unref(repairData).guarantee,
            name: '现场维保',
            label: {
              shadowColor: colors[0]
            }
          },
          {
            value: unref(repairData).baseRepair,
            name: '基地维修',
            label: {
              shadowColor: colors[2]
            }
          },
          {
            value: unref(repairData).carryOn,
            name: '对外承揽',
            label: {
              shadowColor: colors[1]
            }
          }
        ],
        tooltip: { show: true },
        label: {
          formatter: '{b|{b}} {per|{d}%}',
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
      //         value: unref(repairData).guarantee,
      //         name: '现场维保',
      //         label: {
      //           shadowColor: colors[0]
      //         }
      //       },
      //       {
      //         value: unref(repairData).baseRepair,
      //         name: '基地维修',
      //         label: {
      //           shadowColor: colors[2]
      //         }
      //       },
      //       {
      //         value: unref(repairData).carryOn,
      //         name: '对外承揽',
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
