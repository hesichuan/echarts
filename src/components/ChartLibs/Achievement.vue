<script setup lang="ts">
import img1 from '@/assets/imgs/device_1.png'
import img2 from '@/assets/imgs/device_2.png'
import img3 from '@/assets/imgs/device_3.png'
import img4 from '@/assets/imgs/device_4.png'
import img5 from '@/assets/imgs/device_5.png'
import img6 from '@/assets/imgs/device_6.png'
import DeviceTitleImg from '@/assets/imgs/device_title.jpg'
const data = [
  {
    img: img1,
    title: '盘活内部闲置资源',
    total: '1000台套'
  },
  {
    img: img2,
    title: '集租平均单价降低',
    total: '25%'
  },
  {
    img: img3,
    title: '年出租施工设备',
    total: '2000台套'
  },
  {
    img: img4,
    title: '促进低效资产增值',
    total: '1亿元'
  },
  {
    img: img5,
    title: '促进低效资产增值',
    total: '4041万元'
  },
  {
    img: img6,
    title: '年累计出租设备',
    total: '5455台班'
  }
]
</script>

<template>
  <div class="achievement-container">
    <div class="device-title-box">
      <img :src="DeviceTitleImg" alt="" class="device-title" />
      <div class="text">2024年</div>
    </div>
    <div class="box" v-for="(item, index) in data" :key="index">
      <img :src="item.img" alt="" class="icon" />
      <div class="right">
        <div class="title">{{ item.title }}</div>
        <div class="total">{{ item.total }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.achievement-container {
  width: 100%;
  height: 100%;
  padding: calc(50 * var(--app-base-unit)) calc(30 * var(--app-base-unit))
    calc(30 * var(--app-base-unit));
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  .device-title-box {
    width: 146px;
    height: 34px;
    position: absolute;
    top: 0;
    right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: calc(20 * var(--app-base-unit));
    color: #01daff;
    font-style: italic;
    .device-title,
    .text {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .device-title {
      z-index: 1;
    }
    .text {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2;
      letter-spacing: 2px;
      font-weight: 600;
    }
  }
  .box {
    width: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
    &:not(:nth-child(3n + 1)) {
      // margin-left: 25px;
    }
    .icon {
      width: calc(80 * var(--app-base-unit));
      margin-right: calc(20 * var(--app-base-unit));
    }
    .right {
      display: flex;
      flex-direction: column;
      .title {
        font-size: calc(14 * var(--app-base-unit));
        color: #ffffff;
      }
      .total {
        font-size: calc(22 * var(--app-base-unit));
        font-weight: 800;
        color: #01daff;
        font-style: italic;
      }
    }
  }
}
</style>
