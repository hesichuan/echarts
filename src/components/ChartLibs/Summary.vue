<script setup lang="ts">
import DashBoard from '@/components/ChartLibs/DashBoard.vue'
import { inject, ref } from 'vue'

const summaryData = inject('cnpcBaseData', {})
</script>

<template>
  <div class="summary">
    <div class="device-info">
      <div class="device-info__item">
        <div class="img-container">
          <img src="~@/assets/imgs/circle_1.jpg" class="img-1" />
          <img src="~@/assets/imgs/circle_2.png" class="img-2" />
          <span class="txt">{{ summaryData.deviceTotal }}万</span>
        </div>
        <div class="desc">设备总量（台套）</div>
      </div>
      <div class="device-info__item">
        <div class="img-container">
          <img src="~@/assets/imgs/circle_1.jpg" class="img-1" />
          <img src="~@/assets/imgs/circle_2.png" class="img-2" />
          <span class="txt">{{ summaryData.deviceUse }}万</span>
        </div>
        <div class="desc">在用设备（台套）</div>
      </div>
    </div>
    <div class="rate-info">
      <DashBoard />
    </div>
  </div>
</template>

<style lang="less" scoped>
.summary {
  display: flex;
  flex-direction: column;
  height: 100%;
  .device-info {
    display: flex;
    flex: 6;
    justify-content: space-evenly;
    &__item {
      // flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: calc(50 * var(--app-base-unit));
      .img-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(70 * var(--app-base-unit));
        height: calc(70 * var(--app-base-unit));
        > img {
          position: absolute;
        }
        .img-1 {
          width: 100%;
          height: 100%;
        }
        .img-2 {
          width: calc(50 * var(--app-base-unit));
          height: calc(50 * var(--app-base-unit));
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .txt {
          position: absolute;
        }
      }
      .desc {
        margin-top: calc(5 * var(--app-base-unit));
        font-size: calc(10 * var(--app-base-unit));
      }
    }
  }
  .rate-info {
    display: flex;
    flex: 6;
    &__item {
      flex: 1;
    }
  }
}
</style>
