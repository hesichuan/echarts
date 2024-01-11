<script lang="ts" setup>
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
import { defaults as defaultControls } from 'ol/control' //默认缩放
import { ScaleLine } from 'ol/control' //比例尺控件
import { debounce } from 'lodash-es'
import { FullScreen } from 'ol/control' //全屏控件
// import { ElDrawer, ElDivider, ElTreeSelect, ElSelect, ElOption, ElInput } from 'element-plus'
// import { ElRadio, ElRadioGroup } from 'element-plus'
// import { ElButton, ElAffix } from 'element-plus'

import iconPath from '@/assets/imgs/marker-default.png'
import {
  deviceBrandsList,
  getOrgTreeApi,
  getDeviceLocationsApi,
  projectList as projectPage
} from '@/api'

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

watch(
  filterRef,
  debounce((val) => {
    searchHandle(val)
  }, 500)
)

//地图容器
let map // 创建一个地图实例
let bdToken = ''
const searchHandle = (val) => {
  console.log('搜索项变化了--接口', val)
  removeCluster()
  getDeviceLocations(val)
}

const beiMapLayer = new TileLayer({
  visible: true,
  source: new XYZ({
    visible: true,
    // url: 'http://218.205.135.163:8090/wt/normal/{z}/{x}/{y}.jpg'
    url: `${window.location.protocol}//${window.location.host}/wt/satelite/{z}/{x}/{y}.jpg`
    // url: 'https://bds.cnpc:8081/wt/satelite/{z}/{x}/{y}.jpg'
  })
})

const a4MapLayer = new TileLayer({
  visible: true,
  source: new XYZ({
    visible: true,
    // var tileUrlPre = "http://a4.petrochina/A4Service/TileService.ashx?c=${col}&r=${row}&l=${level}&token=" + mapConfig.Token + "&type=";
    url:
      `${window.location.protocol}//${window.location.host}/A4Service/TileService.ashx?c={x}&r={y}&l={z}&token=` +
      '84265148-19bb-4b6b-a2d0-923738b4ebbf' +
      '&type=VECMIX'
    // url:
    //   'http://218.205.135.163:8090/A4Service/TileService.ashx?c={x}&r={y}&l={z}&token=' +
    //   '84265148-19bb-4b6b-a2d0-923738b4ebbf' +
    //   '&type=VECMIX'
  })
})

function packageFragment(deviceInfo) {
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
        if (map.getView().getZoom() < 20) {
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
  console.log('地图初始化')
  map = new Map({
    controls: defaultControls().extend([new FullScreen()]),
    layers: [
      // gdMapLayer
      // baiDuMapLayer
      // tdMapWgLayer,tdMapDtLayer
      // beiMapLayer
      // beiMapLayer,a4MapLayer
      // a4MapLayer
      // gdMapLayer,tdMapWgLayer,tdMapDtLayer //同时设置两种地图的底图
      a4MapLayer,
      beiMapLayer
      // vectorLayer
    ],
    target: 'map', //默认加载地图容器 1
    view: new View({
      center: [116.403218, 39.92372], // 设置地图中心点
      // center: [32, 2],
      // center:fromLonLat([116.403218, 39.92372]),
      zoom: 8, // 地图缩放级别（打开页面时默认级别）
      maxZoom: 20, // 地图缩放最大级别
      // minZoom:10, // 地图缩放最小级别
      projection: 'EPSG:4326', //设置坐标系
      // projection: 'EPSG:3857', //加载百度地图采用3857坐标系
      constrainResolution: true, // 设置缩放级别为整数
      smoothResolutionConstraint: false // 关闭无级缩放地图
    })
  })

  //同时设置两种地图的底图，地图切换时显示和隐藏底图
  if (currenSelectMap.value == '1') {
    //   tdMapWgLayer.setVisible(true);
    //   tdMapDtLayer.setVisible(true);
    //   gdMapLayer.setVisible(false);

    a4MapLayer.setVisible(true)
    beiMapLayer.setVisible(false)
  }
  if (currenSelectMap.value == '2') {
    // tdMapWgLayer.setVisible(false);
    // tdMapDtLayer.setVisible(false);
    // gdMapLayer.setVisible(true);

    a4MapLayer.setVisible(false)
    beiMapLayer.setVisible(true)
  }

  // 实例化比例尺控件
  var scaleLineControl = new ScaleLine({
    // 设置比例尺单位为degrees、imperial、us、nautical或metric（度量单位）
    units: 'metric'
  })
  map.addControl(scaleLineControl)

  //单击事件
  map.on('singleclick', (e) => {
    clickMap(e)
  })
}

// 切换地图底图事件
const changeMap = (value) => {
  console.log('currenSelectMap', value)
  switch (value) {
    case '1':
      map.getView().animate({
        // 只设置需要的属性即可
        center: [116.403218, 39.92372], // 中心点
        zoom: 8, // 缩放级别
        rotation: undefined, // 缩放完成view视图旋转弧度
        duration: 1000 // 缩放持续时间，默认不需要设置
      })
      // tdMapWgLayer.setVisible(true);
      // tdMapDtLayer.setVisible(true);
      // gdMapLayer.setVisible(false);

      a4MapLayer.setVisible(true)
      beiMapLayer.setVisible(false)
      break

    case '2':
      map.getView().animate({
        // 只设置需要的属性即可
        center: [32, 0], // 中心点
        zoom: 6, // 缩放级别
        rotation: undefined, // 缩放完成view视图旋转弧度
        duration: 1000 // 缩放持续时间，默认不需要设置
      })
      // tdMapWgLayer.setVisible(false);
      // tdMapDtLayer.setVisible(false);
      // gdMapLayer.setVisible(true);

      a4MapLayer.setVisible(false)
      beiMapLayer.setVisible(true)
      break
    default:
      map.getView().animate({
        // 只设置需要的属性即可
        center: [32.595383, 39.92372], // 中心点
        zoom: 10, // 缩放级别
        rotation: undefined, // 缩放完成view视图旋转弧度
        duration: 1000 // 缩放持续时间，默认不需要设置
      })
      // tdMapWgLayer.setVisible(true);
      // tdMapDtLayer.setVisible(true);
      // gdMapLayer.setVisible(false);

      a4MapLayer.setVisible(true)
      beiMapLayer.setVisible(false)
  }
}

// 添加坐标点
const addSinglePoint = () => {
  let feature = new Feature({
    title: 'beijing',
    geometry: new Point([116.403218, 39.92372])
    // geometry: new Point(fromLonLat([116.403218, 39.92372])),
  })
  feature.setStyle(
    new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: 'blue'
        }),
        radius: 4
      })
    })
  )
  //添加点的时候赋值属性
  feature.setProperties({
    id: 'id' + 1,
    name: 'name' + 1,
    desc: 'desc' + 1,
    type: 'type' + 1
  })

  let source = new VectorSource()
  source.addFeature(feature)
  let layer = new VectorLayer()
  layer.setSource(source)
  map.addLayer(layer)
}

