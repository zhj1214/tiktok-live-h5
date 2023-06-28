/**
 * 生活订单列表类型声明
 * @property id 订单id
 * @property orderItemDtoList 订单商品
 * @property status 订单状态
 * @property totalAmount 总金额
 * @property totalPointNum 总积分
 * @property receiveInfo 收货人信息
 * @property orderDelivery 物流信息
 * @property wholeAssessStatus 评价状态
 * @property expressCode 物流公司code
 * @property expressNum 物流单号
 * @property telphone 物流公司联系电话
 */
interface OrderListInfo {
  orderId: string | number
  orderItemDtoList: ItemDtoListInfo[]
  orderStatus?: number
  totalAmount?: number
  totalPointNum?: number
  receiveInfo?: string
  orderDelivery?: any
  wholeAssessStatus?: number
  expressCode?: string
  expressNum?: string | number
  telphone?: string
  orderType?: number
}
/**
 * 生活商品类型声明
 * @property itemImage 商品图片
 * @property itemName 商品名称
 * @property itemType 商品类型
 * @property attributeMaps 商品规格
 * @property quantity 购买量
 * @property skuPayMode 支付方式 1:现金支付, 2:积分支付, 3:定额积分+现金, 4:自由积分
 * @property activityTypeList 活动类型
 * @property activityPrice 活动价格
 * @property retailPrice 原价
 * @property extraMap 额外字段
 * @property pointAmount 积分价格
 * @property status 订单商品状态
 * @property orderAfterSalesDto 售后相关
 * @property id
 * @property orderId 订单id
 */
interface ItemDtoListInfo {
  itemImage: string
  itemName: string
  itemType: string | number
  attributeMaps: AttributeMaps[]
  quantity: string | number
  skuPayMode?: number
  activityTypeList?: []
  activityPrice?: number
  retailPrice?: number
  extraMap?: LifeExtraMap
  pointAmount?: number
  status: number
  orderAfterSalesDto?: { id: string }
  id?: string
  orderId?: string
}

interface LifeExtraMap {
  pay: { agencyCode: string }
  maxPointNum: number | string
  isAfterSale: boolean
}

/**
 * 商品规格类型声明
 * @property attrVal 商品规格
 */
interface AttributeMaps {
  attrVal: string
}

interface OrderStatusList {
  [key: number]: [number] | [number, number] | []
}

/**
 * 生活列表接口参数定义
 * @property attrVal 商品规格
 */
interface OrderListParams {
  pageNo: number
  pageSize: number
  criteria: { orderAscription: number }
  statuses?: number[]
  wholeAssessStatus?: number
}

/**
 * 整车订单列表类型声明
 * @property orderItemDto 商品信息
 * @property order 订单信息
 */
interface OrderListCarInfo {
  orderItemDto: carItemInfo
  order: carOrderInfo
}

/**
 * 整车订单列表商品信息类型声明
 * @property carVehicleImg 车辆图片
 * @property VehicleTitle 车辆标题
 * @property saleAttrs 车辆规格信息
 * @property carFacadePrice 车辆外观价格
 * @property optionalPackagePrice 选装包价格
 * @property carRimPrice 轮圈价格
 * @property carInteriorPrice 内饰价格
 * @property carVehiclePrice 车型价格
 * @property status 订单商品状态
 * @property orderAfterSalesDto 售后信息
 * @property itemType 商品类型
 * @property id 订单商品id
 * @property orderId 订单id
 */
interface carItemInfo {
  carVehicleImg?: string
  VehicleTitle: string
  saleAttrs: string[]
  carFacadePrice: number
  optionalPackagePrice: number[]
  carRimPrice: number
  carInteriorPrice: number
  carVehiclePrice: number
  status: number
  orderAfterSalesDto?: orderAfterSaleInfo
  itemType: string | number
  id: string
  orderId: string
}

/**
 * 整车订单信息
 * @property id 订单编号
 * @property status 订单状态
 * @property extraMap 订单额外字段
 * @property wholeAssessStatus 评价状态
 * @property orderDealer 服务商
 * @property totalAmount 总价
 * @property createdAt 提交时间
 * @property payTime 支付时间
 */
interface carOrderInfo {
  id: string
  status: number
  extraMap: carExtraMap
  wholeAssessStatus: string | number
  orderDealer?: { dealerName: string }
  totalAmount?: number
  createdAt?: string
  payTime?: string
  orderType: string
  dealer: { dealerName: string; dealerAddress: string }
}

/**
 * 整车订单信息
 * @property isShowPrice 是否展示价格
 * @property isPreSale 是否为预售
 */
interface carExtraMap {
  isShowPrice: boolean
  isPreSale: boolean
  vehiclePayType: string | number
  purchaser: { name: string; mobile: string; certificateType: number; certificateNumber: string }
  carOwner: { name: string; certificateType: number; certificateNumber: string }
}

/**
 * 整车订单售后信息
 * @property id 售后id
 */
interface orderAfterSaleInfo {
  id: string
}
