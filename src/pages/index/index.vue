<template>
  <!-- 跳转APP引导组件 -->
  <guide-open-app v-model:value="pageData.isShowGuide" @getValue="(e: boolean) => (pageData.isShowGuide = e)"></guide-open-app>
  <view class="app">
    <!-- 直播容器 -->
    <view id="liveModule" class="player" :style="{ height: props.type === 'mobile-portrait' ? '100vh' : 'calc(100vw / 16 * 9)' }"></view>
    <view v-if="props.type && props.type != 'mobile-portrait'" id="content" class="menu"></view>
    <!-- APP打开 -->
    <view v-if="!isJtAPP && !pageData.isShowGuide && !isDebugger" class="btn-app" @click.prevent="jumpToApp">
      <view>APP内打开</view>
    </view>
  </view>
</template>
<script lang="ts" setup>
import { ref, reactive, inject, computed } from 'vue'
import { onShow, onLoad, onReady } from '@dcloudio/uni-app'
import { openApp, hiddenHead } from '@util/open-app'
import { initSDK, eventWatch, getLiveList } from './live-web'
import { isJtAPP } from '@util/flutterBridge'
import { isInWechat } from '@src/util/shared'
import { getUserDetail, liveApi } from '@api/mine'

/**
 * 1. 判断是不是我们的app不是则展示：打开app内打开按钮
 * 2. 在app内时，校验是否登录了，没登录-点击聊天按钮，桥接登录页面
 * 3. 登录后-返回直播页面：获取用户信息
 * 4. 使用用户昵称和手机号进行获取token，保存信息
 * */

// 加载图片资源
const gdp = inject('$gdp') as GeneratorDynamicPicFunc<string[]>
const [shareFff] = gdp(['share-back.png'])

// 获取页面参数
const props = defineProps({
  // 直播间ID
  activityId: {
    type: String,
    default: ''
  },
  // 直播间toekn
  token: {
    type: String,
    default: ''
  },
  // app 唯一标识符
  service: {
    type: String,
    default: 'com.jetour.ios'
  },
  // 直播间展示模式
  type: {
    type: String,
    default: ''
  },
  // 捷途token获取用户信息
  ticket: {
    type: String,
    default: ''
  }
})
console.log('页面参数：', props.activityId, '----', props.token, '--', props)

// 页面属性
const pageData = reactive({
  isShowGuide: false, // 是否展示引导页面： 微信浏览器需要展示
  userName: '',
  userPhone: '', // 用于直播的用户id
  liveUseToken: ''
})

/**
 * @description: 初始化web SDK
 */
const webSDK = initSDK(props)
webSDK &&
  eventWatch(webSDK, (fnName: string, val?: any) => {
    // eval(fnName)(val)   // 在真机上不行 script error
    console.log('接收到回调 --:', fnName, '---', val || '')
    webSDK[`sp_${fnName}`](val)
  })

// 互动事件（在工具类中回调）：判断是否登录，没登录跳转登录在更新token
webSDK.sp_permissionNeed = async () => {
  if (!pageData.liveUseToken) {
    let token = (await window.$flutter.fbToken()) || ''
    if (token) {
      uni.setStorageSync('token', token)
      getUserDetailRequest()
    } else {
      uni.showToast({ title: '请先登录', icon: 'none' })
    }

    if (isJtAPP.value) {
      jumpToLogin()
    } else {
      jumpToApp()
    }
  }
}
webSDK.sp_jumpPage = (val: any) => {
  if (val.type === 'h5') {
    const url = val.value.AdvertisementRedirectUrl || val.value.url || ''
    const title = val.value.text || ''
    if (url) {
      window.$flutter.fbOpenLink({ url: url, title: title })
    }
  } else if (val.type === 'app') {
    console.log(val.value.AccountHeadRedirectUrl, '--打开app--', val.value)
  }
}
webSDK.sp_shareWechat = () => {
  window.$flutter.fbShare({
    // platform: 0, //平台类型：0 微信好友，1 微信朋友圈，2 微博 （具体分享平台有待确认） 不传就会弹出弹出弹框选择
    title: '捷途直播', //控制显示文本，空字符串表示显示默认文本
    content: '', // 描述内容
    imgUrl: shareFff, //显示图片 大小不超过10MB
    thumbUrl: shareFff, // 缩略图 大小不超过 32KB
    webpageUrl: `${window.location.origin}/live/pages/index/index?activityId=${props.activityId}&token=${props.token}&type=mobile-portrait`
  })
}
// h5 调试开关，记得传入ticket才能正常运行
const isDebugger = props.service === 'supaur'
onLoad(() => {
  // 不是调试模式、且、不是捷途app。；才会跳转下载页面 （4月份）
  // 630版本更改成浏览器也可以打开观看直播，点击打开app打开下载页面
  if (!isDebugger && !isJtAPP.value) {
    // 如果是微信浏览器，隐藏头部； 不是的话：也不跳转下载页
    if (isInWechat) {
      hiddenHead({
        route: 'LiveHtmlPage',
        query: { itemId: 'LiveHtmlPage' }
      })
    }
  }
})
/**
 * @description: 生命周期函数
 */
