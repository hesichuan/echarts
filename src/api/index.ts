import request from '@/config/axios'

// 设备echart图表1
export const deviceEchartCountApi = () => {
    return request.get({ url: `/customer/stat/orgDevice` })
}
// 订单联合统计
export const orderStatisticApi = () => {
  return request.get({ url: `/customer/core/orderKanbanData` })
}
// 设备联合统计
export const deviceStatisticApi = () => {
  return request.get({ url: `/customer/device/deviceKanbanData` })
}