<script setup lang="ts">
import { ref, provide, watch, computed, onUnmounted, nextTick } from 'vue'
import { BorderBox11 } from '@dataview/datav-vue3'
import hooks from '@/hooks'

import Header from '@/components/Header/index.vue'
import Loading from '@/components/GlobalLoading/index.vue'

import LeftContent from './components/LeftContent.vue'
import CenterContent from './components/CenterContent.vue'
import RightContent from './components/RightContent.vue'
import CurrentChart from '@/components/ChartLibs/CurrentChart.vue'

import {
  getCnpcKanbanJson,
  getKanbanBaseData,
  getCollectiveRentApiJson,
  getCollectiveRentApiData
} from '@/api'

const VITE_ENV = import.meta.env

const { useScreen, useCommon } = hooks
const { setScreenMode } = useCommon()
const isLoading = ref(true)
const currentCompsTitle = ref('')
const currentChartRef = ref()
const showCurrentChart = ref(false)
/** new */
const wholeDesc = ref({})
const collectiveRentData = ref({})

// 需求单轮巡
const loopTimer = ref()

// 饼图数据
const collectiveRentDataList = computed(() => collectiveRentData.value)

provide('cnpcBaseData', wholeDesc)
provide('collectiveRentData', collectiveRentDataList)

const getCollectiveRentData = async () => {
  const reqApi =
    VITE_ENV.VITE_API_BASEPATH === 'test' ? getCollectiveRentApiJson : getCollectiveRentApiData
  const orderRes = await reqApi()

  collectiveRentData.value = orderRes.data
  isLoading.value = false
}

const getKanbanData = async () => {
  const reqApi = VITE_ENV.VITE_API_BASEPATH === 'test' ? getCnpcKanbanJson : getKanbanBaseData
  const orderRes = await reqApi()

  wholeDesc.value = orderRes.data
  isLoading.value = false
}

// 看板
getKanbanData()
// 集租、共享设备
getCollectiveRentData()

loopTimer.value = setInterval(() => {
  getKanbanData()
}, 1000 * 60 * 10) // 10分钟

// 制定html根字体大小
const initHtmlFontSize = () => {
  // logInfo(
  //   `设计稿为：${design.width}*${design.height}px；当前视图为：${viewActive.value}，可视区域大小：${screen.width}*${screen.height}px`
  // );

  screen.width = document.body.clientWidth
  screen.height = document.body.clientHeight

  const hr = screen.height / design.height // 屏幕高 / 设计稿的高
  const wr = screen.width / design.width // 屏幕宽 / 设计稿宽
  const swhr = screen.width / screen.height // 屏幕的宽高比, 大于1：横屏；否则：竖屏。

  console.log('screen-params', {
    'screen.width': screen.width,
    'screen.height': screen.height,
    'design.width': design.width,
    'design.height': design.height,
    swhr: swhr
  })

  // 横屏
  if (swhr > 1) {
    if (screen.width > 1200) {
      // 超宽屏大于 21：9
      if (swhr >= 21 / 9) {
        if (swhr > design.ratio) {
          contrastRatio.value = screen.height < minScreen.height ? 0.56 : hr * 1.2 // 以高度为基准制定
        } else {
          contrastRatio.value = screen.width < minScreen.width ? 0.6 : wr * 1.2 // 以宽度为基准制定
        }
      } else {
        // contrastRatio.value = hr; // 以高度为基准制定
        if (swhr > design.ratio) {
          contrastRatio.value = screen.height < minScreen.height ? 0.56 : hr // 以高度为基准制定
        } else {
          contrastRatio.value = screen.width < minScreen.width ? 0.6 : wr // 以宽度为基准制定
        }
      }
    } else {
      contrastRatio.value = 1
    }
  }

  console.log('index-contrastRatio', contrastRatio.value)
  // 竖屏
  document.documentElement.style.fontSize = contrastRatio.value * 100 + 'px'
}

const { design, screen, minScreen, contrastRatio } = useScreen(initHtmlFontSize)

setScreenMode('AdptMultiDevice')

onUnmounted(() => {
  clearInterval(loopTimer.value)
})

const curCompsEmits = ({
  compsName,
  title,
  data
}: {
  compsName: string
  title: string
  data: Partial<Object>
}) => {
  console.log('curCompsEmits')
  showCurrentChart.value = true
  currentCompsTitle.value = title
  nextTick(() => {
    currentChartRef.value.init({
      compsName,
      title,
      data
    })
  })
}
provide('curCompsEmits', curCompsEmits)

const currentPropsCloseHandle = () => {
  showCurrentChart.value = false
}
</script>

<template>
  <div class="digital-screen-container">
    <header class="header">
      <Header />
    </header>
    <section class="section">
      <div class="aside-lf">
        <!-- <BorderBox1> -->
        <div class="container">
          <LeftContent />
        </div>
        <!-- </BorderBox1> -->
      </div>
      <div class="center">
        <CenterContent />
      </div>
      <div class="aside-rt">
        <!-- <BorderBox1> -->
        <div class="container">
          <RightContent />
        </div>
        <!-- </BorderBox1> -->
      </div>
    </section>

    <div class="cur-big-comps" :class="{ 'is-show': showCurrentChart }">
      <BorderBox11
        :title="currentCompsTitle"
        class="custome-orderbox11"
        style="width: 50vw; height: 100vh; margin: 0 auto"
      >
      </BorderBox11>
      <div v-if="showCurrentChart" class="cur-comps-container">
        <CurrentChart ref="currentChartRef" @close="currentPropsCloseHandle" />
      </div>
    </div>
    <Loading v-if="isLoading" />
  </div>
</template>

<style lang="less" scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #fff;
}
.digital-screen-container {
  position: relative;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.header {
  height: @header-height-calc;
}
.section {
  display: flex;
  height: calc(100vh - @header-height * var(--app-base-unit));
  flex: 1;
  padding: calc(10 * var(--app-base-unit));
  box-sizing: border-box;
  > div {
    overflow: hidden;
  }
  .aside-lf {
    flex: 2;
  }
  .center {
    flex: 3;
  }
  .aside-rt {
    flex: 2;
  }
}
.cur-big-comps {
  z-index: -100;
  width: 100%;
  height: 100%;
  position: fixed;
  opacity: 0;
  &.is-show {
    display: flex;
    background: #06032f;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 1111111;
    opacity: 1;
  }
  .cur-comps-container {
    position: fixed;
  }
}
:deep(.border_image) {
  border: calc(10 * var(--app-base-unit)) solid;
  border-left-width: calc(20 * var(--app-base-unit));
  border-right-width: calc(20 * var(--app-base-unit));
  border-image: url('../assets/imgs/border.jpg') 10 10 round;
  // border-image-source: url('../assets/img/border.jpg');
  // border: 20px solid;
  // padding: 10px;
}
:deep(.content-wrap) {
  position: relative;
  margin: calc(5 * var(--app-base-unit));
}
</style>
