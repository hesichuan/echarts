import * as API from "../api";

export const repaiKanbanApi = () => {
  // return API.POST("/customer/largeScreen/kanbanDataImport");
  return API.GET("customer/largeScreen/kanBanData");
};