// 添加点位
const addPointLayer = (v) => {
  // console.log("111",v);
  const feature = new Feature({
    // 经纬度转换成坐标信息
    // geometry: new Point(fromLonLat(v.long)),
    geometry: new Point(v.long),
    // 可以带别的参数，key 可以随便写，不冲突就行，这里将所有的参数都放进来，供后续使用
    ...v
  })

  feature.setStyle(
    new Style({
      image: new CircleStyle({
        fill: new Fill({
          color: 'blue'
        }),
        radius: 4
      })
    })
  )

  let source = new VectorSource()
  source.addFeature(feature)
  let layer = new VectorLayer()
  layer.setSource(source)
  map.addLayer(layer)
}

//设置原始样式
var originalStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: '#fff'
    }),
    fill: new Fill({
      color: '#3399CC'
    })
  })
})

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

        if (map.getView().getZoom() >= 20) {
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
  searchHandle(filterRef)
})

// 获取品牌
const getBrands = () => {
  deviceBrandsList()
    .then((res) => {
      brandsList.value = res.data || []
    })
    .catch((err) => console.log(err))
}
// 获取机构树
const getOrgTree = async () => {
  try {
    const res = await getOrgTreeApi()
    treeList.value = res?.data || []
  } catch (error) {
    console.log('获取出错', error)
  }
}

// 获取设备位置信息
const getDeviceLocations = async (data) => {
  try {
    const res = await getDeviceLocationsApi(data)
    deviceLocations.value = res?.data || []
    console.log(deviceLocations.value)
    createClusterLayerToMap(deviceLocations.value)
  } catch (error) {
    console.log('获取出错', error)
  }
}

// 获取项目列表api
const getProjectList = () => {
  projectPage().then((res) => {
    projectList.value = res?.data || []
  })
}

const filterNodeMethod = (value, data) => {
  // orgList.value = [...orgList.value].filter((item) => item.name.includes(value))
  return data.name.includes(value)
}

getOrgTree()
getBrands()
getProjectList()
</script>

