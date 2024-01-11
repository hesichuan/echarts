<template>
  <div
    v-if="dataList.length"
    class="right_center_wrap beautify-scroll-def right_scroll_wap custome-table"
    :class="{ 'overflow-y-auto': !sbtxSwiperFlag }"
  >
    <div class="custome-table__header_container">
      <div class="custome-table__header">
        <div class="mini custome-table__td order_number">序号</div>
        <div class="mini custome-table__td">姓名</div>
        <div class="mini custome-table__td">技能等级</div>
        <div class="mini custome-table__td">所在地</div>
        <div class="mini custome-table__td">工作任务</div>
        <div class="mini custome-table__td">完成进度</div>
        <div class="mini custome-table__td">累计工时</div>
        <div class="mini custome-table__td">当前状态</div>
        <!-- 空闲（绿色）、工作（蓝色），紧急（红色） -->
      </div>
    </div>
    <component
      :is="components"
      :data="dataList"
      :class-option="defaultOption"
      class="scroll-wrap-container"
    >
      <ul class="right_center">
        <li class="right_center_item" v-for="(item, i) in dataList" :key="i">
          <div class="custome-table__td ellipsis order_number">
            {{ i + 1 }}
          </div>
          <div class="custome-table__td ellipsis">{{ item.name }}</div>
          <div class="custome-table__td ellipsis">{{ item.level }}</div>
          <div class="custome-table__td ellipsis">{{ item.address }}</div>
          <div class="custome-table__td ellipsis">
            {{ item.workTasks }}
          </div>
          <div class="custome-table__td ellipsis">
            {{ item.completeProgress || "暂无" }}
          </div>
          <div class="custome-table__td ellipsis">
            {{ item.accruedHours || "暂无" }}
          </div>
          <div class="custome-table__td ellipsis status__style">
            <span
              :class="[
                'status-common',
                item.currentStatus == '休假'
                  ? 'style__1'
                  : item.currentStatus == '在岗'
                  ? 'style__2'
                  : 'style__3',
              ]"
              >{{ item.currentStatus }}</span
            >
          </div>
        </li>
      </ul>
    </component>
  </div>
  <Reacquire v-else @onclick="getData" style="line-height: 200px" />
</template>

<script>
import { currentGET } from "api/modules";
import vueSeamlessScroll from "vue-seamless-scroll"; // vue2引入方式
import Kong from "../../components/kong.vue";
export default {
  components: { vueSeamlessScroll, Kong },
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
      pageflag: true,
      // defaultOption: {
      //   ...this.$store.state.setting.defaultOption,
      //   limitMoveNum: 3,
      //   singleHeight: 250,
      //   step: 0,
      // },
    };
  },
  computed: {
    defaultOption() {
      return {
        ...this.$store.state.setting.defaultOption,
        singleHeight: 0,
        limitMoveNum: 10,
        step: 0.6,
      };
    },
    sbtxSwiperFlag() {
      let ssyjSwiper = this.$store.state.setting.ssyjSwiper;
      if (ssyjSwiper) {
        this.components = vueSeamlessScroll;
      } else {
        this.components = Kong;
      }
      return ssyjSwiper;
    },
  },
  created() {
    // this.getData();
  },

  mounted() {},
  methods: {
    getRandom(n, m) {
      return Math.floor(Math.random() * (m - n + 1)) + n;
    },
    getData() {
      this.pageflag = true;
      // this.pageflag =false
      currentGET("big5", { limitNum: 50 }).then((res) => {
        console.log("实时预警", res);
        if (res.success) {
          // this.list = res.data.list;
          const data = [];
          for (let i = 0; i < 30; i++) {
            const obj = {
              repaireOrder: `工单-00${i + 1}`,
              person: "李元芳",
              phone: "15591611111",
              missing: `任务${i + 1}`,
              processIn: "进度",
              workingTime: "工时",
              status: this.getRandom(1, 3),
            };
            data.push(obj);
          }

          this.list = data;

          let timer = setTimeout(() => {
            clearTimeout(timer);
            this.defaultOption.step =
              this.$store.state.setting.defaultOption.step;
          }, this.$store.state.setting.defaultOption.waitTime);
        } else {
          this.pageflag = false;
          this.$Message.warning(res.msg);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.order_number {
  max-width: 34px;
}
.right_center_wrap {
  overflow: hidden;
  width: 100%;
  max-height: calc(100% - 70px);
  margin-top: 40px;
}
.custome-table__header_container {
  height: 42px;
  width: 96%;
  // background: #0982f2;
  // background: rgba(8, 90, 111, 0.7);
  // background-color: #263b40;
  background: linear-gradient(
    180deg,
    rgba(46 144 241 / 30%),
    rgba(51 161 219 / 50%)
  );
  position: absolute;
  z-index: 999;
  left: 2%;
  top: 3px;
  display: flex;
  justify-content: center;
  border-radius: 12px 12px 0 0;
}
.scroll-wrap-container {
}

.custome-table {
  &__header {
    width: 488px;

    display: flex;
    align-items: center;
    // color: #000;

    // left: 50%;
    // transform: translateX(-50%);
  }
  &__td {
    flex: 1;
    display: flex;
    justify-content: center;
    &.status__style {
      .status-common {
        width: 50px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }
      .style__1 {
        background: #67c23a;
      }
      .style__2 {
        background: #409eff;
      }
      .style__3 {
        background: #f56c6c;
      }
    }
    &.mini {
      font-size: 14px;
    }
  }
}
.right_center {
  width: 100%;
  height: 100%;

  .right_center_item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    padding: 4px 10px;
    font-size: 16px;
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }

    .orderNum {
      margin: 0 20px 0 -20px;
    }

    .inner_right {
      position: relative;
      height: 100%;
      width: 400px;
      flex-shrink: 0;
      line-height: 1.5;

      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../assets/img/zuo_xuxian.png");
        bottom: -12px;
        left: -2%;
        background-size: cover;
      }
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;

      .labels {
        flex-shrink: 0;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.6);
      }

      .zhuyao {
        color: $primary-color;
        font-size: 15px;
      }

      .ciyao {
        color: rgba(255, 255, 255, 0.8);
      }

      .warning {
        color: #e6a23c;
        font-size: 15px;
      }
    }
  }
}

.overflow-y-auto {
  overflow-y: auto;
}
</style>
