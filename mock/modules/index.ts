import type { MockMethod } from "vite-plugin-mock";
import { config } from "../../src/config/axios/config";

import orderKanbanData from "../json/orderKanbanData";
import deviceKanbanData from "../json/deviceKanbanData"
import remandOrderData from '../json/remandOrderData'
// import getChinaGeoJson from '/public/china_geo.json'

const { result_code } = config;

export default [
    {
        url: '/mock/api/orderKanbanApi',
        method: 'get',
        response: () => {
          return orderKanbanData;
        },
      },
      {
        url: '/mock/api/deviceKanbanApi',
        method: 'get',
        response: () => {
          return deviceKanbanData;
        },
      },
      {
        url: '/mock/api/remandOrderApi',
        method: 'get',
        response: () => {
          return remandOrderData;
        },
      },
      {
        url: '/mock/api/chinaGeoAPI',
        method: 'get',
        response: () => {
          return {
            code: result_code,
            data: [],
            status: "SUCCEED",
          };
        },
      },
    ] as MockMethod[];