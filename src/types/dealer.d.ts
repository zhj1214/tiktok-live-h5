/**
 * 经销商信息
 * @property id 经销商id
 * @property name 经销商名称
 * @property address 经销商地址
 * @property image 经销商图片
 * @property code 经销商编码
 * @property telephone 经销商联系电话
 */
interface DealerInfo {
  id: string
  name: string
  address: string
  image: string
  code: string
  telephone: string
}

type DealerListInfo = DealerInfo[]

/**
 * 门店信息
 */
interface StoreInfo {
  id: string
  latitude: string
  longitude: string
  mobile: string
  storeAddress: string
  storeName: string
}
