import { ossUrl } from '../util/oss'

export async function getConfig() {
  try {
    const res = await uni.request({
      url: ossUrl + '/fe-hybrid-h5/fe-config.json',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'accept-language': 'zh-CN,zh',
        'cache-control': 'no-cache'
      },
      timeout: 30000
    })
    //@ts-ignore
    if (res.statusCode === 200) {
      //@ts-ignore
      return res.data
    } else {
      throw new Error('配置文件获取失败')
    }
  } catch (error) {
    throw new Error('配置文件获取失败')
  }
}
