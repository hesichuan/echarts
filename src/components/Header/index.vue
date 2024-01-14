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
      <div class="bg-img">
        <img src="~@/assets/imgs/header_top_1.png" class="img" />
        <!-- <span class=""></span> -->
        <div class="lf-icon">
          <div class="lf-icon__left">
            <img src="~@/assets/imgs/header_top_4.png" class="img-icon img-icon-lf-1" />
            <img src="~@/assets/imgs/header_top_4.png" class="img-icon img-icon-lf-2" />
          </div>
          <div class="lf-icon__title">
            {{ systemTitle }}
          </div>
          <div class="lf-icon__right">
            <img src="~@/assets/imgs/header_top_5.jpg" class="img-icon" />
          </div>
        </div>
      </div>
    </div>
    <div class="header-center">
      <div class="title">{{ systemTitle }}</div>
    </div>
    <div class="header-rt">
      <div class="bg-img">
        <img src="~@/assets/imgs/header_top_2.png" class="img right-img" />
      </div>
      <div class="line">
        <Decoration4 :reverse="true" style="transform: rotateY(180deg)" />
      </div>
      <div class="timer-screen-btn">
        <div class="screen-header__right">
          <span class="screen-header__date">{{ currentDate }}</span>
          <span class="screen-header__week ml-10">{{ currentWeek }}</span>
          <span class="screen-header__time ml-10">{{ currentTime }}</span>
        </div>
        <div class="full-screen-btn" @click="toggleFullscreen">
          <span class="icon iconfont ds-icon_fullscreen_shrink size" v-if="isFullscreen"></span>
          <span class="icon iconfont ds-fullscreen__ size" v-else></span>
        </div>
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
  justify-content: space-evenly;
  .line {
    position: absolute;
    top: calc(4 * var(--app-base-unit));
    width: 100%;
  }
  .bg-img {
    height: calc((@header-height - 10) * var(--app-base-unit));
    margin-top: calc(10 * var(--app-base-unit));
    display: flex;
    .img {
      width: 100%;
      // height: 100%;
      transform: translateX(calc(20 * var(--app-base-unit)));
      object-fit: cover;
    }
    .lf-icon {
      position: absolute;
      height: calc(100% - 10 * var(--app-base-unit));
      left: 50%;
      width: 70%;
      // border: 1px solid #fff;
      transform: translateX(-50%);

      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-icon {
        height: 100%;
      }
      &__left {
        height: 100%;
        position: relative;
        width: calc(60 * var(--app-base-unit));
        .img-icon-lf-1 {
          position: absolute;
        }
        .img-icon-lf-2 {
          position: absolute;
          left: calc(22 * var(--app-base-unit));
        }
      }
      &__title {
        font-size: calc(28 * var(--app-base-unit));
        color: rgb(12 204 210);
        // position: absolute;
        // left: calc(100 * var(--app-base-unit));
      }
      &__right {
        height: 100%;
      }
    }
  }
  .header-lf {
    width: 32%;
    position: relative;
    // background: url('../../assets/imgs/header_top_1.png') no-repeat;
    // background-position: right center;
    // background-size: 100% auto;

    // background-position: right -25px top 8px;
    // background-size: 100% 100%;
  }
  .header-rt {
    width: 32%;
    position: relative;
    // display: flex;
    // justify-content: flex-end;
    // align-items: center;
    // background: url('../../assets/imgs/header_top_2.png') no-repeat center
    //   calc(10 * var(--app-base-unit));
    // background-size: 100% auto;
    .right-img {
      transform: translateX(calc(-20 * var(--app-base-unit)));
    }
    .timer-screen-btn {
      position: absolute;
      z-index: 1;
      display: flex;
      align-items: center;
      top: calc(4 * var(--app-base-unit));
      right: calc(10 * var(--app-base-unit));
      .screen-header {
        &__right {
          color: var(--app-color-white);
          font-size: calc(24 * var(--app-base-unit));
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: calc(60 * var(--app-base-unit));
          // position: absolute;
        }
        &__time {
          font-weight: bold;
          color: var(--app-color-yellow);
          width: calc(100 * var(--app-base-unit));
        }
      }
    }
    .full-screen-btn {
      // position: absolute;
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
    width: 27%;
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
}
</style>
