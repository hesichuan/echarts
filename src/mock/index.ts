import type { MockMethod } from "vite-plugin-mock";
import { config } from "../config/axios/config";

import orderKanbanData from "./orderKanbanData";
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