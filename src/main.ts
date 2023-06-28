import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from './store'
import providers from '@util/providers'
// #ifdef H5
import * as local from './util/local'
// #endif
// 定义eventbus
import EventBus from './util/event-bus'
const $bus = new EventBus()

// #ifdef H5
// jsbridge引入
import jsbridge from './util/flutterBridge'

window.$flutter = jsbridge
const ENV = import.meta.env.VITE_APP_ENV
if (ENV === 'sit') new window.VConsole()

// #endif

// 定义promise原型链
// #ifdef MP-WEIXIN
Promise.prototype.finally = function (callback) {
  const P = this.constructor
  return this.then(
    (value) => P.resolve(callback()).then(() => value),
    (reason) =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}
// #endif

const app = createApp(App)
app.use(providers)
app.use(store, key)
// 挂载eventbus
app.provide('$bus', $bus)
app.config.globalProperties.$bus = $bus
app.config.globalProperties.$local = local
app.mount('#app')
