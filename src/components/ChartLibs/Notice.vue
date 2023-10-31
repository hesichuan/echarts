<script setup lang="ts">
import { ref, unref, reactive, watch, inject, nextTick, computed } from 'vue'
import { propTypes } from '@/utils/propTypes'
// swiper
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

const props = defineProps({
  isScale: propTypes.number.def(1)
})

const modules = [Autoplay, EffectCoverflow]

const remandList = inject('remandList', [])

const autoplayOptions = reactive({
  delay: 2000, // 与请求有时间差才能替换数据
  // observer: true,
  // observeParents: true,
  // reverseDirection: false, // 反向
  disableOnInteraction: false,
  autoplay: true
})

const slidesPerViewNum = computed(() => {
  return props.isScale > 1 ? 8 : 3
})

const mySwiper = ref()
const swiperList = ref([])

const initData = (newVal) => {
  swiperList.value = []
  nextTick(() => {
    swiperList.value = unref(newVal)
  })
}

if (props.isScale > 1) {
  initData(remandList)
}

watch(
  () => remandList,
  (newVal) => {
    initData(newVal)
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="notie-center left" :class="{ 'is-big-chart': props.isScale > 1 }">
    <Swiper
      class="swiper-container mt-40px"
      v-if="swiperList.length"
      :modules="modules"
      :loop="true"
      :autoplay="autoplayOptions"
      :speed="1000"
      :direction="'vertical'"
      :slidesPerView="slidesPerViewNum"
      :centeredSlides="true"
      ref="mySwiper"
    >
      <SwiperSlide v-for="item in swiperList" :key="item" class="swiper-slide">
        <div class="item">
          <span class="title-content text-hidden">{{ item.data }}</span>
          <span class="item__time">{{ item.time }}</span>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style lang="less" scoped>
.notie-center {
  position: relative;
  z-index: 10;
  width: 100%;
  border: calc(1 * var(--app-base-unit)) solid transparent;
  border-image: linear-gradient(#0b64ad, #0a345c) 20 20;
  border-image: linear-gradient(#0b64ad, #0a345c) 20 20;
  padding: calc(15 * var(--app-base-unit)) calc(15 * var(--app-base-unit));
  height: 100%;
  background: rgba(2, 15, 34, 0.6);
  box-sizing: border-box;
  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
  }
  &::before {
    top: calc(-1 * var(--app-base-unit));
    width: calc(30 * var(--app-base-unit));
    height: calc(30 * var(--app-base-unit));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background: url('../../assets/imgs/border-corner.png') no-repeat center;
  }

  &::after {
    bottom: calc(-1 * var(--app-base-unit));
    width: calc(30 * var(--app-base-unit));
    height: calc(30 * var(--app-base-unit));
    background-size: 100% 100%;
    background-repeat: no-repeat;
    background: url('../../assets/imgs/border-corner.png') no-repeat center;
  }
  &.left {
    &::before {
      left: calc(-1 * var(--app-base-unit));
    }

    &::after {
      right: calc(-1 * var(--app-base-unit));
      transform: rotate(180deg);
    }
  }
  &.is-big-chart {
    width: 90vw;
    height: 75vh;
    position: absolute;
    top: 50%;
    transform: translateY(-45%);
    :deep(.swiper-slide) {
      .item {
        font-size: calc(35 * var(--app-base-unit)) !important;
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: 100%;

    :deep(.swiper-slide) {
      height: auto;
      box-sizing: border-box;
      .item {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: calc(20 * var(--app-base-unit));
        .title-content {
          color: #ffe66d;
          flex: 1;
        }
        &__time {
          //   width: calc(220 * var(--app-base-unit));
          display: flex;
          justify-content: flex-end;
        }
      }
    }
  }
}
</style>
