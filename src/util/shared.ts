/**
 * 环境变量
 */
export const ENV = import.meta.env.VITE_APP_ENV

//手机号正则
export const MOBILE_REG = /^[1]([3-9])[\d]{9}$/

/**
 * 将所有可枚举属性的值从一个源对象分配到目标对象,返回目标对象。
 * @param target 目标对象
 * @param origin 源对象
 * @param map 属性映射关系 { 目标对象属性: 源对象属性 }
 * @returns void
 */
export const pureAssign: PureAssignFunc = (target: AnyObject, origin: AnyObject, map?: AnyObject): AnyObject => {
  for (let key in target) {
    const val = origin[map && map[key] ? map[key] : key]
    if (val !== undefined && val !== null) {
      target[key] = val
    }
  }
  return target
}

/**
 * 验证手机号格式
 * @param mobile 手机号
 * @returns boolean
 */
export const isCorrectMobile = (mobile: string): boolean => {
  return MOBILE_REG.test(mobile)
}

/**
 * 请求平台类型
 */
const TERMINAL_TYPE = {
  pc: 1,
  h5: 2,
  app: 4,
  'mp-weixin': 5
}
const platform = process.env.VUE_APP_PLATFORM as PlatformInfo

export const terminal = TERMINAL_TYPE[platform]

// #ifdef H5
const u = navigator.userAgent
// ios设备
export const isIos = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/)
// android设备
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
// 微信浏览器
export const isInWechat = u.toLowerCase().indexOf('micromessenger') > -1
// #endif

/**
 * 查找两个字符串的最长连续重复字符
 * @param str1
 * @param str2
 * @returns
 */
export function matchLongestRepetString(str1: string, str2: string) {
  let targetString = ''
  let shorter = ''
  let longer = ''
  if (str1.length > str2.length) {
    shorter = str2
    longer = str1
  } else {
    shorter = str1
    longer = str2
  }
  for (var a = shorter.length; a > 0; a--) {
    for (var b = 0; a + b <= shorter.length; b++) {
      const str = shorter.substring(b, a + b)
      if (longer.indexOf(str) >= 0) {
        targetString = str
        return targetString
      }
    }
  }
  return ''
}
// 默认租户信息
export const TENANTS = {
  tenantId: 'JETOUR',
  tenantName: '奇瑞捷途'
}

/**
 * 使用canvas
 * @param {String} text 文本
 * @param {String} font 字体 如 'normal 12px Arial'
 */
export function getTextWidth(text: String, font: String = 'normal 16px Arial'): Number {
  const canvas = (getTextWidth as AnyObject).canvas || ((getTextWidth as AnyObject).canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  context.font = font
  const metrics = context.measureText(text)
  return metrics.width
}

/**
 * @description: 滚动页面到指定容器位置
 * @param {string} rootView 跟容器选择器 #select
 * @param {string} toView 目标容器 #select
 * @param {number} duration 过渡时间
 * @param {number} offset 希望的偏移量
 * @example:
 * @author: zhj1214
 */
export const jumpToScrollOffset = function (rootView: string, toView: string, duration: number = 0.4, offset: number = 0) {
  if (rootView && toView) {
    uni
      .createSelectorQuery()
      .select(rootView)
      .boundingClientRect((data: AnyObject) => {
        //目标节点
        uni
          .createSelectorQuery()
          .select(`#${toView}`)
          .boundingClientRect((res: AnyObject) => {
            // console.log(`#${toView}`, '#${toView}', res)
            //最外层盒子节点
            uni.pageScrollTo({
              duration: duration, //过渡时间必须为0，uniapp bug，否则运行到手机会报错
              scrollTop: res.top - data.top + offset //滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离；100 属于调节值
            })
          })
          .exec()
      })
      .exec()
  }
}

/**
 * @description 防抖函数
 * @param {Function} func 需要防抖的函数
 * @param {Number} wait 防抖时间
 * @param {Boolean} immediate 是否即时响应
 * @return {*} 返回防抖后的函数
 * @author: zhj1214
 */

export function getDebounce(func: any, wait: number, immediate: boolean) {
  let timeout: any, args: any, context: any, timestamp: number, result: any
  if (null == wait) {
    wait = 100
  }

  function later() {
    const last = Date.now() - timestamp

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        context = args = null
      }
    }
  }

  const debounced = function () {
    context = this
    args = arguments
    timestamp = Date.now()
    const callNow = immediate && !timeout
    if (!timeout) {
      timeout = setTimeout(later, wait)
    }
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }

  debounced.clear = function () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  debounced.flush = function () {
    if (timeout) {
      result = func.apply(context, args)
      context = args = null

      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced
}
