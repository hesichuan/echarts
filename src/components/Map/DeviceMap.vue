<script lang="ts" setup>
/* eslint-disable */
import { onBeforeMount, onMounted, onUnmounted, ref, reactive, computed, watch } from 'vue'
import XYZ from 'ol/source/XYZ'
import 'ol/ol.css' // 地图样式

import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Style, Fill, Icon, Text, Stroke, Circle } from 'ol/style'
import { Point } from 'ol/geom'
import Map from 'ol/Map'
import View from 'ol/View'
import Feature from 'ol/Feature'
import Cluster from 'ol/source/Cluster'
import CircleStyle from 'ol/style/Circle'
import Overlay from 'ol/Overlay' //弹窗
import { defaults as defaultControls, ScaleLine, FullScreen } from 'ol/control' //默认缩放, 比例尺控件, 全屏控件

import iconPath from '@/assets/imgs/marker-default.png'
import { getDeviceLocationsApi } from '@/api'

const MAX_ZOON = 23 // 地图缩放最大级别

const isToggle = ref(false)
const brandsList = ref([])
const treeList = ref([])
const projectList = ref<{ id: string; projectName: string }[]>([])
const deviceLocations = ref([])
let filterRef = reactive<any>({
  keyword: '',
  organId: '',
  brand: '',
  projectName: '',
  projectId: ''
})

const popupContainer = ref(null)
const popupContent = ref(null)
let currenSelectMap = ref('1')

const humburgeClick = () => {
  isToggle.value = !isToggle.value
}

//地图容器
let map = {} as any // 创建一个地图实例
let bdToken = ''

const beiMapLayer = new TileLayer({
  visible: true,
  source: new XYZ({
    visible: true,
    url: 'http://218.205.135.163:8090/wt/satelite/{z}/{x}/{y}.jpg'
    // url: `${window.location.protocol}//${window.location.host}/wt/satelite/{z}/{x}/{y}.jpg`
    // url: 'https://bds.cnpc:8081/wt/satelite/{z}/{x}/{y}.jpg'
  })
})

const a4MapLayer = new TileLayer({
  visible: true,
  source: new XYZ({
    visible: true,
    // var tileUrlPre = "http://a4.petrochina/A4Service/TileService.ashx?c=${col}&r=${row}&l=${level}&token=" + mapConfig.Token + "&type=";
    // url:
    // `${window.location.protocol}//${window.location.host}/A4Service/TileService.ashx?c={x}&r={y}&l={z}&token=` +
    // '84265148-19bb-4b6b-a2d0-923738b4ebbf' +
    // '&type=IMGMIX'
    url:
      'http://218.205.135.163:8090/A4Service/TileService.ashx?c={x}&r={y}&l={z}&token=' +
      '84265148-19bb-4b6b-a2d0-923738b4ebbf' +
      '&type=IMGMIX'
  })
})

function packageFragment(deviceInfo) {
  console.log('deviceInfo', deviceInfo)
  const includeKey = {
    deviceName: '设备名称：',
    organName: '所属单位：',
    brandName: '设备品牌：',
    projectName: '项目名称：',
    tsLon: '经度：',
    tsLat: '纬度：',
    pstnTime: '位置时间：',
    egnState: '发动机状态：',
    fuel: '当天油耗（L）：',
    totalFuel: '累计油耗（L）：',
    runHours: '当天运行小时数：',
    trunHours: '累计工作小时：',
    devSerial: '设备机号或识别码：'
  } as any

  const ul = document.createElement('ul')
  ul.className = 'model-list-ul'

  for (const i in includeKey) {
    console.log('iii', i)
    if (deviceInfo[i]) {
      const label = includeKey[i]
      console.log('label', label)
      let inner = deviceInfo[i]

      if (label == '发动机状态：') {
        if (inner == 1) {
          inner = '开'
        } else {
          inner = '关'
        }
      }

      const li = document.createElement('li')
      li.innerHTML = `${label}${inner}`

      console.log('li', li)
      ul.appendChild(li)
    }
  }
  return ul
}

