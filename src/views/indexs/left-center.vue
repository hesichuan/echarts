<!--
 * @Author: daidai
 * @Date: 2022-02-28 16:16:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-25 09:18:22
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\left-center.vue
-->
<template>
  <Echart
    id="leftCenter"
    :options="options"
    class="left_center_inner"
    v-if="pageflag"
    ref="charts"
  />
  <Reacquire v-else @onclick="getData" style="line-height: 200px">
    重新获取
  </Reacquire>
</template>

<script>
import { currentGET } from "api/modules";
export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    dataInfo: {
      handler(val) {
        this.getData(val);
      },
      immediate: true,
    },
  },
  data() {
    return {
      options: {},
      repairData: {
        guarantee: 0,
        baseRepair: 0,
        carryOn: 0,
        reCreate: 0,
        total: 0,
      },
      pageflag: true,
      timer: null,
    };
  },
  created() {
    // this.getData();
  },
  mounted() {},
  beforeDestroy() {
    this.clearData();
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    getData(data) {
      console.log("data----", data.guarantee);
      this.pageflag = false;

      if (data.guarantee !== undefined) {
        this.repairData = {
          ...this.repairData,
          guarantee: Number(data.guarantee.orderNum),
          baseRepair: Number(data.baseRepair.orderNum),
          reCreate: Number(data.reCreate.orderNum),
          carryOn: Number(data.carryOn.orderNum),
          total: Number(data.total.orderNum),
        };

        this.$nextTick(() => {
          this.init();
        });
      }

      this.pageflag = true;
    },
    //轮询
    switper() {
      if (this.timer) {
        return;
      }
      let looper = (a) => {
        this.getData();
      };
      this.timer = setInterval(
        looper,
        this.$store.state.setting.echartsAutoTime
      );
      let myChart = this.$refs.charts.chart;
      myChart.on("mouseover", (params) => {
        this.clearData();
      });
      myChart.on("mouseout", (params) => {
        this.timer = setInterval(
          looper,
          this.$store.state.setting.echartsAutoTime
        );
      });
    },
    init() {
      let total = this.repairData.total;
      let colors = ["#ECA444", "#33A1DB", "#56B557", "#e4393c"];
      let piedata = {
        name: "订单数量",
        type: "pie",
        radius: ["42%", "65%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 2,
        },

        color: colors,
        data: [
          {
            value: this.repairData.guarantee,
            name: "现场保障",
            label: {
              shadowColor: colors[0],
            },
          },
          {
            value: this.repairData.baseRepair,
            name: "基地维修",
            label: {
              shadowColor: colors[2],
            },
          },
          {
            value: this.repairData.carryOn,
            name: "对外承揽",
            label: {
              shadowColor: colors[1],
            },
          },
          {
            value: this.repairData.reCreate,
            name: "再制造",
            label: {
              shadowColor: colors[3],
            },
          },
        ],
      };
      this.options = {
        title: {
          // zlevel: 0,
          text: ["{value|" + total + "}", "{name|总数}"].join("\n"),
          top: "center",
          left: "center",
          textStyle: {
            rich: {
              value: {
                color: "#ffffff",
                fontSize: 24,
                fontWeight: "bold",
                lineHeight: 20,
              },
              name: {
                color: "#ffffff",
                lineHeight: 20,
              },
            },
          },
        },
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
        },
        legend: {
          show: false,
          top: "5%",
          left: "center",
        },
        series: [
          //展示圆点
          {
            ...piedata,
            tooltip: { show: true },
            label: {
              formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
              //   position: "outside",
              rich: {
                b: {
                  color: "#fff",
                  fontSize: 12,
                  lineHeight: 26,
                },
                c: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
                per: {
                  color: "#31ABE3",
                  fontSize: 14,
                },
              },
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: true,
            },
            emphasis: {
              show: true,
            },
          },
          {
            ...piedata,
            tooltip: { show: true },
            itemStyle: {},
            label: {
              backgroundColor: "inherit", //圆点颜色，auto：映射的系列色
              height: 0,
              width: 0,
              lineHeight: 0,
              borderRadius: 2.5,
              shadowBlur: 8,
              shadowColor: "auto",
              padding: [2.5, -2.5, 2.5, -2.5],
            },
            labelLine: {
              length: 20, // 第一段线 长度
              length2: 36, // 第二段线 长度
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped></style>
