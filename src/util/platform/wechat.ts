import { getSignature } from '@api/wechat'
import { ENV } from '../shared'

export function wxConfig() {
  return new Promise(async (resolve, reject) => {
    let url = ''
    let id = ''
    if (navigator.userAgent.indexOf('iPhone') !== -1) {
      url = uni.getStorageSync('pageUrl')
    } else {
      url = location.href.split('#')[0]
    }
    id = ENV === 'sit' || ENV === 'dev' ? 'wxd90da2cc2b3b177c' : 'wx4acec2db42162951'
    try {
      const data = await getSignature({ url, id })
      const { appId, nonceStr, timestamp, signature } = data
      jWeixin.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId, // 必填，公众号的唯一标识
        timestamp, // 必填，生成签名的时间戳
        nonceStr, // 必填，生成签名的随机串
        signature, // 必填，签名
        jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
      })
      jWeixin.ready(() => {
        resolve('ready')
      })
    } catch (error) {
      reject()
    }
  })
}
