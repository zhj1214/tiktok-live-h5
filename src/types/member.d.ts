/**
 * 权益包列表
 * @property coverImg 权益包名称
 * @property rightsPackageName 权益包名称
 * @property rightsPackageType 权益包类型
 * @property purchaseStatus 购买状态
 * @property orderAmount 金额
 * @property status 用户权益包状态
 * @property renewalValidFrom 续费周期开始时间
 * @property renewalValidUntil 续费周期截止时间
 * @property id 用户权益包id
 */
interface rightsPackageInfo {
  coverImg: string
  rightsPackageName: string
  rightsPackageType: number
  purchaseStatus: number
  orderAmount: number
  status: number
  renewalValidFrom: number
  renewalValidUntil: number
  id: string
  description: string
  skuDTO: { price: number; itemId: string; image: string; name: string; attributeValueList: array; travelPrice: array }
  validType: number
  validTime: number
  validUnit: number
  validFromTime: number
  validFromUnit: number
  isRenewal: boolean
  isPurchase: boolean
  vin: string
}

/**
 * 权益列表
 * @property rightsId 权益Id
 * @property rightsName 权益名称
 * @property rightsIcon 权益icon
 */
interface rightsInfo {
  rightsName: string
  rightsId: string
  rightsIcon: string
}

interface purchaseRecordInfo {
  rightsPackageName: string
  purchaseTime: string
  orderAmount: number
  orderId: string
}
