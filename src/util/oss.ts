/*
 * @Description:
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-04-06 09:56:38
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-04-10 15:38:09
 */
import { ENV } from './shared'

/**
 * 静态图片oss文件路径
 */
export const OSS_STATIC_PATH = 'fe-hybrid-h5/static'

/**
 * 各环境oss地址
 */
export const OSS_DOMAIN = {
  dev: 'https://supaur-jetour.oss-cn-hangzhou.aliyuncs.com/dev',
  sit: 'https://supaur-jetour.oss-cn-hangzhou.aliyuncs.com/sit',
  uat: 'https://vr-jetour-uat.jetour.com.cn',
  prod: 'https://vr-jetour.jetour.com.cn'
}

export const ossUrl = OSS_DOMAIN[ENV as EnvInfo] // 当前环境oss地址

/**
 * 各环境域名
 */
export const HOST_DOMAIN = {
  dev: 'https://h5-app.jetour-dev.supaur.tech',
  sit: 'https://h5-app.jetour-sit.supaur.tech',
  uat: 'https://h5-app-uat.jetour.com.cn',
  prod: 'https://h5-app.jetour.com.cn'
}
export const hostUrl = HOST_DOMAIN[ENV as EnvInfo] // 当前环境oss地址

/**
 * 直播请求地址
 */
export const LIVE_DOMAIN = {
  dev: 'https://mobile-bff.jetour-dev.supaur.tech',
  sit: 'https://mobile-bff.jetour-sit.supaur.tech',
  uat: 'https://mobile-consumer-uat.jetour.com.cn',
  prod: 'https://mobile-consumer.jetour.com.cn'
}
export const requestLiveHost = LIVE_DOMAIN[ENV as EnvInfo] // 当前环境oss地址

const DOWNLOAD_DOMAIN = {
  dev: 'https://carservice-admin.jetour-sit.supaur.tech',
  sit: 'https://carservice-admin.jetour-sit.supaur.tech',
  uat: 'https://carservice-admin-uat.jetour.com.cn/',
  prod: 'https://carservice-admin.jetour.com.cn'
}

/**
 * 当前环境oss地址
 */
export const downloadUrl = DOWNLOAD_DOMAIN[ENV as EnvInfo]

/**
 *动态获取图片的oss地址
 * @param name 图片名称
 * @returns 图片完整oss地址
 */
export const generatorDynamicPic: GeneratorDynamicPicFunc<string | string[]> = (data: string | string[]): string | string[] => {
  if (typeof data === 'string') {
    return `${ossUrl}/${OSS_STATIC_PATH}/${data}`
  }
  return data.map((item) => `${ossUrl}/${OSS_STATIC_PATH}/${item}`)
}
