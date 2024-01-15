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
import DefaultDevice from '@/assets/imgs/default-device.png'
import { getDeviceLocationsApi } from '@/api'

const VITE_ENV = import.meta.env

const MAX_ZOON = 23 // 地图缩放最大级别

const currentDeviceInfo = ref({})
const popupData = ref({})
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

const BASE_HOST =
  VITE_ENV.VITE_APP_MAP_TILE !== 'true'
    ? 'http://218.205.135.163:8090'
    : `${window.location.protocol}//${window.location.host}`

const a4MapLayer = new TileLayer({
  visible: true,
  source: new XYZ({
    visible: true,
    url:
      `${BASE_HOST}/A4Service/TileService.ashx?c={x}&r={y}&l={z}&token=` +
      '84265148-19bb-4b6b-a2d0-923738b4ebbf' +
      '&type=IMGMIX'
  })
})

function packageFragment(deviceInfo) {
  currentDeviceInfo.value = { ...deviceInfo }
  console.log('deviceInfo', deviceInfo)
  const includeKey = {
    // deviceName: '设备名称：',
    organName: '所属单位：',
    // brandName: '设备品牌：',
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

  const newObj = {}

  const ul = document.createElement('ul')
  ul.className = 'model-list-ul'

  for (const i in includeKey) {
    if (deviceInfo[i]) {
      const label = includeKey[i]
      let inner = deviceInfo[i]

      if (label == '发动机状态：') {
        if (inner == 1) {
          inner = '开'
        } else {
          inner = '关'
        }
      }

      newObj[label] = inner

      const li = document.createElement('li')
      li.innerHTML = `${label}${inner}`

      ul.appendChild(li)
    }
  }
  popupData.value = {
    base: { ...newObj },
    other: { mainImg: deviceInfo.mainImg || '' }
  }

  console.log('popupData', popupData.value)
  return ul
}

let overlay = null
// overlay.setPosition(undefined);// 设置弹窗位置，刚开始不显示，设置undefined

//点击事件
function clickMap(evt) {
  // evt.pixel 鼠标点击的位置，这个应该是像素
  let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layerVetor) {
    return feature
  })
  if (feature) {
    if (feature.getProperties().features) {
      // 聚合情况下
      let features = feature.getProperties().features
      if (feature.getProperties().features.length == 1) {
        let attr = features[0].values_
        let coodinate = evt.coordinate // 鼠标点击的坐标位置
        if (features[0].values_) {
          let deviceInfo = attr.deviceInfo

          packageFragment(deviceInfo)

          // popupContent.value.innerHTML = ''
          // popupContent.value.appendChild(packageFragment(deviceInfo))
        } else {
          // popupContent.value.innerHTML = '<ul>' + '<li>' + '--' + '</li>' + '</ul>'
        }

        overlay.setPosition(coodinate)
        map.addOverlay(overlay)
      } else {
        //有多个要素
        overlay.setPosition(undefined)
        // 发散点
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
      center: [107.73851, 34.98333], // 设置地图中心点
      zoom: 3, // 地图缩放级别（打开页面时默认级别）
      maxZoom: MAX_ZOON, // 地图缩放最大级别
      // minZoom:10, // 地图缩放最小级别
      projection: 'EPSG:4326', //设置坐标系
      constrainResolution: true, // 设置缩放级别为整数
      smoothResolutionConstraint: false // 关闭无级缩放地图
    })
  })

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
const imgOnError = (e) => {
  const img = e.srcElement
  img.src = DefaultDevice
}
</script>

<template>
  <div class="map-container">
    <div id="map"></div>
    <div id="popup" class="ol-popup" ref="popupContainer">
      <div class="container">
        <!-- <div class="popup-title">设备信息</div> -->
        <div>
          <a href="#" id="popup-closer" class="ol-popup-closer" @click="closePop"></a>
        </div>
        <div id="popup-content" ref="popupContent">
          <div class="model-list-ul">
            <div class="header">
              <div class="img-box">
                <img
                  v-if="popupData && popupData.other"
                  :src="popupData.other.mainImg"
                  @error="imgOnError($event)"
                />
              </div>
              <div class="base-info">
                <h1>{{ currentDeviceInfo.deviceName }}</h1>
                <small>{{ currentDeviceInfo.brandName }}</small>
              </div>
            </div>
            <div v-for="(value, key) in popupData.base" :key="key">{{ key }}{{ value }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.map-popup-border-color {
  border-color: rgba(96, 165, 250, 1);
}
.ol-full-screen,
.ol-zoom {
  font-size: 14px;
  /* width: 30px;
  height: 30px; */
  > button {
  }
}
.model-list-ul {
  div:not(:last-child) {
    margin-bottom: 4px;
  }
}
/*设置弹出框样式*/

.ol-popup {
  position: absolute;
  background-color: #fff;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2));
  border-radius: 10px;
  bottom: 12px;
  left: 0px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: rgba(96, 165, 250, 1);
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
  right: 2px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ol-popup-closer:after {
  content: '✖';
}
</style>

<style scoped lang="less">
#popup {
  .popup-title {
    font-size: bold 15px sans-serif;
    text-align: left;
    position: absolute;
    top: 8px;
    left: 14px;
    color: #000000;
  }
  .container {
    background: rgb(96, 63, 139);
    border-radius: 10px;
    border-color: @map-border-color;
    border-width: 6px;
    border-style: solid;
    padding: 10px;
  }
}
#popup-content {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    .img-box {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      border: 2px solid #60a5fa;
      padding: 10px;
    }
    img {
      width: 100%;
      height: 100%;
      background: #fff;
    }
    .base-info {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 60px;
      h1 {
        font-size: 18px;
      }
      small {
        padding-top: 5px;
        border-width: 0;
        border-top-width: 3px;
        border-color: @map-border-color;
        font-size: 12px;
        border-style: solid;
        min-width: 50px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
.humburge-icon {
  background: #fff;
  position: fixed;
  z-index: 2;
  left: 30px;
  top: 30px;
  border: 2px solid #409eff;
  border-radius: 10px;
  transform: translateX(-50%) translateY(-50%);
  &.drawer-icon {
    position: absolute;
    right: 0;
    top: 30px;
    left: auto;
    .bars {
      width: 30px;
    }
  }
}
.eldrawer-content {
  .serach-item {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    &.toggle-radio {
      min-width: 180px;
    }
    .item {
      width: 220px;
    }
    .label {
      min-width: 80px;
      color: #333;
      .count-style {
        color: #409eff;
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
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
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
.map-container {
  width: 100%;
  height: 100%;
}
#map {
  /* 屏幕宽高 */
  width: 100%;
  height: 100%;
}

.other {
  position: absolute;
  left: 100px;
  top: 10px;
  z-index: 1;
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