let overlay = null
// overlay.setPosition(undefined);// 设置弹窗位置，刚开始不显示，设置undefined

//点击事件
function clickMap(evt) {
  console.log('map.getView().getZoom()', map.getView().getZoom())
  // evt.pixel 鼠标点击的位置，这个应该是像素
  let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layerVetor) {
    return feature
  })
  if (feature) {
    console.log('坐标点')
    if (feature.getProperties().features) {
      //聚合情况下
      let features = feature.getProperties().features
      console.log('feature.getProperties().features', feature.getProperties().features)
      if (feature.getProperties().features.length == 1) {
        console.log('单个坐标点')
        let attr = features[0].values_
        let coodinate = evt.coordinate // 鼠标点击的坐标位置
        console.log('attr', attr)
        if (features[0].values_) {
          let deviceInfo = attr.deviceInfo

          popupContent.value.innerHTML = ''
          popupContent.value.appendChild(packageFragment(deviceInfo))
        } else {
          popupContent.value.innerHTML = '<ul>' + '<li>' + '--' + '</li>' + '</ul>'
        }

        overlay.setPosition(coodinate)
        map.addOverlay(overlay)
      } else {
        //有多个要素
        console.log('聚合点')
        overlay.setPosition(undefined)
        // 发散点
        // const extent = boundingExtent(
        //     features.map((r) => r.getGeometry().getCoordinates())
        // );
        // map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
        if (map.getView().getZoom() < MAX_ZOON) {
          // 放大地图层级
          map.getView().animate({
            center: feature.getGeometry().getCoordinates(),
            zoom: map.getView().getZoom() + 1
          })
        }
      }
    } else {
      overlay.setPosition(undefined)
    }
  } else {
    console.log('非坐标点')
    overlay.setPosition(undefined)
  }
}

// 初始化地图
const initMap = () => {
  map = new Map({
    controls: defaultControls().extend([new FullScreen()]),
    layers: [a4MapLayer],
    target: 'map', //默认加载地图容器 1
    view: new View({
      // center: [116.403218, 39.92372], // 设置地图中心点 北京
      center: [107.73851, 34.98333], // 设置地图中心点 北京
      zoom: 4, // 地图缩放级别（打开页面时默认级别）
      maxZoom: MAX_ZOON, // 地图缩放最大级别
      // minZoom:10, // 地图缩放最小级别
      projection: 'EPSG:4326', //设置坐标系
      constrainResolution: true, // 设置缩放级别为整数
      smoothResolutionConstraint: false // 关闭无级缩放地图
    })
  })

  beiMapLayer.setVisible(true)

  // 实例化比例尺控件
  var scaleLineControl = new ScaleLine({
    // 设置比例尺单位为degrees、imperial、us、nautical或metric（度量单位）
    units: 'metric'
    // minWidth: 100
  })

  map.addControl(scaleLineControl)

  //单击事件
  map.on('singleclick', (e) => {
    clickMap(e)
  })
}

//关闭
const closePop = () => {
  var closer = document.getElementById('popup-closer')
  // //设置点击 X 关闭弹窗
  // closer.onclick = function() {overlay.setPosition(undefined);closer.blur();return false;
  overlay.setPosition(undefined)
  closer.blur()
  return false
}

