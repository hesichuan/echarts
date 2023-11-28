<!--
 * @Author: daidai
 * @Date: 2022-03-04 09:23:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-05-07 11:05:02
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\index.vue
-->
<template>
  <div class="contents">
    <div class="contetn_left">
      <div class="pagetab">
        <!-- <div class="item">实时监测</div> -->
      </div>
      <dv-border-Box-1>
        <div class="container">
          <div class="item l-t">
            <ItemWrap2
              class="contetn_left-top contetn_lr-item"
              title="设备状态总览"
            >
              <LeftTop />
            </ItemWrap2>
          </div>
          <div class="item l-c">
            <ItemWrap2
              class="contetn_left-top contetn_lr-item"
              title="维修订单类别"
            >
              <LeftCenter />
            </ItemWrap2>
          </div>
          <div class="item l-b">
            <LeftBottom />
          </div>
        </div>
      </dv-border-Box-1>
      <!-- <ItemWrap class="contetn_left-top contetn_lr-item" title="设备状态总览">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="设备维修">
      <LeftCenter />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title=""
        style="padding: 0 10px 16px 10px"
      >
      <LeftBottom />
      </ItemWrap> -->
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" />
      <ItemWrap class="contetn_center-bottom" title="月度利润率">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <dv-border-Box-1>
        <div class="container">
          <div class="item">
            <RightBottom />
          </div>
        </div>
      </dv-border-Box-1>
      <!-- <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="报警次数"
      >
        <RightTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="报警排名(TOP8)"
        style="padding: 0 10px 16px 10px"
      >
        <RightCenter />
      </ItemWrap> -->
      <!-- <ItemWrap
        class="contetn_left-bottom contetn_lr-item content_right_h"
        title=""
      >
        <RightBottom />
      </ItemWrap> -->
    </div>
  </div>
</template>

<script>
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

export default {
  components: {
    LeftTop,
    LeftCenter,
    LeftBottom,
    CenterMap,
    RightTop,
    RightCenter,
    RightBottom,
    CenterBottom,
  },
  data() {
    return {};
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  created() {},

  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left,
  .contetn_right {
    width: 540px;
    box-sizing: border-box;
    // padding: 16px 0;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
    padding: 10px;
    flex-direction: column;
    .item {
      flex: 1;
      width: 100%;
      overflow: hidden;
      position: relative;
      &.l-t {
        flex: 3;
      }
      &.l-c {
        flex: 3;
      }
      &.l-b {
        flex: 4;
      }
    }
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    // height: 310px;
  }

  .content_right_h {
    height: 970px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left,
  .contetn_right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
