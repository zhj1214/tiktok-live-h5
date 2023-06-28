/*
 * @Description: 直播SDK
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2023-04-04 10:41:05
 * @LastEditors: zhj1214
 * @LastEditTime: 2023-04-18 17:24:55
 */
import { liveApi } from '@api/mine'

export const initSDK = (val: any) => {
  const { activityId, token, service, type } = val
  const modulesList = [
    {
      id: 'liveModule', // 接入方页面内的元素ID, 视频模块会嵌入到此元素内
      mode: type || 'player'
    }
  ]
  if (!type || (type && !type.includes('mobile'))) {
    modulesList.push({
      id: 'content', // 接入方页面内的元素ID, 菜单栏模块会嵌入到此元素内
      mode: 'menu'
    })
  }
  // console.log('modulesList：', modulesList)

  const webSDK = new window.ByteLiveWebSDK({
    activityId: activityId,
    token: token, // mode=2 时，需调用 GetSDKTokenAPI 获取用户 token。mode=1 时，可在企业直播控制台上直播间内的观看页管理 > 页面嵌入 > Web SDK嵌入中获取用户 token。
    service: service || 'unknown', // iOS 的 boundleID
    mode: 1, // 1：公开，由观众输入昵称。 2：自定义，需调用 GetSDKTokenAPI 获取用户 token，用户昵称随接口提交。
    modules: modulesList,
    options: {
      // origin: hostUrl, // 企业直播观看页域名。如无特殊需求，无需设置。
      basicPolling: true, // 设置是否开启轮询 API 实时更新直播间信息
      playerRetryTimes: 3, // 主备重试次数
      disabledLogin: true, // 是否禁用自带-登录
      saveUserInfo: true, // 是否缓存信息
      softSolution: true, // 设置是否在移动端强制开启或关闭播放器软解解码直播视频。开启软解后可解决移动端部分浏览器或 App 下播放器被劫持的问题。
      disablePlayerCover: true, // 设置是否显示直播封面
      disableReservationCell: true, // 设置是否禁用预约弹窗。
      disableRotateFullscreen: true, // 设置是否禁用移动端旋转至横屏时会自动进入全屏模式。
      disableCardRedirect: true, // 设置是否禁用卡片点击跳转能力。通常配合 card.click 事件使用，禁用后您需自行处理跳转功能。
      loginInToThumbUp: true, // 设置是否必须登录才能点赞直播间
      disableAdMiddleRedirect: true, // 设置是否禁用页中广告点击跳转能力。通常配合 adMiddle.click 事件使用，禁用后您需自行处理跳转功能。
      mobilePlayerIconIgnoreList: ['editNickname'] // 设置在移动端观看页的播放器上隐藏哪些功能的入口。editNickname：修改昵称。 notification：打开或关闭系统消息。 language：切换语言。  share：分享图标，用于分享海报、二维码或链接。
      // mobileGesture: {
      // disableGesture: true // 设置是否禁用移动端手势。禁用后，观众无法通过左右滑动预告或回放画面来拖动进度条
      // }
    }
  })

  return webSDK
}
/**
 * @description: 事件监听
 * @param {any} instance WEBSDK实例
 */
