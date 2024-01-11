<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:43:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-09 11:40:22
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-bottom.vue
-->
<template>
  <div
    v-if="dataList.length"
    class="left_boottom_wrap beautify-scroll-def custome-table"
    :class="{ 'overflow-y-auto': !sbtxSwiperFlag }"
  >
    <div class="custome-table__header_container">
      <div class="custome-table__header">
        <div class="custome-table__td">维修工单号</div>
        <div class="custome-table__td">设备名称</div>
        <div class="custome-table__td">报修人</div>
        <div class="custome-table__td">维修类型</div>
        <div class="custome-table__td">维修日期</div>
        <div class="custome-table__td">订单状态</div>
      </div>
    </div>
    <component
      :is="components"
      :data="dataList"
      :class-option="defaultOption"
      class="scroll-comps"
    >
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in dataList" :key="i">
          <div class="custome-table__td ellipsis">{{ item.deviceCode }}</div>
          <div class="custome-table__td ellipsis">{{ item.deviceName }}</div>
          <div class="custome-table__td ellipsis">{{ item.repairer }}</div>
          <div class="custome-table__td ellipsis">{{ item.repairType }}</div>
          <div class="custome-table__td ellipsis">{{ item.repairDate }}</div>
          <div class="custome-table__td ellipsis status__style">
            <span class="status-common" :class="`status__${item.status}`">{{
              item.orderStatus
            }}</span>
          </div>
        </li>
      </ul>
    </component>
  </div>

  <Reacquire v-else @onclick="getData" style="line-height: 200px" />
</template>

<script>
import { currentGET } from "api";
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
      components: vueSeamlessScroll,
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
      let sbtxSwiper = this.$store.state.setting.sbtxSwiper;
      if (sbtxSwiper) {
        this.components = vueSeamlessScroll;
      } else {
        this.components = Kong;
      }
      return sbtxSwiper;
    },
  },
  created() {},

  mounted() {
    // this.getData();
  },
  methods: {
    addressHandle(item) {
      let name = item.provinceName;
      if (item.cityName) {
        name += "/" + item.cityName;
        if (item.countyName) {
          name += "/" + item.countyName;
        }
      }
      return name;
    },
    getData() {
      this.pageflag = true;
      // this.pageflag =false
      currentGET("big3", { limitNum: 20 }).then((res) => {
        console.log("设备提醒", res);
        if (res.success) {
          this.countUserNumData = res.data;
          // this.list = res.data.list;
          this.list = [
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              group: "保障组1",
              person: "李元芳",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              person: "李元芳",
              group: "保障组1",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              person: "李元芳",
              group: "保障组1",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              person: "李元芳",
              group: "保障组1",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              group: "保障组1",
              person: "李元芳",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              person: "李元芳",
              phone: "15591611111",
              group: "保障组1",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              group: "保障组1",
              person: "李元芳",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              person: "李元芳",
              group: "保障组1",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              group: "保障组1",
              person: "李元芳",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
            {
              deviceName: "挖掘机-1",
              deviceNum: "SHT-001",
              resson: "报修原因",
              group: "保障组1",
              person: "李元芳",
              phone: "15591611111",
              time: "2022-02-22 16:40:01",
            },
          ];
          let timer = setTimeout(() => {
            clearTimeout(timer);
            this.defaultOption.step =
              this.$store.state.setting.defaultOption.step;
          }, 0);
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.left_boottom_wrap {
  overflow: hidden;
  width: 100%;
  max-height: calc(100% - 80px);
  margin-top: 50px;
}
.custome-table__header_container {
  height: 40px;
  width: 100%;
  // background: #0982f2;
  // background: #263b40;
  background: linear-gradient(
    180deg,
    rgba(46 144 241 / 30%),
    rgba(51 161 219 / 50%)
  );
  position: absolute;
  z-index: 999;
  left: 0;
  top: 12px;
  display: flex;
  justify-content: center;
  border-radius: 12px 12px 0 0;
}

.custome-table {
  &__header {
    width: 488px;
    font-size: 16px;
    display: flex;
    align-items: center;

    // left: 50%;
    // transform: translateX(-50%);
  }
  &__td {
    flex: 1;
    text-align: center;
    &.status__style {
      display: flex;
      justify-content: center;
      font-size: 14px;
      .status-common {
        width: 50px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        &.status__0 {
          background: #67c23a;
        }
        &.status__1 {
          background: orange;
          // background: #409eff;
        }
        &.status__2 {
          background: #409eff;
        }
      }
    }
  }
}

.doudong {
  //  vertical-align:middle;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -ms-backface-visibility: hidden;
  backface-visibility: hidden;
}

.overflow-y-auto {
  overflow-y: auto;
}

.left_boottom {
  width: 100%;
  height: 100%;

  .left_boottom_item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    font-size: 16px;
    margin: 10px 0;
    &:last-child {
      margin-bottom: 0;
    }
    .orderNum {
      margin: 0 16px 0 -20px;
    }

    .info {
      margin-right: 10px;
      display: flex;
      align-items: center;
      color: #fff;

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

    .inner_right {
      position: relative;
      height: 100%;
      width: 380px;
      flex-shrink: 0;
      line-height: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      .dibu {
        position: absolute;
        height: 2px;
        width: 104%;
        background-image: url("../../assets/img/zuo_xuxian.png");
        bottom: -10px;
        left: -2%;
        background-size: cover;
      }
      .addresswrap {
        width: 100%;
        display: flex;
        margin-top: 8px;
      }
    }

    .wangguan {
      color: #1890ff;
      font-weight: 900;
      font-size: 15px;
      width: 80px;
      flex-shrink: 0;
    }

    .time {
      font-size: 12px;
      // color: rgba(211, 210, 210,.8);
      color: #fff;
    }

    .address {
      font-size: 12px;
      cursor: pointer;
      // @include text-overflow(1);
    }

    .types {
      width: 30px;
      flex-shrink: 0;
    }

    .typeRed {
      color: #fc1a1a;
    }

    .typeGreen {
      color: #29fc29;
    }
  }
}
</style>
