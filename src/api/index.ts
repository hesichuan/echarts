import request from '@/config/axios'

// 设备echart图表1
export const deviceEchartCountApi = () => {
    return request.get({ url: `/customer/stat/orgDevice` })
  }