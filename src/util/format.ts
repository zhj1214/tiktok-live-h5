import dayjs from '$dayjs'

/**
 * 格式化时间
 * @param time
 * @param formatter 需要的时间格式
 * @returns YYYY.MM.DD
 */
export const formatDate = (time: string | number, formatter?: string) => {
  return time ? dayjs(time).format(formatter || 'YYYY.MM.DD') : ''
}

/**
 * 格式化时间
 * @param dateTime
 * @returns
 */
export function formatTime(dateTime: string) {
  const timestamp = new Date(dateTime.replace(/-/g, '/')).getTime() // 解决 IOS 转时间戳不兼容问题
  let now = new Date().getTime()
  let timer = (now - timestamp) / 1000
  let tip = ''

  if (timer <= 0) {
    tip = '刚刚'
  } else if (Math.floor(timer / 60) <= 0) {
    tip = '刚刚'
  } else if (Math.floor(timer) < 3600) {
    tip = Math.floor(timer / 60) + '分钟前'
  } else if (timer >= 3600 && timer < 86400) {
    tip = Math.floor(timer / 3600) + '小时前'
  } else if (timer / 86400 < 8) {
    tip = Math.floor(timer / 86400) + '天前'
  } else {
    tip = dateTime
  }
  return tip
}
/**
 * @description 标准货币格式化方法
 * @param {String,Number} s 金额
 * @param {Number} n 保留位数 默认2
 * @param {Number} u 金额单位 默认2
 * @returns
 */
export function formatMoney(s: string | number, n?: number, u?: number) {
  let str = (Number(s) / Math.pow(10, !u && u !== 0 ? 2 : u)).toFixed(n || 2).toString()
  let indexD = str.indexOf('.')
  // 取到整数部分
  let intSum = (indexD > -1 ? str.substring(0, indexD) : str).replace(/\B(?=(?:\d{3})+$)/g, ',')
  // 取到小数部分搜索
  let dot = indexD > -1 ? str.substring(str.length, indexD) : ''
  return intSum + dot
}

/**
 *统一的商品价格格式化
 * @param goods 商品信息
 * @returns
 */
export const formatPrice = (goods: GoodsInfoForFormatPrice): FormatedPriceInfo => {
  let fee = 0
  let point = 0
  let originFee = 0
  let originPoint = 0
  let referencePriceFee = 0 // 市场价
  let referencePricePoint = 0 // 市场价
  const { payType, price, pointPrice, pointRatio, maxPointPrice, referencePrice } = goods
  const { activityStatus, activityPrice } = goods.activityInfo || {}
  originFee = Number(price) / 100
  let activityFee = Number(activityPrice) / 100
  let activityPoint = 0
  // 纯现金
  if (payType === 1) {
    fee = [1, 4].includes(activityStatus) ? Number(activityPrice) / 100 : price / 100
  }
  // 纯积分  old   1积分=>1分钱    new 1积分=>10分钱
  if (payType === 2) {
    point = price * pointRatio
  }
  // 定额积分+现金
  if (payType === 3) {
    fee = [1, 4].includes(activityStatus) ? Number(activityPrice) / 100 : price / 100
    point = price * pointRatio
  }
  // 零现金零积分支付
  if (payType === 4) {
    fee = [1, 4].includes(activityStatus) ? Number(activityPrice) / 100 : price / 100
    point = price * pointRatio
    if (maxPointPrice > 0) {
      point = [1, 4].includes(activityStatus) ? Number(activityPrice) / pointRatio : price * pointRatio
    }
    originPoint = maxPointPrice * pointRatio
    activityPoint = Number(activityPrice) / pointRatio
  }
  // 划线价
  referencePriceFee = [1, 4].includes(activityStatus) ? Number(referencePrice || price) / 100 : Number(referencePrice) / 100
  referencePricePoint = referencePrice * pointRatio
  return {
    fee,
    point,
    originFee,
    originPoint,
    activityFee,
    activityPoint,
    referencePriceFee,
    referencePricePoint
  }
}

/**
 * 格式化时间
 * @param dateTime
 * @returns
 */
export function formatCountDownTime(dateTime: string) {
  const timestamp = new Date(dateTime.replace(/-/g, '/')).getTime() // 解决 IOS 转时间戳不兼容问题
  let now = new Date().getTime()
  let timer = (timestamp - now) / 1000
  let tip = ''

  if (Math.floor(timer) < 0) {
    tip = '已结束'
  } else if (timer > 86400) {
    tip = '还有' + (timer % 86400 == 0 ? timer / 86400 : Math.floor(timer / 86400) + 1) + '天结束'
  } else if (timer >= 3600 && timer < 86400) {
    tip = '还有' + (timer % 3600 == 0 ? timer / 3600 : Math.floor(timer / 3600) + 1) + '小时结束'
  } else if (Math.floor(timer) < 3600) {
    tip = '还有' + (timer % 60 == 0 ? timer / 60 : Math.floor(timer / 60) + 1) + '分钟结束'
  }
  return tip
}
