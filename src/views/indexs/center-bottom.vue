<template>
  <div class="center_bottom">
    <Echart
      :options="options"
      id="bottomLeftChart"
      class="echarts_bottom"
    ></Echart>
  </div>
</template>

<script>
import { currentGET } from "api";
import { graphic } from "echarts";
const demoData = {
  barData: [41, 147, 84, 92, 132, 141, 153, 83, 50, 118, 154, 136], // 维修费用
  category: [
    "22-12",
    "23-01",
    "23-02",
    "23-03",
    "23-04",
    "23-05",
    "23-06",
    "23-07",
    "23-08",
    "23-09",
    "23-10",
    "23-11",
  ],
  lineData: [23, 80, 80, 45, 41, 52, 80, 53, 19, 81, 77, 94], // 成本
};

export default {
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {},
    };
  },
  watch: {
    dataList: {
      handler(newValue, oldValue) {
        // 这里是当 myArray 发生变化时的处理逻辑
        console.log("newValue", newValue);
        this.getData(newValue);
      },
      immediate: true,
    },
  },
  mounted() {
    // this.getData();
  },
  methods: {
    packageData(arr = []) {
      const barData = []; // 维修费用
      const lineData = []; // 成本
      const category = [];
      const rateData = [];
      for (let i = 0; i < arr.length; i++) {
        const cur = arr[i];
        // const curLine = lineData[i];
        // const curRate = Math.floor(((curBar - curLine) / curLine) * 100);

        // rateData.push(curRate);
        barData.push(cur.revenue);
        lineData.push(cur.cost);
        category.push(cur.yearMonth);
        rateData.push(cur.margins.replace(/%/, ""));
      }

      return {
        barData,
        lineData,
        category,
        rateData,
      };
    },
    getData(originData) {
      this.pageflag = true;
      const data = this.packageData(originData);

      this.init(data);
    },
    init(newData) {
      this.options = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.6)",
          borderColor: "rgba(147, 235, 248, .8)",
          textStyle: {
            color: "#FFF",
          },
          formatter: function (params) {
            // 添加单位
            var result = params[0].name + "<br>";
            params.forEach(function (item) {
              if (item.value) {
                if (item.seriesName == "安装率") {
                  result +=
                    item.marker +
                    " " +
                    item.seriesName +
                    " : " +
                    item.value +
                    "</br>";
                } else {
                  result +=
                    item.marker +
                    " " +
                    item.seriesName +
                    " : " +
                    item.value +
                    "</br>";
                }
              } else {
                result += item.marker + " " + item.seriesName + " :  - </br>";
              }
            });
            return result;
          },
        },
        legend: {
          // data: ["维修费用", "成本", "利润率"],
          data: ["维修费用", "维修订单数量"],
          textStyle: {
            color: "#B4B4B4",
          },
          top: "0",
        },
        grid: {
          left: "50px",
          right: "40px",
          bottom: "30px",
          top: "30px",
        },
        xAxis: {
          data: newData.category,
          axisLine: {
            lineStyle: {
              color: "#B4B4B4",
            },
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: [
          {
            splitLine: { show: false },
            name: "单位：万元",
            nameTextStyle: {
              padding: [10, 0, 0, 10],
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#B4B4B4",
              },
            },

            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            splitLine: { show: false },
            name: "单位：个",
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        series: [
          {
            name: "维修费用",
            type: "bar",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#956FD4" },
                { offset: 1, color: "#3EACE5" },
              ]),
            },
            data: newData.barData,
          },
          // {
          //   name: "成本",
          //   type: "bar",
          //   barGap: "-100%",
          //   barWidth: 10,
          //   itemStyle: {
          //     borderRadius: 5,
          //     color: new graphic.LinearGradient(0, 0, 0, 1, [
          //       { offset: 0, color: "rgba(156,107,211,0.8)" },
          //       { offset: 0.2, color: "rgba(156,107,211,0.5)" },
          //       { offset: 1, color: "rgba(156,107,211,0.2)" },
          //     ]),
          //   },
          //   z: -12,
          //   data: newData.lineData,
          // },
          {
            name: "维修订单数量",
            type: "line",
            smooth: true,
            showAllSymbol: true,
            symbol: "emptyCircle",
            symbolSize: 8,
            yAxisIndex: 1,
            itemStyle: {
              color: "#F02FC2",
            },
            data: newData.rateData,
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.center_bottom {
  width: 100%;
  height: 100%;

  .echarts_bottom {
    width: 100%;
    height: 100%;
  }
}
</style>
