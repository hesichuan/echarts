import request from '@/config/axios'

// 设备echart图表1
export const deviceEchartCountApi = () => {
  return request.get({ url: `/customer/stat/orgDevice` })
}
// 订单联合统计
export const orderStatisticApi = (params) => {
  return request.get({ url: `/customer/core/orderKanbanData`, params })
}
// 设备联合统计
export const deviceStatisticApi = () => {
  return request.get({ url: `/customer/device/deviceKanbanData` })
}
// 设备品牌
export const deviceBrandsList = () => {
  return request.get({ url: '/customer/brand/select' })
}
// 获取机构树
export const getOrgTreeApi = () => {
  return request.get({ url: `/customer/organ/tree` })
}
// 获取项目列表
export const projectList = (): Promise<any> => {
  return request.get({ url: '/customer/common/project' })
}

// 获取设备位置信息
export const getDeviceLocationsApi = (data) => {
  return request.post({ url: `/customer/device/deviceLocation`, data })
}
// 重点设备项目下转投入
export const getEquipmentInvestmentList = (params): Promise<any> => {
  return request.get({ url: '/customer/device/kanban/getDevice', params })
}

// 数据看板整体接口
export const getKanbanBaseData = (): Promise<any> => {
  return request.get({ url: '/customer/device/kanban/get' })
}

// 获取集租、共享设备数据
export const getCollectiveAndRentalSharingDeviceData = (): Promise<any> => {
  return request.get({ url: '/customer/device/kanban/leaseDevice' })
}

// // 区域中心以及设备超市数量
// export const marketAreaListApi = (params?: { nationFlag: number | string }) => {
//   return request.get({ url: `/customer/supermarket/list`, params })
// }

/****
 *
 * @description MOCK-data
 *
 */
// 订单-mock
export const orderKanbanDataApi = () => {
  return request.get({ url: `/mock/api/orderKanbanApi` })
}
// 设备-mock
export const deviceKanbanDataApi = () => {
  return request.get({ url: `/mock/api/deviceKanbanApi` })
}
// 需求单-mock
export const remandOrderDataApi = () => {
  return request.get({ url: `/mock/api/remandOrderApi` })
}
// 本地json文件
export const getChinaGeoJson = () => {
  return request.get({ url: `/mock/api/chinaGeoApi` })
}
// cnpc看板
export const getCnpcKanbanJson = () => {
  return request.get({ url: `/mock/api/cnpcKanbanApi` })
}
// 获取
export const getCollectiveAndRentalSharingDeviceJson = () => {
  return request.get({ url: `/mock/api/collectiveAndRentalSharingDevice` })
}
