// @ts-nocheck
let goBackFn = {
    addEvent: (type, fun) => {
      if (window.history && window.history.pushState) {
        // history.pushState(null, null, document.URL)
        window.addEventListener('popstate', type == '2' ? fun : WeixinCloseWindow, false)
      }
    },
    removeEvent: (type, fun) => {
      window.removeEventListener('popstate', type == '2' ? fun : WeixinCloseWindow, false)
    }
  },
  //退出微信公众号
  WeixinCloseWindow = () => {
    //这个可以关闭安卓系统的手机
    // document.addEventListener(
    //   'WeixinJSBridgeReady',
    //   () => {
    //     WeixinJSBridge.call('closeWindow')
    //   },
    //   false
    // )
    // //这个可以关闭ios系统的手机
    // WeixinJSBridge.call('closeWindow')
  }

export { goBackFn, WeixinCloseWindow }
