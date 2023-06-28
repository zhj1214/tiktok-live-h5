import { request } from './request'

/**
 * 获取JS-SDK权限签名
 * @returns
 */
export const getSignature = (params: { url: string; id: string }) => {
  return request({
    url: '/web/weixin/js-sdk/signature',
    method: 'GET',
    domain: 'COMMUNITY',
    data: { url: params.url, appId: params.id },
    withoutToken: true
  })
}
