import { Module, MutationTree, ActionContext } from 'vuex'
import { getVipUserPoint, signInEventStart, getTaskInfo, getUserData } from '@api/user'
import { pureAssign } from '@util/shared'

const stateInfo: UserState = {
  accountId: '',
  memberSystemId: '',
  pointSystemId: '',
  mobile: '',
  displayName: '',
  avatarUrl: '',
  point: 0
}

const mutations: MutationTree<UserState> = {
  /**
   * 设置用户信息
   * @param state
   * @param user
   */
  setUserInfo(state: UserState, user: AnyObject) {
    pureAssign(state, user)
  },
  resetUserInfo(state: UserState) {
    Object.assign(state, {
      accountId: '',
      memberSystemId: '',
      pointSystemId: '',
      mobile: '',
      displayName: '',
      avatarUrl: '',
      point: 0
    })
  }
}

const actions = {
  async getUserPoint(context: ActionContext<UserState, RootState>) {
    try {
      const { point } = await getVipUserPoint()
      context.commit('setUserInfo', { point: Number(point) })
      return Number(point)
    } catch (error) {}
  },
  // 签到相关接口
  async signIn(context: ActionContext<UserState, RootState>) {
    try {
      const resData = await signInEventStart()
      return resData
    } catch (error) {
      return false
    }
  },
  // 根据场景号获取任务信息
  async getTaskInfoByCode(context: ActionContext<UserState, RootState>) {
    try {
      const resData = await getTaskInfo()
      let obj: AnyObject = {}
      // 任务未开始或无此任务后端返回null,因此可根据id是否有值判断是否有可以签到的活动
      if (resData.taskInfo) {
        const { id, taskRuleDesc } = resData.taskInfo
        obj.taskIdStr = id
        obj.taskRuleDesc = taskRuleDesc
      }
      return obj
    } catch (error) {
      return false
    }
  },
  // 获取用户任务进度
  async getUserTaskData(context: ActionContext<UserState, RootState>, taskId: string) {
    try {
      const resData = await getUserData(taskId)
      return resData
    } catch (error) {
      return false
    }
  }
}

export default {
  namespaced: true,
  state: stateInfo,
  mutations,
  actions
} as Module<UserState, RootState>