<template>
  <div class="map">
    <ElDrawer
      v-model="isToggle"
      :size="'280px'"
      :fullscreen="false"
      direction="ltr"
      :show-close="false"
      :with-header="false"
    >
      <div class="eldrawer-content">
        <div class="icon-container">
          <div class="humburge-icon drawer-icon">
            <svg
              class="bars"
              :class="{ active: isToggle }"
              viewBox="0 0 100 100"
              @click="humburgeClick"
            >
              <path
                class="line top"
                d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
              ></path>
              <path
                class="line middle"
                d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
              ></path>
              <path
                class="line bottom"
                d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
              ></path>
            </svg>
          </div>
        </div>
        <!-- 内容 -->
        <div class="search-content">
          <div class="serach-item">
            <span class="label"
              >共 <span class="count-style">{{ deviceLocations.length }} </span> 个设备</span
            >
          </div>
          <div class="serach-item toggle-radio" style="margin-top: 30px">
            <el-radio-group v-model="currenSelectMap" @change="changeMap">
              <el-radio label="1">A4地图</el-radio>
              <el-radio label="2">北斗地图</el-radio>
            </el-radio-group>
          </div>
          <div class="serach-item">
            <ElTreeSelect
              class="item"
              v-model="filterRef.organId"
              filterable
              :data="treeList"
              check-strictly
              clearable
              :render-after-expand="false"
              :filter-node-method="filterNodeMethod"
              placeholder="组织机构"
              :selectParams="{
                multiple: false
              }"
              :props="{
                label: 'name',
                value: 'organId'
              }"
            />
          </div>
          <div class="serach-item">
            <ElSelect
              v-model="filterRef.brand"
              filterable
              clearable
              placeholder="设备品牌"
              class="item"
            >
              <ElOption
                v-for="item in brandsList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </ElSelect>
          </div>
          <div class="serach-item">
            <ElSelect
              v-model="filterRef.projectId"
              clearable
              filterable
              placeholder="项目"
              class="item"
            >
              <ElOption
                v-for="item in projectList"
                :key="item.id"
                :label="item.projectName"
                :value="item.id"
              />
            </ElSelect>
          </div>
        </div>
      </div>
    </ElDrawer>
    <div class="humburge-icon">
      <svg class="bars" :class="{ active: isToggle }" viewBox="0 0 100 100" @click="humburgeClick">
        <path
          class="line top"
          d="m 30,33 h 40 c 13.100415,0 14.380204,31.80258 6.899646,33.421777 -24.612039,5.327373 9.016154,-52.337577 -12.75751,-30.563913 l -28.284272,28.284272"
        ></path>
        <path
          class="line middle"
          d="m 70,50 c 0,0 -32.213436,0 -40,0 -7.786564,0 -6.428571,-4.640244 -6.428571,-8.571429 0,-5.895471 6.073743,-11.783399 12.286435,-5.570707 6.212692,6.212692 28.284272,28.284272 28.284272,28.284272"
        ></path>
        <path
          class="line bottom"
          d="m 69.575405,67.073826 h -40 c -13.100415,0 -14.380204,-31.80258 -6.899646,-33.421777 24.612039,-5.327373 -9.016154,52.337577 12.75751,30.563913 l 28.284272,-28.284272"
        ></path>
      </svg>
    </div>
    <!-- <div class="search-container">
      <div class="serach-item toggle-radio" style="margin-left: 30px">
        <el-radio-group v-model="currenSelectMap" @change="changeMap">
          <el-radio label="1">A4地图</el-radio>
          <el-radio label="2">北斗地图</el-radio>
        </el-radio-group>
      </div>
      <div class="serach-item" style="margin-left: 40px">
        <span class="label"> 所属单位:</span>
        <ElTreeSelect
          class="item"
          v-model="filterRef.organId"
          filterable
          :data="treeList"
          check-strictly
          clearable
          :render-after-expand="false"
          :filter-node-method="filterNodeMethod"
          placeholder="组织机构"
          :selectParams="{
            multiple: false
          }"
          :props="{
            label: 'name',
            value: 'organId'
          }"
        />
      </div>
      <div class="serach-item">
        <span class="label"> 设备品牌:</span>
        <ElSelect
          v-model="filterRef.brand"
          filterable
          clearable
          placeholder="设备品牌"
          class="item"
        >
          <ElOption v-for="item in brandsList" :key="item.id" :label="item.name" :value="item.id" />
        </ElSelect>
      </div>
      <div class="serach-item">
        <span class="label" style="min-width: 50px">项目:</span>
        <ElSelect v-model="filterRef.projectId" clearable filterable placeholder="项目">
          <ElOption
            v-for="item in projectList"
            :key="item.id"
            :label="item.projectName"
            :value="item.id"
          />
        </ElSelect>
      </div>
      <div class="serach-item" style="margin-left: 15px">
        <span class="label">共 {{ deviceLocations.length }} 个设备</span>
      </div>
    </div> -->
  </div>

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
ul.model-list-ul {
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
  width: 100vw;
  height: 100vh;
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
