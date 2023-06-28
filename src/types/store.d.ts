interface FeConfigInfo {
  // domain: AnyObject
  [key: string]: any
}

/**
 * 根state
 */
interface RootState {
  [x: string]: any
  // 登陆状态
  isLogin: boolean
  // app基础信息
  appConfig: {
    // 状态栏高度
    statusBarHeight?: number
  }
  sharePosterInfo: {
    shareUrl?: string // 分享出去的链接，也是生成二维码的地址
    posterList?: Array<string> // 轮播图列表
    showAvatarFlag?: boolean // 是否展示头像
    showNameFlag?: boolean // 是否展示名字
    welcomeWords?: string // 欢迎语
  }
}

interface ConfigState {
  // 前端公共配置信息
  feConfig: FeConfigInfo
}

/**
 * 用户state
 */
interface UserState {
  accountId: string
  displayName: string
  avatarUrl: string
  memberSystemId: string
  pointSystemId: string
  mobile: string
  point: number
}

/**
 * 地址state
 */

interface ProviderLocationInfo {
  province: string
  city: string
  cityCode: string
}
interface AddressState {
  currentAddress: UserAddressInfo
  latitude: number
  longitude: number
  locationLastModified: number
  providerLocation: ProviderLocationInfo
}

/**
 * 商品结算state
 */
interface GoodsSettleState {
  userUsablePoint: number
  businessId: string
  selectedAddress: UserAddressInfo | null
  orderDetail: PreviewOrderInfo
  couponData: CouponPickerInfo
}

/**
 * 购车state
 */
interface LocationItemInfo {
  id: string
  text: string
  code: string
  children: boolean
}
interface CarState {
  location: {
    province: LocationItemInfo
    city: LocationItemInfo
    district: LocationItemInfo
  }
  latitude: number
  longitude: number
  vehicle: AnyObject
  modelActive: number
  configActive: number
  tempData: CarSeries
  provider: DealerInfo
}
/**
 * 所有state类型集成
 */
interface AllState extends RootState {
  user: UserState
  goodsSettle: GoodsSettleState
  address: AddressState
  config: ConfigState
  community: Communi
  car: CarState
}

/**
 * 问答state
 */
interface QuestionState {
  itemId: number
  title: string
  imgUrl: string
}
