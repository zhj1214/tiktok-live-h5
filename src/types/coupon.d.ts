/**
 * 卡券信息
 */
interface CouponInfo {
  couponId: string
  couponAccountCode: string
  couponName: string
  description: string
  effectiveStartTime: number
  effectiveEndTime: number
  applicability: string
  applicabilityType: number
  threshold: number
  worth: number
}

/**
 * @property businessDataName 商品名称，取 goodsData.item.name
 * @property businessDataId 商品id
 * @property couponList
 * @property couponList[0].couponId 领取的优惠券id
 * @property couponList[0].number 领取的数量
 */
interface receiveCouponOption {
  businessDataName: string
  businessDataId: string | number
  couponList: { couponId: number; number: number }[]
}

/**
 * @property balance 剩余数量
 * @property worth 面额（现金券）
 * @property threshold 使用门槛（单位-分）
 * @property applicability 适用范围
 * @property applicabilityType 适用范围类型(-1: 全场通用，0:品牌，1:类目，2商品)
 * @property validityTimeType 有效期类型(1-固定期,2-领券后时间段)
 * @property validityStartTime 有效开始时间（validityTimeType为1时必须）
 * @property validityEndTime 有效结束时间（validityTimeType为1时必须）
 * @property validityUnit 有效时长单位（1-日，2-月）（validityTimeType为2时必须）
 */
interface CouponsDetail {
  balance: number
  worth: number
  threshold: number
  applicability: string
  applicabilityType: number
  validityTimeType: number
  validityStartTime: string
  validityEndTime: string
  validityUnit: number
}

interface CouponPickerInfo {
  availableLength: number
  availableList: CouponInfo[]
  unavailableList: CouponInfo[]
}
