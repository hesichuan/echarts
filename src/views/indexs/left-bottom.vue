<!--
 * @Author: daidai
 * @Date: 2022-03-01 09:43:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-09 11:40:22
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-bottom.vue
-->
<template>
  <div
    v-if="pageflag"
    class="left_boottom_wrap beautify-scroll-def custome-table"
    :class="{ 'overflow-y-auto': !sbtxSwiperFlag }"
  >
    <div class="custome-table__header_container">
      <div class="custome-table__header">
        <div class="custome-table__td">设备名称</div>
        <div class="custome-table__td">设备编号</div>
        <div class="custome-table__td">报修原因</div>
        <div class="custome-table__td">报修人</div>
        <div class="custome-table__td">所在保障组</div>
        <div class="custome-table__td">时间</div>
      </div>
    </div>
    <component
      :is="components"
      :data="list"
      :class-option="defaultOption"
      class="scroll-comps"
    >
      <ul class="left_boottom">
        <li class="left_boottom_item" v-for="(item, i) in list" :key="i">
          <div class="custome-table__td ellipsis">{{ item.deviceName }}</div>
          <div class="custome-table__td ellipsis">{{ item.deviceNum }}</div>
          <div class="custome-table__td ellipsis">{{ item.resson }}</div>
          <div class="custome-table__td ellipsis">{{ item.person }}</div>
          <div class="custome-table__td ellipsis">{{ item.group }}</div>
          <div class="custome-table__td ellipsis">{{ item.time }}</div>
          <!-- <span class="orderNum doudong">{{ i + 1 }}</span>
          <div class="inner_right">
            <div class="dibu"></div>
            <div class="flex">
              <div class="info">
                <span class="labels">设备ID：</span>
                <span class="contents zhuyao doudong wangguan">
                  {{ item.gatewayno }}</span
                >
              </div>
              <div class="info">
                <span class="labels">时间：</span>
                <span class="contents" style="font-size: 12px">
                  {{ item.createTime }}</span
                >
              </div>
            </div>

            <span
              class="types doudong"
              :class="{
                typeRed: item.onlineState == 0,
                typeGreen: item.onlineState == 1,
              }"
              >{{ item.onlineState == 1 ? "上线" : "下线" }}</span
            >

            <div class="info addresswrap">
              <span class="labels">地址：</span>
              <span class="contents ciyao" style="font-size: 12px">
                {{ addressHandle(item) }}</span
              >
            </div>
          </div> -->
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
  data() {
    return {
      list: [],
      pageflag: true,
      components: vueSeamlessScroll,
      // defaultOption: {
      //   ...this.$store.state.setting.defaultOption,
      //   singleHeight: 0,
      //   limitMoveNum: 10,
      //   step: 1,
      // },
    };
  },
  computed: {
    defaultOption() {
      return {
        ...this.$store.state.setting.defaultOption,
        singleHeight: 0,
        limitMoveNum: 10,
        step: 1,
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
    this.getData();
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
          }, this.$store.state.setting.defaultOption.waitTime);
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
  max-height: calc(100% - 60px);
  margin-top: 40px;
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
