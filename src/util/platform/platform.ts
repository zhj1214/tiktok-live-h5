// @ts-nocheck
export default class Platform {
  logprint: boolean
  matchlist: string[]
  configs: PlatformConfigs
  constructor(configs: PlatformConfigs, { logprint }: PlatformOption) {
    this.configs = configs
    this.logprint = !!logprint
    this.matchlist = [] // 依次会推入三个值  0: 平台类型 （pc / mobile）  1: 终端系统类型（参照下面Agents） 2: 软件环境 （参照platconfig里的分类）
    this.startRecongnition()
    this.ready()
  }

  /**
   * 是否为某个平台/终端系统类型/软件环境
   */
  isMatch(val: string) {
    let res = false
    this.matchlist.forEach((ele) => {
      ele.toLocaleLowerCase() === val.toLocaleLowerCase() && (res = true)
    })
    return res
  }

  /**
   * 开始识别
   */
  startRecongnition() {
    let userAgentInfo = window.navigator.userAgent
    let agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    let isPc = true
    for (let agent of agents) {
      // 逐一判断
      if (userAgentInfo.indexOf(agent) > -1) {
        // 手机端的某一种
        this.matchlist.push('mobile', agent)
        isPc = false
      }
    }
    isPc && this.matchlist.push('pc')

    if (this.configs) {
      this.generateAppPlatform()
    }
  }

  /**
   * 判断软件环境
   */
  generateAppPlatform() {
    Object.keys(this.configs).forEach((key, i) => {
      // 配置处理
      let config = this.configs[key]
      let icon = config.plticon || key
      if (!(icon instanceof RegExp)) {
        icon = new RegExp(icon)
      }
      icon.test(window.navigator.userAgent) && this.matchlist.push(key)
    })
    console.log(`当前H5运行环境为：${this.matchlist.join(' ')}`)
  }

  /**
   * 加载js bridge
   */
  ready(type?: string) {
    let key = type || this.matchlist[this.matchlist.length - 1]
    let config = this.configs[key] || null
    return new Promise((resolve, reject) => {
      if (!config || !config.jsSDKUrl) {
        return
      }
      const PLATFORM_INIT_TIMEOUT = 10000
      const jsSDKListerName = config.jsSDKListerName
      if (config.jsSDKName && window[config.jsSDKName]) {
        this.logprint && console.log(config.jsSDKName + ' 已经存在!')
        resolve(key)
      } else {
        this.logprint && console.log(config.jsSDKName + ' sdk 开始加载...')
        this.loadScript(config.jsSDKUrl).then(() => {
          this.logprint && console.log(config.jsSDKName + ' sdk 加载成功！')
          this.docReady(() => {
            function onDispatchSuccess() {
              this.logprint && console.log(config.jsSDKName + ' readyEvent 触发成功!')
              clearTimer()
              resolve(key)
            }
            if (jsSDKListerName) {
              this.logprint && console.log(jsSDKListerName + ' has added')
              document.addEventListener(jsSDKListerName, onDispatchSuccess, false)
            } else if (config.jsSDKName && window[config.jsSDKName]) {
              this.logprint && console.log(config.jsSDKName + ' Init Success!')
              clearTimer()
              setTimeout(() => {
                resolve(key)
              }, 1000)
            }
            function clearTimer() {
              window.sdkTimer && window.clearTimeout(window.sdkTimer)
              window.sdkInterval && window.clearInterval(window.sdkInterval)
            }
            window.sdkInterval = setInterval(() => {
              if (config.jsSDKName && window[config.jsSDKName]) {
                this.logprint && console.log(config.jsSDKName + ' Init in the sdkInterval!')
                clearTimer()
                jsSDKListerName && document.removeEventListener(jsSDKListerName, onDispatchSuccess)
                this.logprint && jsSDKListerName && console.log(jsSDKListerName + ' has removed')
                resolve(key)
              }
            }, 200)
            window.sdkTimer = setTimeout(() => {
              if (config.jsSDKName && window[config.jsSDKName]) {
                this.logprint && console.log(config.jsSDKName + ' Init in the setTimeout!')
                clearTimer()
                resolve(key)
              } else {
                this.logprint && console.log(config.jsSDKName + ' Init Timeout!')
                reject(new Error('加载超时！'))
              }
            }, PLATFORM_INIT_TIMEOUT)
          })
        })
      }
      return false
    })
  }

  /**
   * 加载script
   * @param {String} url -- 链接
   */
  loadScript(url: string) {
    return new Promise((resolve, reject) => {
      let _head = document.getElementsByTagName('head')[0]
      let _script = document.createElement('script')
      _script.setAttribute('type', 'text/javascript')
      _script.setAttribute('src', url)
      _head.appendChild(_script)
      _script.onload = function () {
        resolve(1)
      }
      _script.onerror = function (err) {
        reject(err)
      }
    })
  }

  /**
   * document的ready事件监听
   * @param {Function} [callback] - 回调函数
   * @return {Promise} - 返回promise，completed后自动解绑
   * */
  docReady(callback: Fn) {
    /* istanbul ignore else */
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      callback()
    } else {
      document.addEventListener('DOMContentLoaded', completed, false)
      window.addEventListener('load', completed, false)
    }

    /* istanbul ignore next */
    function completed() {
      document.removeEventListener('DOMContentLoaded', completed, false)
      window.removeEventListener('load', completed, false)
      callback()
    }
  }
}
