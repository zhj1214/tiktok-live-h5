interface ItemItemsViewAPI {
  itemId: string | number // 商品id
  vmId: string | number // 渠道
  activityId?: string | number // 活动Id
  activityCode?: string | number // 活动编码
}
interface ItemItemsDetailAPI {
  itemId: string | number // 商品id
}
interface ConsumerPlacesAPI {
  brandId?: string | number // 品牌id
  pageNo?: number
  pageSize?: number
}
interface ItemItemsFrontCategoryAPI {
  frontCategoryId: number | string // 前台类目id
}

/**
 * 商品的某个sku
 */
interface GoodsSku {
  payType: number | string // 1:现金支付, 2:积分支付, 3:定额积分+现金, 4:自由积分
  maxPointPrice: string
}
/**
 * 商品的基础信息
 * @property advertise 广告语
 * @property price 自定义销售价格
 * @property type 商品类型，3位虚拟商品
 */
interface GoodsBaseInfo {
  id: number
  name: string
  advertise: string
  brandId: string | number | null
  price: string | number | null
  type: number
  status: number
  extra: AnyObject
  shipTemplateId: string
}

/**
 * 商品信息
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
 * @property activitySkuVos | activityVos 活动信息
 * @property dealerId 经销商id
 */
interface GoodsInfo {
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
  lowPrice: number
  highPrice: number
  pointPrice: number | null
  minPointPrice: number | null
  maxPointPrice: number | null
  snapshotPrice: number
  referencePrice: number
  extra: {
    limit: number
  } | null
  // sku信息
  skuId: number
  skuAttr: SkuAttrInfo[]
  // 活动信息
  activityId: string | null
  activityVos: ActivityVos[] | null
  dealerId: string | null
  activityInfo: ActivitySkuInfo
  activityVOList: Array<ActivitySkuInFfo> | null
}

interface ActivityVos {
  id: string
  activityType: number
  activityName: string
  activityType: number
  activtyStatus: number
  itemActivityStatus: number
  startTime: number
  endTime: number
  activitySkuVos: ActivitySkuInfo[]
  lowPrice: number | null
}

/**
 * 商品的详细信息
 */
interface GoodsDetail {
  extra: null | AnyObject
  skus: GoodsInfo[]
  item: GoodsBaseInfo
  imageInfos: string[] // 商品图片集合
  groupedSaleAttrs: AnyObject[] // 商品销售属性
  activityVos: ActivityVos[] // 活动详情
}

/**
 * @property excludeFontCategoryId 前台类目id,后端去重需要
 * @property excludeItemIds 商品id
 */
interface RecommendationAtGoodsOption {
  pageNo?: number
  pageSize?: number
  recType?: number
  recItemTypes: string | number[]
  excludeFontCategoryId?: number
  excludeItemIds?: number
  terminal?: number
  orderId?: string
  orderIds?: (string | number)[]
  orderItemIds?: (string | number)[]
}

/**
 * @property activityStatus 活动状态
 * @property activityPrice 活动价格
 */
interface ActivityInfoForFormatPrice {
  activityStatus: number
  activityPrice: number
}

/**
 * @property payType 支付类型
 * @property price 商品现金价格
 * @property pointPrice 商品积分价格
 * @property pointRatio 现金积分兑换比例
 * @property maxPointPrice 自由组合中最大积分额度
 * @property activityInfo 活动信息
 */
interface GoodsInfoForFormatPrice {
  payType: number
  price: number
  pointPrice: number
  pointRatio: number
  maxPointPrice: number
  referencePrice: number
  activityInfo: ActivityInfoForFormatPrice | null
}

/**
 * @property fee 计算后现金价格
 * @property point 计算后积分
 * @property originFee 原始现金价格
 * @property originPoint 原始积分
 * @property referencePriceFee 市场价
 */
interface FormatedPriceInfo {
  fee: number
  point: number
  originFee: number
  originPoint: number
  activityFee?: number
  activityPoint?: number
  referencePriceFee?: number
  referencePricePoint?: number
}

/**
 * 商品搜索参数
 */
interface GoodsSearchParams {
  keyword: string
  pageNo: number
  pageSize: number
  sortKey?: string | null
  sortType?: number | null
}

/**
 * 商品类目信息
 */
interface GoodsCategoryInfo {
  id: number
  code: string
  name: string
}

interface recommendGoods {
  hotWordValue: string
  hotWordCount: number
}
