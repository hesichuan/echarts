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
              <LeftTop :dataInfo="deviceStatusInfo" />
            </ItemWrap2>
          </div>
          <div class="item l-c">
            <ItemWrap2
              class="contetn_left-top contetn_lr-item"
              title="维修订单类别"
            >
              <LeftCenter :dataInfo="repairOrder" />
            </ItemWrap2>
          </div>
          <div class="item l-b">
            <RightBottom :dataList="repairMachinistList" />
            <!-- <LeftBottom :dataList="repairDataList" /> -->
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
      <ItemWrap class="contetn_center-bottom contetn_lr-item" title="订单概览">
        <CenterBottom :dataList="profitMargin" />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <unslotWarp
        class="contetn_right-bottom contetn_lr-item"
        title="维修订单及执行情况"
      />
      <dv-border-Box-1>
        <div class="container">
          <div class="item">
            <LeftBottom :dataList="repairDataList" />
            <!-- <RightBottom :dataList="repairMachinistList" /> -->
          </div>
        </div>
      </dv-border-Box-1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
import unslotWarp from "@/components/item-wrap/unslot-warp.vue";

import { repaiKanbanApi } from "api/modules/kanban";

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
    unslotWarp,
  },
  data() {
    return {
      repairDataList: [],
      repairMachinistList: [],
      deviceStatusInfo: {},
      repairOrder: {},
      profitMargin: [],
    };
  },
  filters: {
    numsFilter(msg) {
      return msg || 0;
    },
  },
  computed: {
    ...mapGetters("setting", ["isLoading"]),
  },
  created() {
    console.log("creatd");
    this.getKanbanData();
  },

  mounted() {},
  methods: {
    getKanbanData() {
      repaiKanbanApi().then((res) => {
        const data = res.data || {};
        this.repairDataList = data.repairWorkOrdersList;
        this.repairMachinistList = data.repairMachinistList;
        this.deviceStatusInfo = data.deviceStatusNumMap;
        this.repairOrder = data.repairOrderMap;
        this.profitMargin = data.monthlyProfitMarginList;

        console.log("this.profitMargin", this.profitMargin);

        this.$store.commit("setting/setIsLoading", false);
      });
    },
  },
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
    font-size: 18px;
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
  .contetn_right-bottom {
    position: absolute;
    top: -15px;
    width: 100%;
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