onShow(async () => {
  console.log('onShow触发：', pageData, '--调试状态:', isDebugger)

  if ((isJtAPP.value || isDebugger) && !pageData.liveUseToken) {
    let token = (await window.$flutter.fbToken()) || ''
    if (props.ticket) {
      token = props.ticket
    } else if (!token) {
      token = uni.getStorageSync('token')
    }

    if (token) {
      uni.setStorageSync('token', token)
      getUserDetailRequest()
    } else {
      // if (!onShowLogin) {
      //   onShowLogin = true
      //   jumpToLogin()
      // }
      // uni.showToast({ title: '请先登录', icon: 'none' })
    }
  }
})

/**
 * @description: 跳转APP登录页面
 */
// let onShowLogin = false // 每次进来只提示一次 未登录
const jumpToLogin = () => {
  window.$flutter.fbLoginPage().then((token) => {
    console.log('获取登录token：', token)
    if (token) {
      uni.setStorageSync('token', token)
      getUserDetailRequest()
    }
  })
}
/**
 * @description: 获取用户信息用于直播展示、获取直播用户toekn
 */
const getUserDetailRequest = async () => {
  const res = await getUserDetail()
  pageData.userName = res.displayName || res.mobile
  pageData.userPhone = res.mobile

  getLiveUserTokenRequest()
}
/**
 * @description: 获取直播用户toekn
 */
const getLiveUserTokenRequest = async () => {
  const res = await liveApi({
    path: '/', // 域名到问号之间的
    schema: 'HTTP',
    method: 'POST',
    serviceName: 'livesaas',
    query: {
      Action: 'GetSDKTokenAPI',
      Version: '2020-06-01'
    },
    body: {
      ActivityId: Number(props.activityId),
      Mode: 2,
      Nickname: pageData.userName,
      UserIdStr: pageData.userPhone
      // InviteToken: '', // WebSDK 使用邀请海报时，传入 path后，分享链接后面跟的动态参数
      // CustomComment: '开发说GetSDKTokenAPI接口需要传入省市区' // 中奖名单中观众昵称右侧的自定义信息，例如中奖者所在的地区。最多支持 50 个字符。仅当 Mode 为 2 时该参数会生效
    }
  })
  // console.log('获取直播用户toekn：', res)
  if (res.Result) {
    pageData.liveUseToken = res.Result?.Token
    if (res.Result?.Token) {
      if (webSDK) {
        webSDK.updateMode2Token(res.Result?.Token)
      }
    } else {
      uni.showToast({ title: '登录失败' })
    }
  }
}
/**
 * @description: 引导-跳转下载app页面
 */
const jumpToApp = async () => {
  pageData.isShowGuide = await openApp({
    route: 'LiveHtmlPage',
    query: { itemId: 'LiveHtmlPage' }
  })
}
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  height: 100%;
  flex-direction: column;
  background-image: url('//p6-live.byteimg.com/tos-cn-i-gjr78lqtd0/923a9e572712a19d5b8c84fa66e90bd6.png~tplv-gjr78lqtd0-image.image');
  background-size: 100% 100%;
  background-attachment: fixed;
  .player {
    width: 100vw;
    height: calc(100vw / 16 * 9);
    // height: 100vh;
  }
  .menu {
    flex: 1 1;
    min-height: 300px;
    overflow: hidden;
  }
  .btn-app {
    position: fixed;
    z-index: 999999999 !important;
    bottom: 0rpx;
    left: 0;
    width: 100%;
    // padding: calc(68vh - 268rpx) 132rpx 68rpx 132rpx; // 标准直播间
    padding: 40rpx 192rpx 40rpx 192rpx; // 竖屏
    background-color: transparent;
    z-index: 99;

    :nth-child(1) {
      // background-color: #00a198;
      backdrop-filter: blur(12px) brightness(88%);
      text-align: center;
      color: white;
      height: 100rpx;
      line-height: 100rpx;
      border-radius: 50rpx;
      font-size: 600;
      font-size: 32rpx;
    }
  }
}
</style>