export const eventWatch = (instance: any, callback: any) => {
  instance.on('player.play', () => {
    console.log('播放-视频')
  })
  instance.on('player.playing', () => {
    console.log('恢复-播放')
  })
  instance.on('player.pause', () => {
    console.log('暂停-视频')
  })
  instance.on('player.ended', () => {
    console.log('结束-视频')
  })
  instance.on('player.destroy', () => {
    console.log('销毁播放器')
  })
  instance.on('player.ratechange', (val: number) => {
    console.log('播放速率变化：', val)
  })
  instance.on('player.fullscreen_change', (isFull: boolean) => {
    console.log('切换全屏：', isFull)
  })
  instance.on('player.pip_change', (isFull: boolean) => {
    console.log('移动端切换到视频小窗模式，PC 端切换到画中画模式。', isFull)
  })
  instance.on('player.waiting', () => {
    console.log('等待加载数据。')
  })
  instance.on('player.status', (val: string) => {
    console.log('直播状态变更，状态包含直播中、预告、回放、结束：', val)
  })
  instance.on('comment.focus', () => {
    console.log('聊天互动输入框点击事件。')
  })
  instance.on('comment.send', (val: string) => {
    console.log('发送评论，返回该评论内容：', val)
  })
  instance.on('comment.nickNameClick', (val: any) => {
    console.log('点击评论区用户的昵称，返回以下数据：用户昵称、外部用户 ID、评论是否置顶以及当前用户是否为主持人。', val)
  })
  // 没登录的话，点击分享，弹窗报错
  instance.on('permission.need', () => {
    console.log('可根据此事件判断是否弹出自定义登录框。')
    callback('permissionNeed')
  })
  instance.on('reservation.click', () => {
    console.log('点击立即预约。')
  })
  instance.on('reservation.attend', (val: string) => {
    console.log('成功预约，返回预约手机号：', val)
  })
  instance.on('card.click', (val: any) => {
    console.log('点击卡片，返回卡片标题和跳转链接。', val)
    callback('jumpPage', {
      type: 'h5',
      value: val
    })
  })
  instance.on('floatingCard.waiting', (val: any) => {
    console.log('点击浮窗卡片，返回卡片标题和跳转链接：', val)
  })
  instance.on('lottery.click', (val: any) => {
    console.log('点击抽奖入口，返回抽奖 ID：', val)
  })
  instance.on('lottery.attend', (val: any) => {
    console.log('参与抽奖，返回抽奖 ID。：', val)
  })
  instance.on('lottery.result', (val: any) => {
    console.log('抽奖结果，包括抽奖 ID 和是否中奖。仅当抽奖开奖时用户在线，才会触发此事件。：', val)
  })
  instance.on('lottery.winInfo', (val: any) => {
    console.log('用户完善中奖信息。返回抽奖 ID 和用户输入的手机号。是否返回收货地址取决于您在控制台的配置：', val)
  })
  instance.on('lotteryTicket.click', (val: any) => {
    console.log('点击领取奖券奖品，返回累计观看抽奖 ID、奖品 ID、直播间的活动 ID 和奖品链接：', val)
  })
  instance.on('taskAwardPanel.pop', (val: any) => {
    /**
     * TaskAwardId: String：本次累计观看抽奖活动的 ID。
      TaskAwardRule: ITaskAwardItem[]：抽奖规则，主要包含 index: Number（奖品序号，第一个奖品序号为 0，第二个奖品序号为 1，以此类推）、TaskAwardItemId: String（奖品 ID）和 WatchTime: Number（累计观看时长要求）。
      TaskAwardStartTime: Number：本次累计观看抽奖活动的开始时间。
      TaskAwardEndTime: Number：本次累计观看抽奖活动的结束时间。
      TaskAwardStatus: TaskAwardStatus：本次累计观看抽奖活动的状态。
      NULL(-1)：没有抽奖活动，预留字段。
      INIT(0)：初始化，即未到活动开始时间。
      START(1) ：活动进行中。
      END(2)：活动已结束。
      CLOSE(3)：活动已关闭
     * */
    console.log(
      `弹出抽奖面板，返回有关本次累计观看抽奖活动的相关数据，包括抽奖配置信息、累计观看时长、观众是否登录以及中奖记录。其中抽奖配置信息（TaskAwardConfig）主要包含以下参数:`,
      val
    )
  })
  instance.on('taskAwardBox.click', (val: any) => {
    console.log('点击抽奖面板中可开启的宝箱，返回宝箱序号和累计观看时长：', val)
  })
  instance.on('share.click', (val: any) => {
    console.log('PC 端单击分享 || 移动端点击复制链接或保存二维码：', val)
    callback('shareWechat')
  })
  instance.on('poster.click', (val: any) => {
    console.log('点击邀请海报：', val)
  })
  instance.on('adFloating.click', (val: any) => {
    console.log('点击浮标广告，返回跳转链接（需要在控制台配置跳转链接才会触发）', val)
  })
  instance.on('adMiddle.click', (val: any) => {
    console.log('点击页中广告，返回跳转链接（需要在控制台配置跳转链接才会触发）', val)
    callback('jumpPage', {
      type: 'h5',
      value: val
    })
  })
  instance.on('adAccount.click', (val: any) => {
    console.log('点击企业账号，返回跳转链接（需要在控制台配置跳转链接才会触发）', val)
    callback('jumpPage', {
      type: 'app',
      value: val
    })
  })
  instance.on('ready', () => {
    console.log('SDK 初始化完成，但并不代表播放器已经开始播放视频')
  })
  instance.on('menu.click', (val: any) => {
    /**
     * 返回以下参数：
      terminal：String 类型。观众的终端类型。 "pc"：PC 端。 "mobile"：移动端。
      layout：String 类型。当观众在移动端竖屏直播间中点击时才返回此参数，参数值为 "portrait"。 tab：Number 类型。菜单类型。
      1：图文菜单。  2：卡片菜单。3： 聊天互动菜单。4：互动工具菜单。5：聚合直播菜单。6：互动问答菜单。7：内嵌链接菜单。31：热门评论菜单。61：邀请榜单菜单。
     * */
    console.log(`菜单栏点击事件。观众点击菜单栏时， SDK 触发此事件，`, val)
  })
  instance.on('webSDK-error', (err: any) => {
    console.log('webSDK-error', err)
  })
  /**
   * @description: 抖音直播Error：
   *  101	初始化失败，缺少必要参数	初始化配置	确保 activityId、token、service、mode、modules 已配置相应的参数值
      102	token 校验失败	API 报错信息	确保 token 的参数值配置正确
      103	未找到对应的渲染父节点	父节点 ID	确保 modules 下的每个 id 对应一个 DOM 节点
      104	模块渲染失败	模块名称、报错 stack、报错信息	无
      105	未找到对应的组件	父节点 ID	确保 modules 下的 mode 参数值配置正确
      106	mobile 和 mobile-portrait 模块仅支持单独使用	无	确保 mobile 和 mobile-portrait 模块未与其他模块共用
      201	直播间信息获取失败	请求数据	无
      203	直播间暂未通过审核	无	确保直播间在企业直播控制台通过直播审核
      204	直播间重复登录	无	无
   * 
   */
  instance.on('error', (code: any, message: any, data: any) => {
    console.log('抖音直播Error：', code, message, data)
  })
}