var coords = []
var clusterSource
var clustersLayer
const createClusterLayerToMap = (data) => {
  coords = []
  let coord = undefined
  let feature = undefined
  for (let deviceLocation of data) {
    coord = [deviceLocation.tsLon, deviceLocation.tsLat]
    feature = new Feature({
      // geometry: new Point(fromLonLat(coord)),
      geometry: new Point(coord)
    })

    // 添加点的时候赋值属性
    feature.setProperties({
      deviceInfo: deviceLocation
    })

    coords.push(feature)
  }

  // console.log("coords",coords)
  // Cluster聚合类
  clusterSource = new Cluster({
    distance: 50, // 要素将被聚合在一起的像素距离，默认为20
    minDistance: 10, // 聚合块之间的最小像素距离，默认为零
    source: new VectorSource({
      features: coords
    })
  })

  clustersLayer = new VectorLayer({
    source: clusterSource,
    zIndex: 1,
    // 聚合样式
    style: function (feature) {
      // console.log("feature",feature)
      // 点的个数
      //获取点位个数，判断当前点位如果数量大于1为聚合点，加载自定义圆。如果只有一个点位，显示我们原本点位。
      const size = feature.get('features').length
      const clusterCount = size
      console.log('clusterCount', clusterCount)
      if (size > 1) {
        let radius = 12
        if (size > 1000) {
          radius = 25
        } else if (size > 100) {
          radius = 20
        } else if (size > 10) {
          radius = 15
        }

        // 聚合点配色
        var defaultColor = ['204,235,197', '168,221,181', '123,204,196', '78,179,211', '43,140,190']
        var bgColor = defaultColor[0]
        if (clusterCount >= 0 && clusterCount < 10) {
          bgColor = defaultColor[0]
        } else if (clusterCount >= 10 && clusterCount < 100) {
          bgColor = defaultColor[1]
        } else if (clusterCount >= 100 && clusterCount < 1000) {
          bgColor = defaultColor[2]
        } else if (clusterCount >= 1000 && clusterCount < 10000) {
          bgColor = defaultColor[3]
        } else if (clusterCount >= 10000) {
          bgColor = defaultColor[4]
        }

        let jhSize = Math.round(12 + Math.pow(clusterCount, 1 / 5) * 10)

        if (map.getView().getZoom() >= MAX_ZOON) {
          return new Style({
            image: new Icon({
              src: iconPath,
              width: 25,
              height: 34
            }),
            text: new Text({
              // 文字样式
              font: '15px sans-serif',
              text: size.toString(), //显示数量
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        } else {
          return new Style({
            image: new Circle({
              // 圆形
              // radius: radius, // 半径
              radius: jhSize / 2, // 半径
              stroke: new Stroke({
                // 边框
                color: '#fff'
              }),
              fill: new Fill({
                // 填充
                // color: '#3399CC'
                color: 'rgba(0,0,255,0.5)'
                // color : 'rgba(' + bgColor + ',.5)'
              })
            }),
            text: new Text({
              // 文字样式
              font: '15px sans-serif',
              text: size.toString(), //显示数量
              fill: new Fill({
                color: '#fff'
              })
            })
          })
        }
      } else {
        // 图片
        return new Style({
          image: new Icon({
            src: iconPath,
            width: 25,
            height: 34
          })
        })
      }
    }
  })
  map.addLayer(clustersLayer) // 将可聚合的点图层添加至地图
}

//移除聚合
function removeCluster() {
  // var clusterSource = map.getSource("")
  //当前聚合标注数据源中的要素
  console.log('clusterSource', clusterSource)
  if (overlay) {
    overlay.setPosition(undefined) // 隐藏弹窗
  }
  if (clusterSource) {
    var currentFeatrues = clusterSource.getSource().getFeatures()
    //如果聚合标注数据源中没有要素，则重新添加要素
    if (currentFeatrues.length != 0) {
      //移除聚合标注数据源中的所有要素
      clusterSource.getSource().clear()
      //移除标注图层
      map.removeLayer(clustersLayer)
    }
  }
}

onMounted(() => {
  overlay = new Overlay({
    element: popupContainer.value, //绑定 Overlay 对象和 DOM 对象的
    autoPan: true, // 是否自动平移 即假如标记在屏幕边缘，弹出窗口弹出时自动平移地图使弹出框完全可见
    offset: [-50, 0], //偏移量，使得弹出框显示在坐标点正上方
    autoPanAnimation: {
      duration: 250 //自动平移效果的动画时间
    },
    stopEvent: false //事件冒泡
  })
  overlay.setPosition(undefined) // 设置弹窗位置，刚开始不显示，设置undefined

  initMap()

  removeCluster()
  getDeviceLocations(filterRef)
})

/** 获取设备位置信息 */
const getDeviceLocations = async (data) => {
  try {
    const res = await getDeviceLocationsApi(data)
    deviceLocations.value = res?.data || []
    createClusterLayerToMap(deviceLocations.value)
  } catch (error) {
    console.log('获取出错', error)
  }
}
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <div id="popup" class="ol-popup" ref="popupContainer">
      <!--      //弹出框标题-->
      <div
        id="popup-title"
        style="
          font: bold 15px sans-serif;
          align: left;
          position: absolute;
          top: 8px;
          left: 14px;
          color: #000000;
        "
      >
        设备信息
      </div>
      <!--      //弹出框右上角关闭效果-->
      <div>
        <a href="#" id="popup-closer" class="ol-popup-closer" @click="closePop"></a>
      </div>
      <!--      //弹出框内容-->
      <div id="popup-content" ref="popupContent" style="padding-top: 20px; font-size: 12px"></div>
    </div>
  </div>
</template>

<style>
.ol-full-screen,
.ol-zoom {
  font-size: 14px;
  /* width: 30px;
  height: 30px; */
  > button {
  }
}
ul.model-list-ul {
  color: #000;
  li:not(:last-child) {
    margin-bottom: 4px;
  }
}
</style>

<style scoped lang="less">


.humburge-icon {
  background: #fff;
  position: fixed;
    z-index: 2;
    left: 30px;
    top: 30px;
    border: 2px solid #409eff;
    border-radius: 10px;
    transform: translateX(-50%) translateY(-50%);
  &.drawer-icon{
    position: absolute;
    right: 0;
    top: 30px;
    left: auto;
    .bars{
      width: 30px;
    }
  }
}
.eldrawer-content{
  .serach-item{
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    &.toggle-radio{
      min-width: 180px;
    }
    .item{
      width: 220px;
    }
    .label{
      min-width: 80px;
      color:#333;
      .count-style{
        color:#409eff
      }
    }
  }
}

.bars {
  width: 35px;
  cursor: pointer;
}
.bars .line {
  fill: none;
  stroke: #409eff;
  stroke-width: 4;
  stroke-linecap: square;
  transition: stroke-dasharray 400ms,  stroke-dashoffset 400ms;
}
.bars .line.top {
  stroke-dasharray: 40 172;
}
.bars .line.middle {
  stroke-dasharray: 40 111;
}
.bars .line.bottom {
  stroke-dasharray: 40 172;
}
.bars.active .top {
  stroke-dashoffset: -132px;
}
.bars.active .middle {
  stroke-dashoffset: -71px;
}
.bars.active .bottom {
  stroke-dashoffset: -132px;
}


.search-container{
  //margin-left: 40px;
  display: flex;
  align-items: center;
  min-height: 45px;
  position: fixed;
  z-index: 10;
  background: rgba(255,255,255,.7);
  padding: 0 10px;

  width: calc(100% - 100px);
    margin: 0 50px;
    border-radius: 25px;
  -webkit-box-shadow: 0px 10px 38px 0px rgba(0,0,0,0.1);
  -moz-box-shadow: 0px 10px 38px 0px rgba(0,0,0,0.1);
  box-shadow: 0px 10px 38px 0px rgba(0,0,0,0.1);
    box-sizing: border-box;
  .serach-item{
    display: flex;
    align-items: center;
    margin-left: 15px;
    &.toggle-radio{
      min-width: 180px;
    }
    .item{
      width: 220px;
    }
    .label{
      min-width: 80px;
      color:#333;
    }
  }
}
.map-container{
  width: 100%;height: 100%;
}
#map{
  /* 屏幕宽高 */
  width: 100%;
  height: 100%;
  /*height: 100%;*/
  /*height: 100%;*/
}

.selectLocation {
  width: 100%;
  height: 100%;
  position: relative;
  /*// float: right;*/
}

.other{
  position: absolute;
  left:100px;
  top: 10px;
  z-index: 1;
}

/*设置弹出框样式*/
.ol-popup {
  position: absolute;
  background-color: #fff;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: 0px;
  min-width: 280px;
}
.ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: #eeeeee;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
<style>
.ol-zoom {
  bottom: 0.5em;
  right: 0.5em;
  left: auto;
  top: auto;
}
</style>
