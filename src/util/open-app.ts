import store from '../store'

export const openApp = async (params?: { route: string; query: any }) => {
  let flag = false
  // 获取H5域名
  const data = await store.dispatch('config/getFeConfig')
  let appDownLoadUrl = data.JETOUR.H5 + (params && transformParams(params))
  console.log('ios跳转域名', appDownLoadUrl)
  if (!isInWechat) {
    if (isIos) {
      // ios9 以下版本使用scheme协议跳转
      if (gt_ios9()) {
        window.location.href = 'jetour://com.jetour.traveller' + (params && transformParams(params))
      } else {
        // ios9 以上版本使用通用链接Universal Links跳转
        window.location.href = appDownLoadUrl
      }
    } else {
      // 安卓使用scheme协议跳转
      window.location.href = 'jetour://com.jetour.traveller' + (params && transformParams(params))
    }
    checkOpen(() => {
      if (isIos) {
        window.location.href = appDownLoadUrl
      } else {
        window.location.href = appDownLoadUrl
      }
    }, 2000)
  } else {
    flag = true
  }
  return flag
}

// 对传入的对象参数转换成url
function transformParams(params: any) {
  const { route, query } = params
  const paramStr = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&')
  const url = `/${route ? route : ''}` + `?${paramStr ? paramStr : ''}`
  return url
}

function gt_ios9() {
  // 判断是否 iPhone 或者 iPod
  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) {
    // 判断系统版本号是否大于 9
    let version = navigator.userAgent.toLowerCase().match(/cpu iphone os (.*?) like mac os/)
    return parseInt(version[1].replace(/_/g, '.')) <= 9
  } else {
    return false
  }
}

/**
 * 获取判断页面 显示|隐藏 状态改变的属性，webkitvisibilitychange/mozvisibilitychange/msvisibilitychange/ovisibilitychange/visibilitychange文档的可见性改变时触发
 */
function getVisibilityChangeProperty() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) {
    return false
  }

  return `${prefix}visibilitychange`
}

function checkOpen(failCallback, timeout = 2000) {
  const visibilityChangeProperty = getVisibilityChangeProperty()
  console.log(visibilityChangeProperty, 'visibilityChangeProperty')
  const timer = setTimeout(() => {
    const hidden = isPageHidden() //判断页面是否隐藏（进入后台）
    if (!hidden) {
      //没有进入后端，说明唤起失败，唤起失败，就执行失败的函数
      failCallback()
    }
  }, timeout)

  if (visibilityChangeProperty) {
    document.addEventListener(visibilityChangeProperty, () => {
      clearTimeout(timer)
    })

    return
  }

  window.addEventListener('pagehide', () => {
    //页面关闭时 清除定时器
    clearTimeout(timer)
  })
}

/**
 * 获取页面隐藏属性的前缀
 * 如果页面支持 hidden 属性，返回 '' 就行
 * 如果不支持，各个浏览器对 hidden 属性，有自己的实现，不同浏览器不同前缀，遍历看支持哪个
 */
function getPagePropertyPrefix() {
  const prefixes = ['webkit', 'moz', 'ms', 'o']
  let correctPrefix
  if ('hidden' in document) {
    return ''
  }
  prefixes.forEach((prefix) => {
    if (`${prefix}Hidden` in document) {
      correctPrefix = prefix
    }
  })

  return correctPrefix || false //返回结果是'webkit', 'moz', 'ms', 'o' ,false
}

/**
 * 判断页面是否隐藏（进入后台）
 */
function isPageHidden() {
  const prefix = getPagePropertyPrefix()
  if (prefix === false) {
    return false
  }

  const hiddenProperty = prefix ? `${prefix}Hidden` : 'hidden'
  return document[hiddenProperty] //返回结果是document.hidden，document.mozHidden，document.msHidden， document.webkitHidden，document.oHidden,是判断页面是否隐藏（进入后台）
}
const u = navigator.userAgent
// ios设备
const isIos = !!u.match(/(i[^;]+;( U;)? CPU.+Mac OS X)/)
// android设备
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
// 微信浏览器
const isInWechat = u.toLowerCase().indexOf('micromessenger') > -1

// 微信浏览器中隐藏头部
export const hiddenHead = (params?: { route: string; query: any }) => {
  if (isInWechat) {
    let style = document.createElement('style')
    style.type = 'text/css'
    style.innerHTML = 'uni-page-head,.uni-page-head{display:none;}'
    // @ts-ignore
    document.getElementsByTagName('head').item(0).appendChild(style)
  } else {
    openApp(params)
  }
  return 34
}
