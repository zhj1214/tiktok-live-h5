import { OSSSTS, OSSSTSH5 } from '@api/evaluation'
import store from '@src/store'
import { co } from './co'

function randomString(len: number) {
  len = len || 32
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  var maxPos = chars.length
  var pwd = ''
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd
}

/**
 *获取当前时间
 *format=1精确到天
 *format=2精确到分
 */
function getCurrentDate(format: number) {
  var now = new Date()
  var year = now.getFullYear() // 得到年份
  var month: string | number = now.getMonth() // 得到月份
  var date: string | number = now.getDate() // 得到日期
  // eslint-disable-next-line no-unused-vars
  var day = now.getDay() // 得到周几
  var hour: string | number = now.getHours() // 得到小时
  var minu: string | number = now.getMinutes() // 得到分钟
  var sec: string | number = now.getSeconds() // 得到秒
  month = month + 1
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minu < 10) {
    minu = '0' + minu
  }
  if (sec < 10) {
    sec = '0' + sec
  }
  var time = ''

  if (format === 1) {
    // 精确到天
    time = year + '' + month + '' + date
  } else if (format === 2) {
    // 精确到分
    time = year + '' + month + '' + date + '' + hour + '' + minu + '' + sec
  }
  return time
}

// 获取文件类型
function getFileType(fileName: string) {
  const tfileName = fileName.lastIndexOf('.') // 取到文件名开始到最后一个点的长度
  const tfileNameLen = fileName.length // 取到文件名长度
  const tfileType = fileName.substring(tfileName + 1, tfileNameLen) // 截
  return tfileType
}
// 弹窗提示
function showToastFun(str: string) {
  str && uni.showToast({ title: str, icon: 'none', duration: 1200 })
  store.commit('setLoadingVal', false)
  uni.hideLoading()
}
function uploadTaskFun(res, filePaths: string, filePath: string) {
  return uni.uploadFile({
    url: `https://${res.bucket}.${res.endpoint}`, // 上传到OSS
    filePath: filePaths,
    name: 'file',
    header: {
      'Content-Type': 'multipart/form-data'
    },
    formData: {
      host: `https://${res.bucket}.${res.endpoint}`,
      name: filePath,
      key: 'evaluation/' + filePath,
      OSSAccessKeyId: res.accessId,
      policy: res.policy,
      Signature: res.signature,
      success_action_status: '200'
    },
    success: (res) => {
      if (res.statusCode === 200) {
        showToastFun('')
      } else {
        showToastFun('视频上传失败！')
      }
    },
    fail: (err) => {
      if (err.errMsg !== 'uploadFile:fail abort') {
        showToastFun('视频上传失败！')
      } else {
        uni.hideLoading()
      }
    }
  })
}
// 上传oss共同方法，返回url
/**
 *
 * @param {*} file
 * @param {*} filePath
 *
 */
// @ts-ignore
export let uploadTask
async function uploadFileToOSS(file: { name: string }, filePaths: string) {
  uni.showLoading({ title: '视频上传中···' })
  let res = await OSSSTS()
  let fileType = `${getFileType(file.name)}` // 截
  let randomName = `${randomString(18)}`
  let curDate = `${getCurrentDate(1)}`
  let curTime = `${getCurrentDate(2)}`
  let filePath = `${curDate}/${randomName}${curTime}.${fileType}`
  let vedioUrl = `https://${res.bucket}.${res.endpoint}/evaluation/${filePath}`
  return new Promise((resolve, reject) => {
    uploadTask = uploadTaskFun(res, filePaths, filePath)
    resolve(vedioUrl)
  })
}

async function uploadFileToOSSH5(file: { name: string }, filePaths: string) {
  uni.showLoading({ title: '文件上传中···' })
  let res = await OSSSTSH5()
  let clientOSS = OSS
  // if (process.env.NODE_ENV === 'production') {
  //   clientOSS = OSS.default
  // }
  var client = new clientOSS({
    region: res.region,
    accessKeyId: res.accessId,
    accessKeySecret: res.accessKey,
    stsToken: res.securityToken,
    bucket: res.bucket
  })
  let fileType = `${getFileType(file.name)}` // 截
  let randomName = `${randomString(18)}`
  let curDate = `${getCurrentDate(1)}`
  let curTime = `${getCurrentDate(2)}`
  let filePath = curDate + '/' + randomName + curTime + '.' + fileType
  const blob = await blobURL2File(filePaths)

  let fileOSS = new window.File([blob], randomName, { type: fileType })
  // 获取当前网络协议
  // let protocol = process.env.NODE_ENV === 'development' ? 'https:' : location.protocol
  return new Promise((resolve, reject) => {
    co(function* () {
      // @ts-ignore
      var result = yield client.multipartUpload(filePath, fileOSS)
      resolve(`https://${res.bucket}.${res.endpoint}/${result.name}`)
    }).catch(function (err) {
      reject(err)
    })
  })
}

export function blobURL2File(blodurl) {
  return new Promise((resolve, reject) => {
    var http = new XMLHttpRequest()
    http.open('GET', blodurl, true)
    http.responseType = 'blob'
    http.onload = function (e) {
      if (this.status == 200 || this.status === 0) {
        // console.log('blod数据',this.response);
        // 在将blod数据转为file
        // let files = new window.File([this.response], 'file.name', { type: 'image' })
        // console.log('blod数据转换file',files);
        resolve(this.response)
      }
    }
    http.send()
  })
}

export { uploadFileToOSS, uploadFileToOSSH5 }
