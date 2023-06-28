/** 购物车类型声明 **/

/**
 * sku属性信息
 * @property attrKey sku属性中文描述
 * @property attrVal sku属性值
 */
interface SkuAttrInfo {
  attrKey: string
  attrVal: string
}

/**
 * 活动商品sku信息
 * @property activityType 活动类型
 * @property activityTypeName 活动类型名称
 * @property itemActivityStatus 活动状态
 * @property activityPrice 活动价格
 * @property activtyStatus 活动状态
 * @property activtyStatusName 活动状态名称
 * @property startTime 活动开始时间
 * @property endTime 活动结束时间
 * @property skuId 商品skuid
 * @property skuQuantity 参加活动sku数量
 */
interface ActivitySkuInfo {
  id: string
  activityType: number
  activityTypeName?: string
  itemActivityStatus: number
  activtyStatus: number
  activtyStatusName?: string
  activityPrice: number
  startTime: number | null
  startTimeFormat?: string
  endTime: number | null
  endTimeFormat?: string
  skuId: number
  skuQuantity: number
  skuBuyLimit: number
  seconds?: number
}

/**
 * 购物车商品信息
 * @property status 商品状态 -2:失效
 * @property thumbnail 商品缩略图
 * @property itemId 商品id
 * @property itemName 商品名称
 * @property itemType 商品类型
 * @property quantity 购买的商品数量
 * @property limitQuantity 商品限制数量
 * @property stockQuantity 商品库存数量
 * @property payType 支付类型 1:现金支付, 2:积分支付, 3:定额积分+现金, 4:自由积分
 * @property price 商品现金价格
 * @property pointPrice 商品积分价格
 * @property minPointPrice 最小积分支付价格
 * @property maxPointPrice 最大积分支付价格
 * @property skuAttr sku属性信息
 * @property activitySkuVos 活动信息
 * @property dealerId 经销商id
 */
interface CartGoodsInfo {
  // 商品信息
  id: number
  status: number
  thumbnail: string
  itemId: number
  itemName: string
  itemType: number
  quantity: number
  limitQuantity: number
  stockQuantity: number
  payType: PayType
  price: number
  pointPrice: number | null
  minPointPrice: number | null
  maxPointPrice: number | null
  snapshotPrice: number
  // sku信息
  skuId: number
  skuAttr: SkuAttrInfo[]
  // 活动信息
  activityId: string | null
  activitySkuVos?: ActivitySkuInfo[]
  dealerId: string | null
  activityInfo?: ActivitySkuInfo
}
