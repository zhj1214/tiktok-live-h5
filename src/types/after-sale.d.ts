/**
 * 生活售后列表类型声明
 * @property afterSaleId 售后id
 * @property showExtraMap 整车商品售后额外字段
 * @property status 售后状态
 * @property remainTime 商家审核时间
 * @property totalAmount 总金额
 * @property totalPointNum 总积分
 * @property attributeMaps 生活商品规格
 * @property itemType 商品类型
 */
interface AfterSaleInfo {
  afterSaleId: number
  showExtraMap?: AnyObject
  status: number
  remainTime: number
  totalAmount: number
  totalPointNum?: number
  attributeMaps?: AnyObject
  itemType: number
  orderItemDto?: carItemInfo
}

interface AfterSaleTypeInfo {
  code: number
  desc: string
}

interface UploadImgInfo {
  haveImg: boolean
  imgPath: string
}

/**
 * 申请售后接口参数类型声明
 * afterSaleType 退款单类型(前端只传0：退款 1：退货退款)
 * causeType 售后原因
 * desc 问题描述
 * orderItemIdList 订单商品ids[]
 * fileUrlList 图片地址
 * orderId 订单id
 */
interface RefundInfo {
  afterSaleType: number | null
  causeType: number | null
  desc: string
  orderItemIdList: string[]
  fileUrlList: string[] | any[]
  orderId: string
  amounts: [
    {
      orderItemId: string
      amount: number
      pointAmount: number
    }
  ]
}

/**
 * 售后订单详情类型声明
 */
interface AfterSaleDetailInfo {
  totalAmount: string | number
  totalPointNum: string | number
  updatedAt: string
  auditOutTime: number
  status: number
  type: number
  createdAt: string
  applyDesc: string
  reason: string
  auditDesc: string
  sellerAddress: string
}

/**
 * 售后订单商品详情类型声明
 */
interface AfterSaleDetailItemInfo {
  itemType: string
  itemImage: string
  itemName: string
  attributeMaps: []
  skuPayMode: number
  retailPrice: number
  pointAmount: number
  quantity: number
  status: number
  id: string
  orderId: string
  orderItemDto: carItemInfo
}
