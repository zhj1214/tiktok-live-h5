/**
 * 生活订单详情类型声明
 * @property id 订单id
 * @property orderItemDtoList 订单商品
 * @property status 订单状态
 * @property totalAmount 总金额
 * @property totalPointNum 总积分
 * @property receiveInfo 收货人信息
 * @property totalCouponAmount 卡券优惠金额
 * @property couponList 使用卡券
 * @property userRemark 备注
 * @property createdAt 提交时间
 * @property extraMap 额外字段
 * @property payType 支付方式
 * @property payTime 支付时间
 * @property orderInvoice 发票信息
 * @property shipAmount 运费
 * @property orderItemList 子订单idList
 * @property wholeAssessStatus 评价状态
 * @property orderDelivery 物流信息
 * @property purchaserMobile 购买人手机号
 * @property orderType 订单类型
 */
interface OrderDetailInfo {
  orderId: string | number
  orderItemDtoList: ItemDtoListInfo[]
  orderStatus: number
  totalAmount: number
  totalPointNum: number
  totalPointAmount: number
  receiveInfo: ReceiveInfo
  totalCouponAmount: number
  couponList: CouponListInfo[]
  userRemark: string
  createdAt: number
  extraMap: AnyObject
  payType: number
  payTime: number
  orderInvoice: OrderInvoiceInfo
  shipAmount: number
  orderItemList: []
  payLeftTime: number
  autoReceiveStatus: number
  receiveLeftTime: number
  afterSalesApplyTimeOut: boolean
  wholeAssessStatus: null
  orderDelivery: OrderDeliveryInfo[]
  purchaserMobile: string
  orderType: number
}
/**
 * 卡券列表类型声明
 * @property id 卡券id
 * @property name 卡券名称
 * @property code 卡券code
 * @property source 卡券来源
 */
interface CouponListInfo {
  id: string | number
  name: string
  code: string | number
  source: string
}
/**
 * 订单发票类型声明
 * @property invoiceTitle 发票名称
 * @property invoiceContent 发票内容
 */
interface OrderInvoiceInfo {
  invoiceTitle: string
  invoiceContent: string
}
/**
 * 收货地址类型声明
 * @property receiver 收件人名称
 * @property mobile 收件人联系方式
 * @property receiveAddress 收件人地址
 */
interface ReceiveInfo {
  receiver: string
  mobile: string
  receiveAddress: string
}

interface OrderDeliveryInfo {
  acceptStation?: string
  acceptTime?: string
  expressNumber?: string
  expressCode?: string
  telphone?: string
}

/**
 * 整车订单详情商品信息类型声明
 * @property status 订单商品状态
 * @property carFacade 车辆外观
 * @property carRim 轮圈
 * @property carInterior 内饰
 * @property carVehicle 车型
 * @property optionalPackage 选装包
 * @property orderAfterSalesDto 售后信息
 * @property orderId 订单id
 * @property itemType 商品类型
 * @property id 订单商品id
 * @property skuId 规格Id
 */
interface CarOrderDetailInfo {
  status: number
  carFacade: { price: number }
  carRim: { price: number }
  carInterior: { price: number }
  carVehicle: { price: number }
  optionalPackage: [{ price: number; id: string }]
  orderAfterSalesDto: orderAfterSaleInfo
  orderId: string
  itemType: string
  id: string
  skuId: string
}
