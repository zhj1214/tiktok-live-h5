import { request } from './request'
/**
 * 获取手机验证码
 * @param clientId 应用id
 * @param data
 * @returns
 */
export const getSmsCode = (clientId: string, data: { mobile: string; template?: string }) => {
  return request({
    url: `/api/v1/common/mobile/sms?client_id=${clientId}`,
    method: 'POST',
    domain: 'UAA',
    data
  })
}

/**
 * 手机号验证码登录
 * @param data
 * @returns
 */
export const login = (data: { mobile: string; verificationCode: string; isCreatePassword?: boolean; source?: number; clientId?: string }) => {
  return request({
    url: '/api/v1/uaa/mobile/mobile-code-login',
    method: 'POST',
    domain: 'UAA',
    data
  })
}
/**
 * 微信小程序登录
 * @param data
 * @returns
 */
export const wxLogin = (data: { jsCode: string; encryptedData: string; iv: string; source: number }) => {
  return request({
    url: '/api/v1/thirdparty/wechat/miniprogram/login',
    method: 'POST',
    domain: 'UAA',
    data
  })
}

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
  return request({
    url: '/api/v1/uaa/logout/token',
    method: 'GET',
    domain: 'UAA'
  })
}

/**
 * 获得当前用户收货地址列表
 * @returns
 */
export const getAddress = () => {
  return request({
    url: '/api/v1/app/address',
    method: 'GET',
    domain: 'MALL',
    data: { addressType: 2 }
  })
}

/**
 * 获取收货地址详情
 * @param id 地址id
 * @returns
 */
export const getAddressInfo = (id: string) => {
  return request({
    url: `/api/v1/app/address/${id}`,
    method: 'GET',
    domain: 'MALL'
  })
}
// 430签到页面相关接口  start
/**
 * 获取捷途币
 * @returns
 */
export const getVipUserPoint = () => {
  return request({
    url: `/web/point/consumer/detail`,
    method: 'GET',
    domain: 'USER'
  })
}
// 根据场景号获取任务信息
export const getTaskInfo = (sceneCode = 'signInScene') => {
  return request({
    url: `/web/task/tasks/load-one?sceneCode=${sceneCode}&terminal=4`,
    method: 'GET',
    domain: 'USER',
    needTerminal: false
  })
}
// 获取用户任务数据
export const getUserData = (taskId: string) => {
  return request({
    url: `/web/task/tasks/user/progress?taskId=${taskId}`,
    method: 'GET',
    domain: 'USER'
  })
}
// 任务触发接口
export const signInEventStart = () => {
  return request({
    url: `/web/task/tasks/event-start`,
    method: 'POST',
    domain: 'USER',
    data: {
      eventCode: 'SJ50001'
    }
  })
}
/**
 * 获取广告位详情
 * @param pageCode 广告位位置代码
 * @returns
 */
export const getBannerList = (data: { pageCode: string }) => {
  return request({
    url: '/web/position/details',
    method: 'GET',
    domain: 'USER',
    data
  })
}
// 430签到页面相关接口  end
/**
 * 获取省市区
 * @param pid 父区划id
 * @returns
 */
export const getDistrict = (code?: string) => {
  return request({
    url: `/web/districts/${code}`,
    method: 'GET',
    domain: 'MALL'
  })
}
/**
 * 获取省市区
 * @param pid 父区划id
 * @returns
 */
export const getOrgDistrict = (pid?: string) => {
  return request({
    url: '/web/test-drive/consumer/org/district',
    method: 'GET',
    domain: 'LEAD',
    data: pid
      ? {
          pid
        }
      : null
  })
}
