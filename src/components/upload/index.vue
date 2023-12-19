<template>
  <el-upload
    action=""
    class="upload-demo"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :http-request="uploadRequestHandle"
    :before-remove="beforeRemove"
    :show-file-list="false"
    :disabled="isLoading"
    :limit="1"
    :file-list="fileList"
    ref="upload"
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
      isLoading: false,
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
    clearFiles() {
      // 调用 clearFiles 方法清空已上传的文件列表
      this.$refs.upload.clearFiles();
    },
    uploadRequestHandle(params) {
      const formdata = new FormData();
      formdata.append("file", params.file);
      formdata.append("type", 0);

      this.isLoading = true;
      exportRepairKanbanApi(formdata)
        .then((res) => {
          console.log("上传文件-res", res.errorMessage);
          if (res.status === "SUCCEED") {
            this.$ElMessage({
              message: "上传成功~",
              type: "success",
              onClose: () => {
                window.location.reload();
              },
            });
          } else {
            this.$ElMessage({
              message: `${res.errorMessage}` || "上传出错~",
              type: "warning",
            });
          }
        })
        .catch((err) => {
          console.log("上传错误", err);
        })
        .finally(() => {
          this.clearFiles();
          this.isLoading = false;
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
