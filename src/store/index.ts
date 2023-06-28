import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'

import user from './modules/user'
import config from './modules/config'

export const key: InjectionKey<Store<RootState>> = Symbol('store')

export function useStore<T = AllState>() {
  return baseUseStore<T>(key)
}

// 登录状态获取
let isLogin = false

try {
  isLogin = !!uni.getStorageSync('isLogin')
} catch (error) {
  console.log('登录状态获取失败')
}

const store = createStore<RootState>({
  state: {
    isLogin,
    isLoading: false, // 全局按钮loading状态
    appConfig: {}, // app的基础信息
    sharePosterInfo: {} // 海报分享页的信息
  },
  mutations: {
    setLoginStatus(state, loginStatus: boolean) {
      state.isLogin = loginStatus
      try {
        uni.setStorageSync('isLogin', loginStatus)
      } catch (error) {
        console.log('登录状态保存失败')
      }
    },
    setLoadingVal(state, val) {
      // 设置参数
      state.isLoading = val
    },
    setAppConfig(state, val) {
      state.appConfig = val
    },
    setSharePosterInfo(state, val) {
      state.sharePosterInfo = val
    }
  },
  actions: {
    async getAppConfig({ commit }, payload) {
      const appConfig: {
        statusBarHeight?: number
      } = {}
      // 获取状态栏高度
      appConfig.statusBarHeight = uni.getSystemInfoSync().statusBarHeight || (await window.$flutter.fbGetStatusBarHeight()) || 0
      console.log('桥接获取：导航高度-', appConfig.statusBarHeight)

      commit('setAppConfig', appConfig)
    }
  },
  modules: {
    config,
    user
  }
})

export default store
