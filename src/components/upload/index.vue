<template>
  <el-upload
    action=""
    class="upload-demo"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :http-request="uploadRequestHandle"
    :before-remove="beforeRemove"
    :show-file-list="false"
    :limit="1"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">上传Excel</el-button>
  </el-upload>
</template>
<script>
import { exportRepairKanbanApi } from "api/modules/kanban";
export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadRequestHandle(params) {
      const formdata = new FormData();
      formdata.append("file", params.file);
      formdata.append("type", 0);

      exportRepairKanbanApi(formdata)
        .then((res) => {
          console.log("上传文件-res", res);
          if (res.status === "SUCCEED") {
            console.log("上传成功");
            this.$forceUpdate();
          } else {
            this.$Message.warning(res.errorMessage || "上传出错~");
          }
        })
        .catch((err) => {
          consoe.log("上传错误", err);
        });
    },
  },
};
</script>
<style lang="scss">
.upload-demo {
  position: absolute;
  left: 0;
  top: 20px;
  z-index: 100;
}
</style>
