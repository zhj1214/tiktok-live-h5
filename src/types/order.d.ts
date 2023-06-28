interface CriteriaInfo {
  distributer?: string
  customerInfo?: AnyObject
}

/**
 * 提交订单参数
 */
interface CreateOrderRequestInfo {
  vmId: number
  businessId: string
  orderChannel: number
  remark: string
  itemToOrderList: AnyObject[]
  pointNum: number
  couponAccountCode: string
  criteria: CriteriaInfo
  orderAddressId?: string
}

/**
 * 创建支付订单所需参数
 * @property orderId 订单id（父订单）
 * @property agencyCode 支付机构编码 01: 支付宝; 02: 微信; 03: 工商银行; 04: 微软; 05: 卡券; 06: 连连支付; 07: 易宝支付; 08: 积分中心; 09: 平安银行; 10: 银联商务 默认：02， 现金支付时必传
 * @property channelCode 支付渠道编码 04-微信app 05-微信公众号 06-微信扫码 07-微信h5 08-微信小程序  12-支付宝 jsapi 13-支付宝扫码 14-支付宝app 15-支付宝h5 16-支付宝web 17-支付宝小程序，现金支付时必传
 * @property remark 支付备注
 * @property returnUrl 付款完成后跳转地址 H5支付
 * @property code 微信登录code
 */
interface CreatePayOrderParamsInfo {
  orderId: string
  agencyCode: string
  channelCode: string
  vmId: number
  code?: string
  returnUrl?: string
  remark?: string
}

interface OrderGoodsInfo {
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
  skuImage: string
  skuSaleAttributes: []
  // 活动信息
  activityId: string | null
  activitySkuVos: ActivitySkuInfo[] | null
  dealerId: string | null
}

interface PreviewOrderInfo {
  shipAmount: number
  necessaryPointNum: number
  subtotalAmount: number
  totalAmount: number
  totalCouponAmount: number
  availablePointNum: number
  itemList: OrderGoodsInfo[]
}

/**
 * 购车下单接口入参
 */
interface CarPayOrderParams {
  businessId: string
  vmId: number
  vehiclePayType: number | null
  orderChannel: number
  cartWishId: number | null
  itemToOrderList: {
    skuId: number
    optionalPackIds: string[]
    itemId: number
    quantity: number
  }[]
  purchaser: {
    name: string
    mobile: string
    dealerId: string
    certificateType?: number
    certificateNumber?: string
  }
  carOwner?: {
    name: string
    certificateType: number | null
    certificateNumber: string
  }
}
