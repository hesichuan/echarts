<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useFullscreen } from '@vueuse/core'
import { Decoration4 } from '@dataview/datav-vue3'
import hooks from '@/hooks'

import setting from '@/settings'
import { setLocalS, getLocalS, clearTimer } from '@/utils'

const { useDateTime } = hooks

const { toggle, isFullscreen } = useFullscreen()

const { currentTime, currentDate, currentWeek, Timer, getDateTimeFormat, getCurrentDateTime } =
  useDateTime()

const { systemTitle } = setting

onMounted(() => {
  init()
})

onUnmounted(() => {
  clearTimer([Timer.value])
})

const init = () => {
  setLocalS('refreshTime', getDateTimeFormat(new Date()))
  setTime()

  Timer.value = setInterval(() => {
    setTime()
  }, 1000)
}

const setTime = () => {
  const { hours, minutes } = getCurrentDateTime()

  // 每30分钟进行判断，到达凌晨3点则刷新
  if (minutes % 30 === 0 && hours == 3) {
    const refreshTime = getLocalS('refreshTime')
    const nowTime = getDateTimeFormat(new Date())

    if (nowTime != refreshTime) {
      location.reload()
    }
  }
}

const toggleFullscreen = () => {
  toggle()
}
</script>

<template>
  <div class="header-container">
    <div class="header-lf">
      <div class="line">
        <Decoration4 :reverse="true" />
      </div>
    </div>
    <div class="header-center">
      <div class="title">{{ systemTitle }}</div>
    </div>
    <div class="header-rt">
      <div class="screen-header__right">
        <span class="screen-header__date">{{ currentDate }}</span>
        <span class="screen-header__week ml-10">{{ currentWeek }}</span>
        <span class="screen-header__time ml-10">{{ currentTime }}</span>
      </div>
      <div class="line">
        <Decoration4 :reverse="true" style="transform: rotateY(180deg)" />
      </div>
      <div class="full-screen-btn" @click="toggleFullscreen">
        <span class="icon iconfont ds-icon_fullscreen_shrink size" v-if="isFullscreen"></span>
        <span class="icon iconfont ds-fullscreen__ size" v-else></span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@font-face {
  font-family: PangMenZhengDaoBiaoTiTi;
  src: url('../../assets/font/PangMenZhengDaoBiaoTiTi.ttf');
}
.header-container {
  height: 100%;
  background: url('../../assets/header-bg-1.jpg') no-repeat center calc(4 * var(--app-base-unit));
  width: 100%;
  background-size: auto 100%;
  position: relative;
  display: flex;
  .line {
    position: absolute;
    top: calc(4 * var(--app-base-unit));
    width: 100%;
  }
  .header-lf {
    flex: 1;
    position: relative;
  }
  .header-rt {
    flex: 1;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .full-screen-btn {
      cursor: pointer;
      color: #fff;
      margin-right: calc(10 * var(--app-base-unit));
      .size {
        font-size: calc(35 * var(--app-base-unit));
        transform: translateY(calc(6 * var(--app-base-unit)));
      }
    }
  }
  .header-center {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    .title {
      font-family: 'PangMenZhengDaoBiaoTiTi';
      margin: 0 auto;
      background-image: -webkit-linear-gradient(bottom, #01daff, #fff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: calc(40 * var(--app-base-unit));
      margin-top: calc(10 * var(--app-base-unit));
      letter-spacing: calc(10 * var(--app-base-unit));
      line-height: calc(42 * var(--app-base-unit));
    }
  }
  .screen-header {
    &__right {
      color: var(--app-color-white);
      font-size: calc(16 * var(--app-base-unit));
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: calc(15 * var(--app-base-unit));
    }
    &__time {
      font-weight: bold;
      color: var(--app-color-yellow);
      width: calc(100 * var(--app-base-unit));
    }
  }
}
</style>
