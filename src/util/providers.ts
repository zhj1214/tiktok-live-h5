import { App } from 'vue'
import { generatorDynamicPic } from '@util/oss'

export default {
  install(app: App<Element>) {
    // 动态获取oss图片地址
    app.provide('$gdp', generatorDynamicPic)
  }
}
