<script setup lang="ts">
import { ref, unref, inject, reactive, computed } from 'vue'
import { BorderBox12 } from '@dataview/datav-vue3'
import hooks from '@/hooks'
import FadeNum from '@/components/FadeNum/index.vue'

import iconCover from '@/assets/imgs/icon-cover.png'
import iconApp from '@/assets/imgs/icon-app.png'
import iconVip from '@/assets/imgs/icon-vip.png'

const { useCountUp, useScreenModuleData } = hooks
const { CountUp, countUpOption } = useCountUp()

// const orderCount = ref({
//   totalAmount: 0,
//   regions: 0,
//   addNewOrder: 0
// })

const orderCount = computed(() => inject('orderCount'))

const coverCities = reactive({
  name: '订单总金额',
  img: iconCover,
  unit: '万元',
  value: unref(orderCount)?.totalAmount || 0,
  valueColor: '#45f3fd',
  changeNum: 0
})
const appSecond = reactive({
  name: '项目数量',
  img: iconApp,
  unit: '个',
  value: unref(orderCount).projectNum || 0,
  valueColor: '#71ffaa',
  changeNum: 0
})
const hasRent = reactive({
  name: '已租设备',
  img: iconApp,
  unit: '个',
  value: unref(orderCount).inRentDeviceNum || 0,
  valueColor: '#71ffaa',
  changeNum: 0
})
const todyOrder = reactive({
  name: '上月新增订单数',
  img: iconVip,
  unit: '单',
  value: unref(orderCount)?.addNewOrder || 0,
  valueColor: '#ffe66d',
  changeNum: 0
})

const countTimer = ref()

// 模拟订单数量增长
// const orderCountAdd = () => {
//   countTimer.value = setInterval(() => {
//     if (todyOrder.value < 10000) {
//       const changeNum = Math.ceil(Math.random() * 100)
//       todyOrder.changeNum = changeNum
//       todyOrder.value = todyOrder.value + changeNum
//     } else {
//       clearInterval(countTimer.value)
//       countTimer.value = null
//     }
//   }, 3000)
// }

// orderCountAdd()
</script>

<template>
  <BorderBox12 style="height: calc(150 * var(--app-base-unit))">
    <div class="count-statistic">
      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="coverCities.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: coverCities.valueColor }">
              <FadeNum v-model:value="coverCities.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="coverCities.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ coverCities.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ coverCities.name }}</div>
        </div>
      </div>
      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="appSecond.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: appSecond.valueColor }">
              <FadeNum v-model:value="appSecond.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="appSecond.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ appSecond.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ appSecond.name }}</div>
        </div>
      </div>
      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="coverCities.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: hasRent.valueColor }">
              <FadeNum v-model:value="hasRent.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="hasRent.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ hasRent.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ hasRent.name }}</div>
        </div>
      </div>
      <div class="count-item">
        <div class="count-item__icon">
          <div class="icon__circle animate-rotation"></div>
          <img class="icon__content" :src="todyOrder.img" />
        </div>
        <div class="count-item__content ml-20">
          <div class="count-item__number number">
            <span class="number__value mr-5" :style="{ color: todyOrder.valueColor }">
              <FadeNum v-model:value="todyOrder.changeNum">
                <CountUp
                  :delay="countUpOption.delay"
                  :endVal="todyOrder.value"
                  :options="countUpOption"
                />
              </FadeNum>
            </span>
            <span class="number__unit">
              {{ todyOrder.unit }}
            </span>
          </div>
          <div class="count-item__name mt-5">{{ todyOrder.name }}</div>
        </div>
      </div>
    </div>
  </BorderBox12>
</template>

<style lang="less" scoped>
.animate-rotation {
  animation: animate-rotation 10s linear infinite;
}

@keyframes animate-rotation {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}
.count-statistic {
  padding: 0 calc(20 * var(--app-base-unit));
  display: flex;
  height: 100%;
}
.count-item {
  display: flex;
  flex: 1;
  justify-content: center;
  &__icon {
    width: calc(75 * var(--app-base-unit));
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__number {
    :deep(.change-num) {
      top: calc(-5 * var(--app-base-unit));
    }
  }

  .icon {
    &__circle {
      background-image: url('../../assets/imgs/circle.png');
      width: calc(75 * var(--app-base-unit));
      height: calc(75 * var(--app-base-unit));
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
    }

    &__content {
      width: calc(30 * var(--app-base-unit));
      height: calc(30 * var(--app-base-unit));
    }
  }
  .number {
    display: flex;
    align-items: center;

    &__value {
      font-size: calc(30 * var(--app-base-unit));
      font-weight: bold;
    }
  }
}
</style>
