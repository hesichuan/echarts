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
  barData: [41, 147, 84, 92, 132, 141, 153, 83, 50, 118, 154, 136], // 收入
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
const packageData = ({ barData = [], lineData = [], category = [] }) => {
  const rateData = [];
  for (let i = 0; i < barData.length; i++) {
    const curBar = barData[i];
    const curLine = lineData[i];
    const curRate = Math.floor(((curBar - curLine) / curLine) * 100);

    rateData.push(curRate);
  }

  return {
    barData,
    lineData,
    category,
    rateData,
  };
};
export default {
  data() {
    return {
      options: {},
    };
  },
  props: {},
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.pageflag = true;
      currentGET("big6", { companyName: this.companyName }).then((res) => {
        if (res.success) {
          const _data = packageData(demoData);
          console.log("月度利润率", _data);
          this.init(_data);
        } else {
          this.pageflag = false;
          this.$Message({
            text: res.msg,
            type: "warning",
          });
        }
      });
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
          data: ["收入", "成本", "利润率"],
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
            axisLine: {
              lineStyle: {
                color: "#B4B4B4",
              },
            },
            axisLabel: {
              formatter: "{value}% ",
            },
          },
        ],
        series: [
          {
            name: "收入",
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
          {
            name: "成本",
            type: "bar",
            barGap: "-100%",
            barWidth: 10,
            itemStyle: {
              borderRadius: 5,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(156,107,211,0.8)" },
                { offset: 0.2, color: "rgba(156,107,211,0.5)" },
                { offset: 1, color: "rgba(156,107,211,0.2)" },
              ]),
            },
            z: -12,
            data: newData.lineData,
          },
          {
            name: "利润率",
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
