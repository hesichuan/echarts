import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

// const modules = import.meta.glob("./modules/*.ts", { eager: true });

// const mockModules: any[] = [];
// Object.keys(modules).forEach(async (key) => {
//   if (key.includes("_")) {
//     return;
//   }
//   mockModules.push(...(modules[key] as any));
// });

import testModule from './modules/index'

export function setupProdMockServer() {
  // createProdMockServer(mockModules);
  createProdMockServer([...testModule]);
}
