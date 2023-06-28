import store from '../store'
import { throttle } from '@src/lib/lodash'
import { isAndroid } from '@util/shared'

interface DefaultOption {
  requestOptions: UniApp.RequestOptions
  uploadFileOption: UniApp.UploadFileOption
}
/**
 * 请求平台类型
 */
import { terminal } from '@util/shared.ts'

/**
 * 跳转登陆页面，节流3s
 */
export const relogin = throttle(
  () => {
    uni.removeStorageSync('token')
    store.commit('setLoginStatus', false)
    // #ifdef H5
    if (window.location.pathname === '/package-activity/pages/common-jump') {
      window.$flutter.checkLoginGoBack()
      window.$flutter.fbRouter({ routeName: 'LoginPageGen2', params: {} })
    } else {
      window.$flutter.fbRouter({ routeName: 'LoginPageGen2', params: {} })
    }
    // #endif
  },
  3000,
  {
    trailing: false
  }
)

// 获取token
export const getToken = async () => {
  let token = ''
  // #ifdef H5
  try {
    // 先从本地缓存中读取
    token = uni.getStorageSync('token')
    if (!token) {
      const userAgent = window.navigator.userAgent
      if (userAgent.match(/ios|android\/[0-9.]+/)) {
        // 调用桥接方法获取
        token = await window.$flutter.fbToken()
        console.log('success', token)
        uni.setStorageSync('token', token)
      }
    }
  } catch (error) {
    console.log('token获取失败', error)
  }
  // #endif
  return token
}

/**
 *合并请求参数
 * @param options 传入配置 RequestOptionInfo
 * @param defaultOptions 默认 uni.request 配置 UniApp.RequestOptions
 * @returns UniApp.RequestOptions
 */
async function mergeRequest(
  options: RequestOptionInfo | UploadRequestOptionInfo,
  defaultOptions: DefaultOption,
  isFile: boolean
): Promise<DefaultOption> {
  // domain拼接完整请求地址
  // 获取当前租户的域名数据
  const domainKey = uni.getStorageSync('currentTenant').tenantId || 'JETOUR'
  const domainConfig = (await store.dispatch('config/getFeConfig'))[domainKey]
  const domain = options.domain.toUpperCase()
  if (!domainConfig) {
    console.error('无法获取到联调配置domainConfig')
    return defaultOptions
  }
  let url = (domainConfig[domain] || '') + options.url

  // #ifdef H5
  if (domain === 'WECHAT' && process.env.NODE_ENV === 'development') {
    url = 'http://localhost:3000/back' + options.url
  }
  // #endif

  // 获取携带 access_token
  const token = await getToken()
  // 本地开发拼接 token，保持登录态
  // let token = 'Deme9D-mRPAwLpgqSAIAKwAAAAAAAAAC'
  if (!options.withoutToken && token) {
    url += (url.includes('?') ? '&' : '?') + 'access_token=' + token
    console.log(url)
    // defaultOptions.header['Authorization'] = 'Bearer ' + token
  }

  const data = options.data || {}
  // 添加终端类型参数
  if (domain === 'MALL' || options.needTerminal) {
    data.terminal = terminal
  }
  if (!isFile) {
    defaultOptions.requestOptions.url = url
    defaultOptions.requestOptions.method = options.method
    defaultOptions.requestOptions.data = data
    options.header && Object.assign(defaultOptions.requestOptions.header, options.header)
  } else {
    defaultOptions.uploadFileOption.url = url
    delete options.data.hideLoading
    defaultOptions.uploadFileOption = Object.assign(options.data, defaultOptions.uploadFileOption)
    options.header && Object.assign(defaultOptions.uploadFileOption.header, options.header)
  }
  return defaultOptions
}

/**
 * 请求成功处理逻辑
 * @param data 返回数据
 * @returns
 */
