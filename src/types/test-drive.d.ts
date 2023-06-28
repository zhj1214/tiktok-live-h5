/** 预约试驾类型声明 **/
interface Rules {
  rule: RegExp
  msg: string
}
interface FormDataList {
  id: string
  code?: string | number
  label: string
  placeholder: string
  type: string
  maxlength?: number
  disabled: boolean
  rightContentType?: string
  rules?: Rules
  value: string
}
// 车型车系
interface CarInfo {
  id: string
  code: string
  name: string
  image: string
  vehicles?: CarModel[]
}
// 经销商信息
interface DealerData {
  code: string
  details: null | string
  gpsLatitude: null | string | number
  gpsLongitude: null | string | number
  id: string
  name: string
  shortName: string
  saleTel: string
  distance: number
  score: number
  telephone: null | number
  province: null | string
  city: null | string
  region: null | string
  serviceTel: string
  phone: string
  contact: string
}
interface Markers {
  longitude: number
  latitude: number
}
// 预约试驾成功页面数据
interface AppointmentComplete {
  driverName: string
  id: string
  mobile: string
  modelName: string
  orgName: string
  reservationTime: number
}

// 车型、车系列表
interface GroupedBasicAttributes {
  attrKey: string
  attrVal: string
}
interface GroupedCustomAttributes {
  attrKey: string
  attrVal: string
  tag: string
  unit: string
}
interface CarSameInfo {
  id: string
  code: string
  groupedBasicAttributes: GroupedBasicAttributes[]
  groupedCustomAttributes: GroupedCustomAttributes[]
  isCheckout: number
  isPreSale: number
  isShowPrice: number
  name: string
  priceType: null | string | number
}
interface CarSeries extends CarSameInfo {
  hasChildren: boolean
  vehicles: CarModel[]
  attrs: {
    price: number
    detail: string
  }
  price: number
  detail: string
}
interface CarModel extends CarSameInfo {
  attrs: AnyObject
  itemId: string
  seriesCode: string
}
