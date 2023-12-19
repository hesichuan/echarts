import * as API from "../api";

export const repaiKanbanApi = () => {
  // return API.POST("/customer/largeScreen/kanbanDataImport");
  return API.GET("/customer/largeScreen/kanBanData");
};

export const exportRepairKanbanApi = (data) => {
  return API.POST("/customer/largeScreen/kanbanDataImport", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
