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
export const remandOrderDataApi  =() => {
  return request.get({ url: `/mock/api/remandOrderApi` })
}
// 本地json文件 
export const getChinaGeoJson = () => {
  return request.get({ url: `/mock/api/chinaGeoApi` })
}