/**
 * @description: webSDK API
 */
// updateMode2Token	String	更新公开权限 Token（mode = 1）为带有用户信息的 Token（mode = 2）。使用场景可参见 Demo 体验 中的第三方用户态直播间。
// updateModulesConf  动态更新 SDK 部分配置。通过调用该 API 可以实现移动端视频小窗模式。效果详见移动端视频小窗模式 Demo。
// getVodPlayInfo 获取点播视频（预告和回放）的播放信息。  vid：视频 ID，视频的唯一标识。 currentTime：当前播放位置。单位：秒  duration：视频总时长。单位：秒

// export const requestApi = (apiName: string, params?: any, method?: string) => {
//   axios
//     .post('https://live.byteoc.com/demo/sdkapi/invoke/cloudTestSdkToken', {
//       ActivityId: ACTIVITY_ID,
//       method: method ? method : 'GET',
//       Mode: 2,
//       Nickname: userName,
//       UserIdStr: '' + new Date().getTime() + Math.floor(Math.random() * 100)
//     })
//     .then((res) => {
//       if (res.data?.Result?.Token) {
//         if (liveSDKInstance.current) {
//           liveSDKInstance.current.updateMode2Token(res.data?.Result?.Token)
//         } else {
//           initSDK(res.data?.Result?.Token)
//         }
//       } else {
//         throw new Error()
//       }
//     })
//     .catch(() => {
//       Message.error('接口错误，请重试')
//     })
// }

/**
 * @description: 获取直播间列表API
 */
export const getLiveList = async () => {
  const res = await liveApi({
    path: '/', // 域名到问号之间的
    schema: 'HTTP',
    method: 'POST',
    serviceName: 'livesaas',
    query: {
      Action: 'ListActivityAPI',
      Version: '2020-06-01'
    },
    body: {}
  })
  console.log('获取直播间列表信息：', res)
  return res
}
