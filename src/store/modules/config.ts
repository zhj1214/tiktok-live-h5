import { Module, MutationTree, ActionContext } from 'vuex'
import { getConfig } from '@api/config'

let isConfigLoading = false
let configPromiseArray: ResolveFn[] = []

const stateInfo: ConfigState = {
  feConfig: {}
}

const mutations: MutationTree<ConfigState> = {
  /**
   * 设置用户信息
   * @param state
   * @param user
   */
  setConfig(state: ConfigState, config) {
    state.feConfig = config
  }
}

const actions = {
  async getFeConfig(context: ActionContext<ConfigState, RootState>) {
    return new Promise((resolve) => {
      const { commit, state } = context
      // 获取当前租户的域名数据
      const domainKey = uni.getStorageSync('currentTenant').tenantId || 'JETOUR'
      if (state.feConfig[domainKey] && Object.keys(state.feConfig[domainKey]).length) {
        resolve(state.feConfig)
        return
      }
      if (isConfigLoading) {
        configPromiseArray.push(resolve)
      } else {
        isConfigLoading = true
        getConfig().then((config) => {
          commit('setConfig', config)
          resolve(config)
          configPromiseArray.forEach((resolveFn) => {
            resolveFn(config)
          })
          isConfigLoading = false
        })
      }
    })
  }
}

export default {
  namespaced: true,
  state: stateInfo,
  mutations,
  actions
} as Module<ConfigState, RootState>
