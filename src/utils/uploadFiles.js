/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: Shentong
 * @Date: 2020-10-27 17:54:03
 * @LastEditors: liukun
 * @LastEditTime: 2020-12-16 14:53:51
 */

import axios from '@/api/axiosConfig'
import $http from '@/api'
import Contants from '@/utils/contants'

/**
 * @description 此类包含处理文件的公共方法
 */
class GetFileCommentFn {
  constructor(file) {
    this.type = file.type
    this.name = file.name
  }

  judgeFileType() {
    const fileTypeArr = [
      'image/jpg',
      'image/jpeg',
      'audio/mpeg',
      'image/png',
      'video/mp4',
      'video/mov',
      'video/FLV',
      'video/rmvb'
    ]
    return fileTypeArr.includes(this.type)
  }

  // 后缀名
  getSuffix() {
    var pos = this.name.lastIndexOf('.')
    var suffix = ''
    if (pos !== -1) {
      suffix = this.name.substring(pos)
    }
    return suffix
  }
}
/**
 * @description 文件上传，后端返回签名形式
 * @params file: requiled
 * @params opts { useValidate } 非必传，用于判断是否要使用该构造函数校验方法（使用者在 上传 前可自定义校验规则）
 * @params opts { device } 非必传，用于 解析上传此文件的设备
 */
class UploadFiles extends GetFileCommentFn {
  constructor() {
    const [file, opts = {}] = [].slice.call(arguments)
    const { useValidate = true, device = 'pc' } = opts

    if (!file) return new Error('file is required !')

    super(file)

    this.file = file
    this.name = file.name
    this.size = file.size
    this.type = file.type
    this.device = device
    this.puhSinged = null
    this.useValidate = useValidate
    this.failStatus = {
      status: 'fail',
      filename: this.name
    }
  }

  // 网络请求1-整备好的requstData(其中一步获取oss签名信息token)
  async getOssToken() {
    try {
      const getPubSinged = await $http.Teacher.getPubWriteSinged()
      return getPubSinged.payload
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // 类型大小检测 =>boolean
  beforeAvatarUpload() {
    const isRegulation = super.judgeFileType()

    if (!isRegulation) {
      window._Vue.$message.error(
        '上传头像图片只能是 png/jpg 格式! 音频只能是audio/mpeg格式！ 视频只能是mp4/flv/mov/rmvb格式!'
      )
      return 0
    }
    const isLt2G = this.size / 1024 / 1024 / 1024 < 2
    if (!isLt2G) {
      window._Vue.$message.error('单个上传文件大小不能超过 2G!')
      return 0
    }
    return isRegulation && isLt2G
  }

  // 网络请求2-真正往oss地址开始上传(返回都是成功resolve的promise实例)
  async init() {
    const { formData, HOST, fileUrl } = await this.getOssUploadSigned()
    return new Promise((resolve, reject) => {
      const headers = { 'Content-Type': 'multipart/form-data' }
      const resolveData = {
        status: 'success',
        fileUrl,
        filename: this.name
      }
      // 请求接口
      axios.post(HOST, formData, { headers }).then((res) => {
        if (res.status === 'fail') {
          resolve(this.failStatus)
        }
        resolve(resolveData)
      })
    })
  }
  // 接口获取 Osstoken+整合formData=> 整备好的requstData

  async getOssUploadSigned() {
    const canUpload = !this.useValidate || this.beforeAvatarUpload()
    if (!canUpload) return this.failStatus

    try {
      this.puhSinged = await this.getOssToken()
    } catch (err) {}

    if (this.puhSinged) {
      const {
        bucketName = '',
        endpoint = '',
        accessKeyId = '',
        policy = '',
        singed = ''
      } = this.puhSinged

      const HOST = `https://${bucketName}.${endpoint}`
      const filename = new Date().getTime() + super.getSuffix()
      const dirPath = `${this.device}/fileUpload/`
      const formData = new FormData()
      const fileUrl = `${Contants.OSS_IMG_BASE_URL}/${dirPath}${filename}` // https://s1.meixiu.mobi/....'

      formData.append('key', dirPath + filename) // 存储在oss的文件路径
      formData.append('OSSAccessKeyId', accessKeyId) // accessKeyId
      formData.append('policy', policy) // policy
      formData.append('Signature', singed) // 签名
      formData.append('success_action_status', 200) // 成功后返回的操作码
      formData.append('name', filename)
      formData.append('file', this.file, filename)

      const requstData = {
        formData,
        HOST,
        fileUrl
      }
      console.info('整备好的requstData', requstData)
      return requstData
    }
  }
}

export default UploadFiles