function handleRequestSuccess(data: string | AnyObject | ArrayBuffer) {
  const res = data as AnyObject
  // 直播项目 或者 带有domain的表示的直接返回
  if (res.domain || res.ResponseMetadata) {
    return res
  }
  switch (res.status) {
    case 200:
      return res.data
    case 450:
      return res
    case 401:
      relogin()
      throw new Error('未登录')
    case 601:
      relogin()
      throw new Error('请重新登录')
    case 80001:
      return res
    case 80002:
      return res
    default:
      uni.showToast({
        icon: 'none',
        title: res.message || '服务器端错误'
      })
      throw new Error(res.message || '服务器端错误')
  }
}

/**
 * 发起request请求
 * @param options RequestOptionInfo
 * @returns
 */
export async function request(options: RequestOptionInfo): Promise<any> {
  const defaultOptions: DefaultOption = {
    requestOptions: {
      url: '',
      data: undefined,
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'accept-language': 'zh-CN,zh'
      },
      timeout: 30000
    },
    uploadFileOption: {
      url: ''
    }
  }
  try {
    const res: any = await uni.request((await mergeRequest(options, defaultOptions, false)).requestOptions)

    switch (res.statusCode) {
      case 200: {
        let response = res.data
        if (!res.data && res.ResponseMetadata) {
          response = {
            ResponseMetadata: res.ResponseMetadata,
            Result: res.Result
          }
          if (!res.Result) {
            uni.showToast({
              icon: 'none',
              title: res.ResponseMetadata.Error.Message || '服务器端错误'
            })
          }
        }
        return handleRequestSuccess(response)
      }

      case 401:
        relogin()
        throw new Error('未登录')
      case 601:
        relogin()
        throw new Error('请重新登录')
      default:
        uni.showToast({
          icon: 'none',
          title: res.message || '服务器端错误'
        })
        throw new Error(res.message || '服务器端错误')
    }
  } catch (error: any) {
    throw new Error(error || error.message)
  }
}

/**
 * 发起文件上传请求
 * @param options RequestOptionInfo
 * @returns
 */
export async function uploadRequest(options: UploadRequestOptionInfo): Promise<any> {
  if (!options.data.hideLoading) {
    uni.showLoading({
      title: ' ',
      mask: true
    })
  }
  // console.log(options, 1)
  // if (options.data) {
  //   let keyValues = []
  //   for (let key in options.data) {
  //     keyValues.push(`${key}=${options.data[key]}`)
  //   }
  //   options.url += (options.url.includes('?') ? '&' : '?') + keyValues.join('&')
  // }
  const defaultOptions: DefaultOption = {
    requestOptions: {
      url: ''
    },
    uploadFileOption: {
      url: '',
      header: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Accept: '*/*',
        // 'content-type': 'multipart/form-data',
        'accept-language': 'zh-CN,zh'
      }
    }
  }
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const res = await uni.uploadFile((await mergeRequest(options, defaultOptions, true)).uploadFileOption)

    switch (res.statusCode) {
      case 200:
        return handleRequestSuccess(JSON.parse(res.data))
      case 401:
        relogin()
        throw new Error('未登录')
      case 601:
        relogin()
        throw new Error('请重新登录')
      default:
        uni.showToast({
          icon: 'none',
          title: res.message || '服务器端错误'
        })
        throw new Error(res.message || '服务器端错误')
    }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
interface MapOption {
  url: string
  header?: any
  data?: any
}
// 高德web api
export async function requestMap(options: MapOption): Promise<any> {
  const domain = `https://restapi.amap.com`
  const key = '21b26bcb4db13ff3541ce00c7a9506c4'
  try {
    const feConfig = await store.dispatch('config/getFeConfig')
    const defaultOpt = {
      url: domain + options.url,
      method: 'GET',
      data: { key: feConfig.amap.web_api_key || key }
    }
    Object.assign(defaultOpt.data, options.data)
    const res = await uni.request(defaultOpt)
    switch (res.statusCode) {
      case 200:
        return res.data
      default:
        uni.showToast({
          icon: 'none',
          title: res.message || '服务器端错误'
        })
        throw new Error(res.message || '服务器端错误')
    }
  } catch (error: any) {
    throw new Error(error || error.message)
  }
}
// export default { request, uploadRquest }
