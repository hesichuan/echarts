<script setup lang="ts">
import { ref, unref, inject, watch } from 'vue'
import hooks from '@/hooks'
import { getEquipmentInvestmentList } from '@/api'

import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const { useFilter } = hooks
const { toThousands } = useFilter()
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})
let orderCarousel = ref([])

const getBackgroundClassName = ({ type }) => {
  let className = 'project-list-item__icon'
  switch (type) {
    case 'web':
      className += ' web'
      break
    case 'design':
      className += ' design'
      break
    case 'app':
      className += ' app'
      break
    case 'project':
      className += ' project'
      break
    default:
      className += ' web'
  }
  return className
}

const getIconClassName = ({ type }) => {
  let className = 'iconfont'

  switch (type) {
    case 'web':
      className += ' icon-webduan'
      break
    case 'design':
      className += ' icon-shejimeigong'
      break
    case 'app':
      className += ' icon-appyingyong'
      break
    case 'project':
      className += ' icon-app'
      break
  }

  return className
}

watch(
  () => props.data,
  async (newVal) => {
    const { data } = await getEquipmentInvestment(newVal)
    console.error('dataArr', data)
    orderCarousel.value = data
  },
  {
    deep: true
  }
)
// projectName
const getEquipmentInvestment = async (params) => {
  return getEquipmentInvestmentList(params)
}
</script>

<template>
  <div class="project-scroll">
    <Vue3SeamlessScroll
      :list="orderCarousel"
      :step="0.3"
      :limitScrollNum="13"
      :hover="false"
      class="project-list"
    >
      <div
        class="project-list-item"
        v-for="(item, index) in orderCarousel"
        :key="'project-item' + index"
      >
        <div :class="getBackgroundClassName(item)">
          <i :class="getIconClassName(item)">{{ index + 1 }}</i>
        </div>
        <div class="project-list-item__name ellipsis">
          <div class="item device-type">{{ item.deviceType }}</div>
          <div class="item device-model">{{ item.model }}</div>
        </div>
        <div class="statistics-card">
          <span class="statistics-card__num font-16">{{ item.num }}</span>
          <span class="statistics-card__text mt-5">数量</span>
        </div>
        <!-- <div class="statistics-card ml-10">
          <span>
            <span>正常</span>
          </span>
          <span class="statistics-card__text mt-5">当前状态</span>
        </div> -->
      </div>
    </Vue3SeamlessScroll>
  </div>
</template>

<style lang="less" scoped>
.project-scroll {
  height: 95vh;
  width: 50vw;
}
.project-list {
  padding: 0 calc(20 * var(--app-base-unit));
  // height: 200px;
  height: calc(100% - 30 * var(--app-base-unit));
  overflow: hidden;
  .flex-space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .pre-icon {
    height: calc(40 * var(--app-base-unit));
    width: calc(40 * var(--app-base-unit));
    min-width: calc(40 * var(--app-base-unit));
    // background: #8675f9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: calc(4 * var(--app-base-unit));

    .iconfont {
      font-size: calc(22 * var(--app-base-unit));
    }
  }
  &-item {
    margin-bottom: 15 calc(15 * var(--app-base-unit));
    background: rgba(87, 170, 255, 0.15);
    padding: calc(10 * var(--app-base-unit));
    margin-bottom: calc(10 * var(--app-base-unit));
    align-items: center;

    .flex-space-between();

    .statistics-card {
      min-width: calc(60 * var(--app-base-unit));
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__num {
        display: block;
        height: calc(24 * var(--app-base-unit));
        line-height: calc(24 * var(--app-base-unit));
        color: color(yellow);
      }

      &__text {
        color: color(gray);
        font-size: calc(12 * var(--app-base-unit));
      }
    }

    &__icon {
      .pre-icon();

      &.web {
        background-image: linear-gradient(#3368ff, #42daf5);
      }

      &.design {
        background-image: linear-gradient(#ff4ee1, #fd9d65);
      }

      &.app {
        background-image: linear-gradient(#42cdff, #3fc47b);
      }

      &.project {
        background-image: linear-gradient(#9f23fd, #6594fd);
      }
    }

    &__name {
      margin-left: calc(10 * var(--app-base-unit));
      flex: 1;
      font-size: calc(16 * var(--app-base-unit));
      min-width: calc(120 * var(--app-base-unit));
      display: flex;
      align-items: center;
      .item {
        display: flex;
        font-weight: bold;
        justify-content: center;
        align-items: center;
        margin: 20px;
      }
    }
  }
}
</style>
