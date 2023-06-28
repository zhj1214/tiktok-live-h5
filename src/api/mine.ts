import { request, uploadRequest } from './request'
import { requestLiveHost } from '../util/oss'

/**
 * 获取终身质保详情
 * @param id 质保id
 * @returns
 */
export const getQualitySignDetail = (data: { id: number }) => {
  return request({
    url: '/web/car-service/lifetime',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 签署终身质保
 * @param id 质保id
 * @param version 质保编辑版本
 * @returns
 */
export const putQualitySign = (data: { id: number; version: string }) => {
  return request({
    url: '/web/car-service/lifetime',
    method: 'PUT',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    domain: 'USER',
    data
  })
}

/**
 * 获取捷途币列表数据
 * @param pageNo
 * @param pageSize
 * @param status
 * @returns
 */
export const getCoinList = (data: { pageNo: number; pageSize: number; status?: number }) => {
  return request({
    url: '/web/point/flow',
    method: 'GET',
    domain: 'USER',
    data
  })
}
/**
 * 获取捷途币 积分账户详情
 * @returns
 */
export const getCoinDetail = () => {
  return request({
    url: '/web/point/consumer/detail',
    method: 'GET',
    domain: 'USER'
  })
}
/**
 * 获取捷途币 规则详情
 * @returns
 */
export const getCoinRule = () => {
  return request({
    url: '/web/point/system/brief',
    method: 'GET',
    domain: 'USER'
  })
}
/**
 * 获取旅行值列表数据
 * @param pageNo
 * @param pageSize
 * @returns
 */
export const getTravelValueList = (data: { pageNo: number; pageSize: number }) => {
  return request({
    url: '/web/member/accountFlow',
    method: 'GET',
    domain: 'USER',
    data
  })
}
/**
 * 获取旅行值 规则详情
 * @param systemCode
 * @returns
 */
export const getTravelValueRule = (data: { systemCode: number }) => {
  return request({
    url: '/web/member/system/information',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取邀新活动信息
 * @returns
 */
export const getInviteInfo = (data: { activityCode: string }) => {
  return request({
    url: '/web/activity/register-fission/info',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取邀新活动 个人信息
 * @returns
 */
export const getInviteUserInfo = (data: { activityCode: string }) => {
  return request({
    url: '/web/activity/register-fission/user-info',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取邀新活动 个人信息
 * @returns
 */
export const getInviteRecord = (data: { activityId: string; fissionId: string; pageNo: number; pageSize: number }) => {
  return request({
    url: '/web/activity/register-fission/fission-record/page',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取邀新活动 活动权限状态
 * @returns
 */
export const getInviteStatus = (data: { activityCode: string }) => {
  return request({
    url: '/web/activity/register-fission/activity-valid',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 上传图片
 * @param {}} data
 */
export const fileUpload = (data: UploadRequestData) => {
  return uploadRequest({
    url: '/web/activity/common/file',
    method: 'POST',
    domain: 'USER',
    data
  })
}

/**
 * 获取活动详情
 * @param {}} data
 */
export const getActivityDetail = (data: { activityId: string }) => {
  return request({
    url: `/web/activity/collector/${data.activityId}`,
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取活动已报名列表
 * @param {}} data
 */
export const getActivityUsers = (data: { activityId: string; pageNo: number; pageSize: number; inviteAccountId?: string }) => {
  return request({
    url: `/web/activity/collector/enroll`,
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取预约试驾车型
 *  @returns
 */
export const getTestDriveCarType = () => {
  return request({
    url: `/web/car-service/yike/getAllCarinfoList`,
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 获取预约试驾地区列表
 *  @returns
 */
export const getTestDriveCity = () => {
  return request({
    url: `/web/car-service/yike/getRegionInfo`,
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 获取手机验证码
 * @param clientId 应用id
 * @param data
 * @returns
 */
export const getSmsCode = (clientId: string, data: { mobile: string; template: string }) => {
  return request({
    url: `/api/v1/common/mobile/sms?client_id=${clientId}`,
    method: 'POST',
    domain: 'UAA',
    data
  })
}

/**
 * 提交预约试驾信息
 * @returns {}} data
 */
export const testDirveSubmit = (data: object) => {
  return request({
    url: '/web/car-service/test-drive/submitTestDriveForH5',
    method: 'POST',
    domain: 'USER',
    data
  })
}

/**
 * 获取活动信息
 *  @returns
 */
export const getActivityImg = (data: string) => {
  return request({
    url: `/web/activity/transfer-introduction/info?activityCode=${data}`,
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 校验活动有效性
 *  @returns
 */
export const activityValid = (data: object) => {
  return request({
    url: `/web/activity/transfer-introduction/activity-valid-h5`,
    method: 'GET',
    domain: 'USER',
    data
  })
}
/**
 * 预约试驾根据省市查询经销商
 */
export const getDealerInfo = (data: { provinceId?: string; cityId?: string; erpCode?: string }) => {
  return request({
    url: '/web/car-service/yike/getDealerInfo',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 根据父类目编码获取子类目列表
 */
export const getParentCode: any = (data: {}) => {
  return request({
    url: '/web/pgc/types/by-parent-code?parentCode=vehicleBook',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 根据二级类目编码获取子类目及其内容列表
 */
export const getContent: any = (data: {}) => {
  return request({
    url: '/web/pgc/contents/car-content-for-c',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取内容详情
 */
export const getContentDetail: any = (contentId: '') => {
  return request({
    url: `/web/pgc/contents/${contentId}`,
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 获取内容详情
 */
export const getTaskCommon: any = () => {
  return request({
    url: `/web/taskCenter/task/taskCommon`,
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 获取内容详情
 */
export const getUserTaskDetails: any = (data: any) => {
  return request({
    url: `/web/taskCenter/task/userTaskDetails`,
    method: 'GET',
    domain: 'USER',
    data
  })
}

export const getTaskRecords: any = (data: any) => {
  return request({
    url: `/web/task/tasks/single/records`,
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 获取驿站数据
 */
export const getStationList = (data: any) => {
  return request({
    url: '/api/map/poiTypeCount/list',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 根据经销商信息获取poi详细信息
 */
export const getPoiDetailInfo = (data: any) => {
  return request({
    url: `/api/map/poi/${data.dms}`,
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 根据类目获取poi数据
 */
export const getAllTypePoiList = (data: any) => {
  return request({
    url: '/api/map/poisearch/v2/list',
    method: 'POST',
    domain: 'USER',
    data
  })
}

/**
 * 查询用户勋章墙信息
 */
export const getMedalWall = (data: { accountId: string }) => {
  return request({
    url: '/web/medalWall/userMedalWall',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 勋章佩戴
 */
export const wealMedal = (data: { medalId: string }) => {
  return request({
    url: `/web/medalWall/wear?medalId=${data.medalId}`,
    method: 'PUT',
    domain: 'USER'
  })
}

/**
 * 勋章卸下
 */
export const removeMedal = (data: { medalId: string }) => {
  return request({
    url: `/web/medalWall/removeMedal?medalId=${data.medalId}`,
    method: 'PUT',
    domain: 'USER'
  })
}

/**
 * 查询用户已拥有勋章
 */
export const getObtainMedal = (data: { accountId: string }) => {
  return request({
    url: '/web/medalWall/getUserMedals',
    method: 'GET',
    domain: 'USER',
    data
  })
}

/**
 * 查询勋章详情
 */
export const getMedalDetails = (data: { accountId: string; medalId: string }) => {
  return request({
    url: '/web/medalWall/getMedalDetails',
    method: 'GET',
    domain: 'USER',
    data
  })
}

// 获取用户详情
export const getUserDetail = () => {
  return request({
    url: '/web/user/current/details',
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 查询顾问认证详情
 */
export const getCounselorDetail = () => {
  return request({
    url: '/web/user/adviser',
    method: 'GET',
    domain: 'USER'
  })
}

/**
 * 顾问绑定
 */
export const counselorAuth = (data: { dealerCode: string; adviserMobile: string; verificationCode: string }) => {
  return request({
    url: '/web/user/adviser',
    method: 'POST',
    domain: 'USER',
    data
  })
}

/**
 * 取消顾问绑定
 */
export const cancelCounselorAuth = () => {
  return request({
    url: '/web/user/adviser',
    method: 'PUT',
    domain: 'USER'
  })
}
/**
 * 发送验证码
 */
export const counselorMobileCode = (data: { mobile: string }) => {
  return request({
    url: '/web/user/common/sms',
    method: 'GET',
    domain: 'COMMUNITY',
    data
  })
}

/**
 * @description: 直播WEB SDk 的代理接口
 * @param {string} apiName 接口名称
 * @param {any} params 接口参数
 * @param {string} method 接口请求方式
 */
export const liveApi = (data: any) => {
  return request({
    url: requestLiveHost + '/web/user/volcanic-live',
    method: 'POST',
    domain: '',
    data: data
  })
}
