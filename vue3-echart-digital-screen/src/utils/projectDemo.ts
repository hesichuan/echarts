const projects = [
    { name: "智慧灯杆", status: -1, type: "web" },
    { name: "智慧园区", status: 1, type: "web" },
    { name: "智慧物流", status: 1, type: "web" },
    { name: "扫码抗疫情", status: 1, type: "app" },
    { name: "在线开发票", status: 1, type: "web" },
    { name: "柳州乘车码", status: 1, type: "app" },
    { name: "医疗照护", status: -1, type: "web" },
    { name: "大数据驾驶舱", status: 1, type: "web" },
    { name: "OA办公", status: 1, type: "web" },
    { name: "项目申报", status: -1, type: "project" },
    { name: "H5邀请函", status: 1, type: "design" },
    { name: "微信表情包", status: 1, type: "design" },
  ];

  // 获取项目使用情况
const getProjectUseData = () => {
    return projects.map((e) => ({
      ...e,
      users: 10,
      companines: 30,
    }));
  };
const projectUseData = getProjectUseData();

export default {
    projectUseData
}