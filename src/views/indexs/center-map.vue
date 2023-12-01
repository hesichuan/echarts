<!--
 * @Author: daidai
 * @Date: 2022-03-01 11:17:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-09-29 15:50:18
 * @FilePath: \web-pc\src\pages\big-screen\view\indexs\center-map.vue
-->
<template>
  <div class="centermap">
    <!-- <div class="maptitle">
      <div class="zuo"></div>
      <span class="titletext">{{ maptitle }}</span>
      <div class="you"></div>
    </div> -->
    <div class="mapwrap">
      <dv-border-box-13>
        <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">
          中国
        </div>

        <Echart id="CenterMap" :options="options" ref="CenterMap" />
      </dv-border-box-13>
    </div>
  </div>
</template>

<script>
import xzqCode from "../../utils/map/xzqCode";
import { currentGET } from "api/modules";
import * as echarts from "echarts";
import { GETNOBASE } from "api";
const provinceList = [
  {
    name: "陕西省", // 铜川
    value: 1,
  },
  {
    name: "河南省", // 郑州
    value: 2,
  },
  {
    name: "江苏省", // 南通
    value: 3,
  },
  {
    name: "福建省", // 漳州
    value: 4,
  },
  {
    name: "四川省", // 川二线
    value: 5,
  },
  {
    name: "甘肃省", // 泾川
    value: 6,
  },
];
export default {
  data() {
    return {
      mapTimer: null,
      maptitle: "设备分布图",
      options: {},
      code: "china", //china 代表中国 其他地市是行政编码
      echartBindClick: false,
      isSouthChinaSea: false, //是否要展示南海群岛  修改此值请刷新页面
      categories: [
        "铜川-潼关保障组",
        "郑州保障组",
        "南通保障组",
        "漳州保障组",
        "川二线保障组",
        "甘肃泾川保障组",
      ],
    };
  },
  created() {},

  mounted() {
    // console.log(xzqCode);
    this.getData("china");
  },
  methods: {
    getData(code) {
      // src/mock/mock.js
      currentGET("big8", { regionCode: code }).then((res) => {
        console.log("设备分布", res);
        const demoArea = {
          data: {
            dataList: provinceList,
            regionCode: "china",
          },
        };
        if (res.success) {
          this.getGeojson(demoArea.data.regionCode, demoArea.data.dataList); // ('china, [{name: "陕西省",value: 879}]')
          // this.mapclick();
        } else {
          this.$Message.warning(res.msg);
        }
      });
    },
    /**
     * @description: 获取geojson
     * @param {*} name china 表示中国 其他省份行政区编码
     * @param {*} mydata 接口返回列表数据
     * @return {*}
     */
    async getGeojson(name, mydata) {
      this.code = name;
      //如果要展示南海群岛并且展示的是中国的话
      let geoname = name;
      if (this.isSouthChinaSea && name == "china") {
        geoname = "chinaNanhai";
      }
      //如果有注册地图的话就不用再注册 了
      let mapjson = echarts.getMap(name);
      if (mapjson) {
        mapjson = mapjson.geoJSON;
      } else {
        // mapjson = await GETNOBASE(`./map-geojson/word.json`).then(
        mapjson = await GETNOBASE(`./map-geojson/${geoname}.json`).then(
          (res) => {
            return res;
          }
        );
        echarts.registerMap(name, mapjson);
      }
      let cityCenter = {};
      let arr = mapjson.features;
      //根据geojson获取省份中心点
      arr.map((item) => {
        cityCenter[item.properties.name] =
          item.properties.centroid || item.properties.center;
      });
      let newData = [];
      let effectScatterData = [];
      mydata.map((item, index) => {
        const projectList = [
          {
            projectName: "铜川-潼关保障组",
            desc: "保障五公司2台",
          },
          {
            projectName: "郑州保障组",
            desc: "保障弯管机2台",
          },
          {
            projectName: "南通保障组",
            desc: "维修人员2名，车辆1辆。保障南通三公司设备28台。",
          },
          {
            projectName: "漳州保障组",
            desc: "维修人员2名，车辆1台。保障漳州三公司设备12台。",
          },
          {
            projectName: "川二线保障组",
            desc: "维修人员2名，车辆1辆，保障一公司12台，三公司2台。",
          },
          {
            projectName: "甘肃泾川保障组",
            desc: "维修人员2名，车辆1辆。保障西三五公司10台。",
          },
        ];
        if (cityCenter[item.name]) {
          newData.push({
            name: item.name,
            value: [
              cityCenter[item.name].concat(item.value),
              this.categories[index],
            ],
            projectName: projectList[index] && projectList[index].projectName,
            desc: projectList[index] && projectList[index].desc,
          });
          effectScatterData.push({
            name: item.name,
            value: cityCenter[item.name].concat(item.value),
          });
        }
      });
      console.log("data2", newData);
      this.init(name, mydata, newData, effectScatterData);
    },
    outoPaly(myChart) {
      let currentIndex = -1;
      // 启动定时器开始轮播
      this.mapTimer = setInterval(function () {
        var dataLen = provinceList.length;
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        currentIndex = (currentIndex + 1) % dataLen;
        // // 高亮当前图形
        myChart.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: currentIndex,
        });
        // 显示 tooltip
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: currentIndex,
          // position: 'top'
        });
      }, 5000);
      // 鼠标移入停止轮播
      myChart.on("mouseover", (params) => {
        clearInterval(this.mapTimer);
        this.mapTimer = null;

        myChart.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
        });
        // myChart.dispatchAction({
        //   type: "highlight",
        //   seriesIndex: 0,
        //   dataIndex: params.dataIndex,
        // });
        myChart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: params.dataIndex,
        });
      });
      // 鼠标移出 在上一次count的位置后继续轮播
      myChart.on("mouseout", () => {
        this.mapTimer && clearInterval(this.mapTimer);
        this.mapTimer = setInterval(function () {
          var dataLen = provinceList.length;
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: "downplay",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
          currentIndex = (currentIndex + 1) % dataLen;
          // // 高亮当前图形
          myChart.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: currentIndex,
          });
          // 显示 tooltip
          myChart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: currentIndex,
            // position: 'top'
          });
        }, 5000);
      });
    },
    init(name, data, data2, effectScatterData) {
      let top = 90;
      let zoom = 1.15;
      let option = {
        // backgroundColor: "rgba(0,0,0,0)",
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(0,0,0,0.4)", // 提示框浮层的背景颜色。
          axisPointer: {
            // 坐标轴指示器配置项。
            type: "shadow", // 'line' 直线指示器  'shadow' 阴影指示器  'none' 无指示器  'cross' 十字准星指示器。
            axis: "auto", // 指示器的坐标轴。
            snap: true, // 坐标轴指示器是否自动吸附到点上
          },
          textStyle: {
            // 提示框浮层的文本样式。
            color: "#41feff",
            fontStyle: "normal",
            fontWeight: "normal",
            fontFamily: "sans-serif",
            fontSize: 14,
          },
          padding: 0, // 提示框浮层内边距，
          formatter: function (params) {
            if (!params.data) return;

            return `
                <div style='width:150px;'>
                    <p  style="width:100%;height:30px; background: linear-gradient(#2caaab, #136692);  text-align: center;line-height: 30px;">${params.data.projectName}</p>
                    <div style="display:block;word-break: break-all;word-wrap: break-word;white-space:pre-wrap;padding: 10px;">${params.data.desc}</div>
              </div>
              `;
          },
        },
        legend: {
          show: false,
        },
        visualMap: {
          left: 20,
          bottom: 20,
          categories: this.categories,
          inRange: {
            // 渐变颜色，从小到大
            color: [
              "#e4393c",
              "orange",
              "#e6a23c",
              "#67c23a",
              "#e09eff",
              "#626aef",
            ],
          },
          textStyle: {
            color: "#fff",
          },
        },
        geo: {
          map: name,
          roam: false,
          selectedMode: false, //是否允许选中多个区域
          zoom: zoom,
          top: top,
          // aspectScale: 0.78,
          show: false,
          itemStyle: {
            normal: {
              areaColor: "#142957",
              borderColor: "#0692a4",
            },
          },
        },
        series: [
          {
            name: "MAP",
            type: "map",
            map: name,
            data: data2,
            selectedMode: false, //是否允许选中多个区域
            zoom: zoom,
            geoIndex: 1,
            top: top,
            tooltip: {
              trigger: "item",
              textStyle: {
                // color: '#fff',
                fontSize: 14,
              },
            },
            emphasis: {
              label: {
                show: false,
              },
              itemStyle: {
                // areaColor: "#389BB7", // 高亮区域颜色
                areaColor: "#0b64ad",
                borderWidth: 1,
              },
            },
            itemStyle: {
              borderColor: "rgba(147, 235, 248, .8)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺为 false
              },
              shadowColor: "rgba(128, 217, 248, .3)",
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
          },
          {
            data: effectScatterData,
            // data: data2,
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            symbolSize: function (val) {
              return 4;
              // return val[2] / 50;
            },
            legendHoverLink: true,
            showEffectOn: "render",
            rippleEffect: {
              // period: 4,
              scale: 6,
              color: "rgba(255,255,255, 1)",
              brushType: "fill",
            },
            tooltip: {
              show: false,
            },
            // tooltip: {
            //   show: false,
            //   trigger: "item",
            //   formatter: function (params) {
            //     var dotHtml =
            //       '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#0090ff"></span>';
            //     // return `${dotHtml}${params.name}</br>${
            //     //   params.marker
            //     // }设备数量：${params?.data?.deviceNum || "--"}`;
            //     return "000";
            //   },
            //   extraCssText: "z-index:3",
            // },
            label: {
              // formatter: (param) => {
              //   console.log("paream", param);
              //   return param.name.slice(0, 2);
              // },
              formatter: "{b}",
              fontSize: 11,
              offset: [0, 2],
              position: "bottom",
              textBorderColor: "#fff",
              textShadowColor: "#000",
              textShadowBlur: 10,
              textBorderWidth: 0,
              color: "#FFF",
              show: true,
            },
            // colorBy: "data",
            itemStyle: {
              color: "rgba(255,255,255,1)",
              borderColor: "rgba(2255,255,255,2)",
              borderWidth: 4,
              shadowColor: "#000",
              shadowBlur: 10,
            },
          },
          // {
          //   type: "lines",
          //   zlevel: 3,
          //   symbol: "circle",
          //   symbolSize: [5, 5],
          //   color: "#ff8003",
          //   opacity: 1,
          //   label: {
          //     show: true,
          //     padding: [10, 20],
          //     color: "#fff",
          //     backgroundColor: "#1a3961",
          //     borderColor: "#aee9fb",
          //     borderWidth: 1,
          //     borderRadius: 6,
          //     formatter(params) {
          //       let arr = [
          //         params.name,
          //         "废水污染：" + params.value[1] + "家",
          //         "废气污染：" + params.value[0] + "家",
          //       ];
          //       return arr.join("\n");
          //     },
          //     textStyle: {
          //       align: "left",
          //       lineHeight: 20,
          //     },
          //   },
          //   lineStyle: {
          //     type: "solid",
          //     color: "#fff",
          //     width: 0.5,
          //     opacity: 1,
          //   },
          //   data: [
          //     {
          //       name: "北京",
          //       coords: [
          //         [116.24, 39.55, 100],
          //         [120.24, 46.55, 100],
          //       ], // 线条位置[开始位置，结束位置]
          //       value: [1021, 120],
          //     },
          //     {
          //       name: "深圳",
          //       coords: [
          //         [114.271522, 22.753644],
          //         [118.24, 18.55, 100],
          //       ], // 线条位置[开始位置，结束位置]
          //       value: [1021, 120],
          //     },
          //     {
          //       name: "重庆",
          //       coords: [
          //         [106.54, 29.59],
          //         [104.24, 35.55],
          //       ], // 线条位置[开始位置，结束位置]
          //       value: [1021, 120],
          //     },
          //     {
          //       name: "浙江",
          //       coords: [
          //         [120.19, 30.26],
          //         [125.24, 27.55, 100],
          //       ], // 线条位置[开始位置，结束位置]
          //       value: [1021, 120],
          //     },
          //     {
          //       name: "上海",
          //       coords: [
          //         [121.4648, 31.2891],
          //         [122.4648, 32.2891],
          //       ], // 线条位置[开始位置，结束位置]
          //       value: [1201, 60],
          //     },
          //   ],
          // },
        ],
      };
      this.options = option;

      this.outoPaly(this.$refs.CenterMap.chart);
    },
    message(text) {
      this.$Message({
        text: text,
        type: "warning",
      });
    },
    mapclick() {
      if (this.echartBindClick) return;
      //单击切换到级地图，当mapCode有值,说明可以切换到下级地图
      this.$refs.CenterMap.chart.on("click", (params) => {
        // console.log(params);
        let xzqData = xzqCode[params.name];
        if (xzqData) {
          this.getData(xzqData.adcode);
        } else {
          this.message("暂无下级地市!");
        }
      });
      this.echartBindClick = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.centermap {
  // margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(
        92deg,
        #0072ff 0%,
        #00eaff 48.8525390625%,
        #01aaff 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("../../assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("../../assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 630px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5),
        0 0 6px rgba(0, 237, 237, 0.4);
    }
  }
}
</style>
