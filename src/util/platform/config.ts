const configs: PlatformConfigs = {
  wechat: {
    plticon: /wechat|micromessenger/i,
    jsSDKUrl: '//unpkg.com/jweixin-module@1.6.0/lib/index.js',
    jsSDKName: 'jWeixin',
    jsSDKListerName: 'WeixinJSBridgeReady'
  },
  weibo: {
    plticon: /WeiBo|weibo/i,
    jsSDKUrl: '//tjs.sjs.sinajs.cn/open/thirdpart/js/jsapi/mobile.js',
    jsSDKName: 'WeiboJS',
    jsSDKListerName: 'WeiboJSBridgeReady'
  },
  alipay: {
    jsSDKUrl: '',
    jsSDKName: 'AMap',
    jsSDKListerName: ''
  }
}
export default configs
