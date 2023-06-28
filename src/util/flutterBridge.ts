import { uuid } from '@src/lib/lodash'
import { computed } from 'vue'
import store from '@src/store'

const flutterBridge = (method: string, data: AnyObject = {}) => {
  const userAgent = window.navigator.userAgent
  if (!userAgent.match(/ios|android\/[0-9.]+/)) {
    return
  }
  // const { data, success, error } = _data
  // const uniqueIds = { success: 'success', error: 'error' }

  const successCallbackStr = uuid()
  const errorCallbackStr = uuid()

  const _str = JSON.stringify({
    method,
    data,
    success: successCallbackStr,
    error: errorCallbackStr
  })

  return new Promise((resolve, reject) => {
    window[successCallbackStr] = (res: AnyObject) => {
      resolve(res)
    }
    window[errorCallbackStr] = (res: AnyObject) => {
      reject(res)
    }
    window.spBridge.postMessage(_str)
  })
}

class $flutter {
  /**
   * 获取token
   * {
      'method':'getToken',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static fbToken = async (data?: AnyObject) => {
    const token = (await flutterBridge('getToken', data)) as {
      type: AnyObject
      token: string
    }
    return (token && token.token) || ''
  }

  /**
   * 调查问卷，提交问卷的时候桥接函数，通知app刷新待评价列表
   */
  static surveyPostMsgCommit = (data?: AnyObject) => {
    return flutterBridge('workPublishSuccess', data)
  }
  /**
   * 拨打电话
   * {
      'method':'call',
      'data':{phone:'132xxxxxxxx'},
      'success':’’,
      'error':’’,
    }
   */
  static fbPhoneCall = (data: { phone: string }) => {
    return flutterBridge('call', data)
  }
  /**
   * 获取用户id
   * {
      'method':'getAccountId',
      'data':{},
      'success':'{'accountId':'accountId','jetourer':'true'}',
      'error':’’,
    }
   */
  static fbAccountId = async () => {
    const res = (await flutterBridge('getAccountId', {})) as {
      accountId: string
      token: string
    }
    return res.accountId
  }

  /**
   * 打开登录页面
   */
  static fbLoginPage = async () => {
    return flutterBridge('openLoginPage', {})
  }

  /**
   * 打开新的web页面
   * {
      'method':'openLink',
      'data':{url:'',title:''},
      'success':’’,
      'error':’’,
      }
   */
  static fbOpenLink = (data: { url: string; title?: string }) => {
    return flutterBridge('openLink', data)
  }

  /**
   * 打开新的广告位页面
   * {
      'method':'adRouter',
      'data':{
        contentId: "1352"
        id: "1704"
        jumpLink: "app://car_series_detail.jump"
        jumpRemark: "了解大圣"
        jumpType: "app-path"
        terminal: "app"
      },
      'success':’’,
      'error':’’,
      }
   */
  static fbAdRouter = (data: { contentId: string; id: string; jumpLink: string; jumpRemark: string; jumpType: string; terminal: string }) => {
    return flutterBridge('adRouter', data)
  }

  /**
   * 返回上级/指定页面
   * {
      'method':'navigationBack',
      'data':{
        routeName: 'CarBookingPayPage'
      },
      'success':’’,
      'error':’’,
      }
   */
  static fbNavigationBack = (data?: { routeName: string }) => {
    return flutterBridge('navigationBack', data)
  }
  /**
   * 返回上级 （处理h5返回）
   * {
      'method':'canGoBack',
      'success':’’,
      'error':’’,
      }
   */
  static canGoBack = () => {
    return flutterBridge('canGoBack')
  }
  /**
   * 返回上级 （common-jump页返回）
   * {
      'method':'checkLoginGoBack',
      'success':’’,
      'error':’’,
      }
   */
  static checkLoginGoBack = () => {
    return flutterBridge('checkLoginGoBack')
  }
  /**
   * 关闭所有web页面
   * {
      'method':'navigationClose',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static fbNavigationClose = () => {
    return flutterBridge('navigationClose')
  }

  /**
   * 跳转原生页面
   * {
      'method':'router',
      'data':{routeName:'LoginPage',params:{}},
      'success':’’,
      'error':’’,
      }
   */
  static fbRouter = (data: { routeName: string; params?: AnyObject }) => {
    console.info(data)
    return flutterBridge('router', data)
  }

  static goAddressList = async (data: { routeName: string; params?: AnyObject }) => {
    const res = await flutterBridge('badgeConvertAddress', data)
    return res
  }

  /**
   * 分享
   * {
      'method':'share',
      'data':{
        platform: '0',//平台类型：0 微信好友，1 微信朋友圈，2 微博 （具体分享平台有待确认）
        title: '分享',//控制显示文本，空字符串表示显示默认文本
        content:'',// 描述内容
        imgUrl:'http://xxxxxxx', //显示图片 大小不超过10MB
        thumbUrl:'',// 缩略图 大小不超过 32KB
        webpageUrl:''
      },
      'success':’’,
      'error':’’,
      }
   */
  static fbShare = (data: AnyObject) => {
    return flutterBridge('share', data)
  }
  /**
   * 分享
   * {
      'method':'openMap',
      'data':{

      },
      'success':’’,
      'error':’’,
      }
   */
  static fbOpenMap = (data: AnyObject) => {
    return flutterBridge('openMap', data)
  }

  /**
   * 隐藏/显示原生导航条
   * {
      'method':'hiddenNavigationBar',
      'data':{hidden:true},
      'success':’’,
      'error':’’,
    }
   */
  static fbHiddenNavigationBar = (data: AnyObject) => {
    return flutterBridge('hiddenNavigationBar', data)
  }

  /**
   * 复制到粘贴板
   * {
      'method':'clipboard',
      'data':{content:'xxxxxxx'},
      'success':’’,
      'error':’’,
    }
   */
  static fbClipboard = (data: AnyObject) => {
    return flutterBridge('clipboard', data)
  }

  /**
   * 定位
   * {
      'method':'location',
      'data':{},
      'success':xxx:{
        'latitude': 2.3, // 经度
        'longitude': 1.2, // 纬度
      },
      'error':’’,
      }

   */
  static fbLocation = (async (data?: AnyObject) => {
    return await flutterBridge('location', data)
  }) as (data?: AnyObject) => Promise<{ latitude: number; longitude: number }>

  /**
   * 下载
   * {
      'method':'download',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static fbDownload = (data: AnyObject) => {
    return flutterBridge('savePicture', data)
  }
  /**
   * 滑块验证
   * {
      'method':'sliderCaptcha',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static sliderCaptcha = (data: AnyObject) => {
    return flutterBridge('sliderCaptcha', data)
  }

  /**
   * 获取状态栏高度
   * {
      'method':'getStatusBarHeight',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static fbGetStatusBarHeight = async (data?: AnyObject) => {
    const res = (await flutterBridge('getStatusBarHeight', data)) as { height: number }
    return res?.height || 0
  }

  /**
   * 调用系统相册选择视频、图片
   */
  static fbGetMediaResourcesPath = async (data?: AnyObject) => {
    const res = await flutterBridge('selectMediaFile', data)
    return res
  }

  /**
   * 打开微信小程序
   * {
      'method':'openMiniProgram',
      'data':{
        username:123,// 小程序原始id
        path:'/xx/xx',// 拉起小程序页面的可带参路径，不填默认拉起小程序首
      },
      'success':’’,
      'error':’’,
      }
   */
  static openMiniProgram = (data: AnyObject) => {
    return flutterBridge('openMiniProgram', data)
  }
  /**
   * 传递经销商门店信息
   * {
      'method':'passDealerInfo',
      'data':{
        dealerName:'',// 经销商名称
        dealerId:'',// 经销商id
      },
      'success':’’,
      'error':’’,
      }
   */
  static passDealerInfo = (data: AnyObject) => {
    return flutterBridge('passDealerInfo', data)
  }
  /**
   * 帮app渲染富文本
   * {
      'method':'getContent',
      'data':{
      },
      'success':’’,
      'error':’’,
      }
   */
  static getContent = ((data?: AnyObject) => {
    return flutterBridge('getContent', data)
  }) as (data?: AnyObject) => Promise<AnyObject>

  /**
   * 打开图片预览
   * {
      'method':'reviewImg',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static reviewImg = (data: AnyObject) => {
    return flutterBridge('reviewImg', data)
  }

  /**
   * 预约安装成功调用
   * {
      'method':'setChargingState',
      'data':{},
      'success':’’,
      'error':’’,
      }
   */
  static setChargingState = (data: AnyObject) => {
    return flutterBridge('setChargingState', data)
  }

  /**
   * 获取app版本号
   * {
      'method':'getVersionCode',
      'data':{},
      'success':'{ versionCode: '' // 版本号}',
      'error':’’,
    }
   */
  static getVersionCode = async (data?: AnyObject) => {
    const res = (await flutterBridge('getVersionCode', data)) as {
      versionCode: string
    }
    return res.versionCode
  }

  /**
   * 获取底部安全区域距离
   * {
   *  'method':'getbottomSafeAreaHeight',
   *  'data':{},
   *  'success':’’,
   *  'error':’’
   * }
   */
  static getbottomSafeAreaHeight = async (data?: AnyObject) => {
    const res = (await flutterBridge('getbottomSafeAreaHeight', data)) as { height: number }
    return res?.height || 0
  }
}

export default $flutter
// 当前加载H5的环境是不是捷途APP
export const isJtAPP = computed(() => {
  const userAgent = window.navigator.userAgent
  return userAgent.match(/ios|android\/[0-9.]+/)
})

/**
 * 捷途项目：广告位跳转
 * 终端 App: app ; 小程序：applet ;
 * 终端为app时：类型包括路径(app-path)、精品(app-boutique)、车辆配置器页面(app-vehicle)、服务商品(app-good)、资讯(app-information)、动态(app-dynamic)、活动(app-activity)、链接(app-link)、话题详情页(app-topic)、话题广场(app-topicList)；
 * 终端为小程序时：类型包括链接(applet-link)、整车(applet-vehicle)；
 * 具体的code对应的页面枚举请看接口：https://car-service-bff.jetour-sit.supaur.tech/web/position/common/jumpLinks?access_token=YuTXkEX_SrEwRN_YLgEAF7Gg9i-rf6n5
 */

export const pageObj: AnyObject = {
  'app-boutique': {
    route: 'GoodsDetailPage',
    paramsName: 'itemId'
  },
  'app-vehicle': {
    route: 'CarBookingConfigPage',
    paramsName: 'itemId'
  },
  'app-good': {
    route: 'GoodsDetailPage',
    paramsName: 'itemId'
  },
  'app-information': {
    route: 'InformationDetailPage',
    paramsName: 'informationId'
  },
  'app-topic': {
    route: 'TopicDetailPage',
    paramsName: 'id'
  },
  'app-topicList': {
    route: 'TopicSquarePage',
    paramsName: ''
  },
  'app-dynamic': {
    route: 'ContentCommentDetailPage',
    paramsName: 'id'
  },
  'app-activity': {
    route: 'ActivityDetailPage',
    paramsName: 'activityId'
  },
  'car_series_detail.jump': {
    route: 'carBookingSeriesDetailPage',
    paramsName: 'smallOrderInfo'
  },
  'car_series.jump': {
    route: 'carBookingSeriesPage',
    paramsName: 'info'
  },
  'app-vehicleZone': {
    route: 'vehiclePage',
    paramsName: 'pageCode'
  },
  'app-postTopic': {
    route: 'postTopicPage',
    paramsName: 'pageCode'
  },
  // 活动列表页
  'ActivityListPage.jump': {
    route: 'ActivityPage',
    paramsName: ''
  },
  // 资讯列表页
  'InformationListPage.jump': {
    route: 'InformationCategoriesPage',
    paramsName: ''
  },
  // 旅行+列表页
  'EcologyListPage.jump': {
    route: 'TravelPage',
    paramsName: ''
  }
}

/**
 * @description: 解析参数
 */
const queryURLParams = (url: string) => {
  const pattern = /(\w+)=(\w+)/gi
  const parames: AnyObject = {}
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  url.replace(pattern, (_$, $1, $2) => {
    parames[$1] = $2
  })
  return parames
}

/**
 * @description: 跳转app
 */
export const dealAppFn = (tempObj: AnyObject) => {
  const { jumpType, jumpLink } = tempObj
  let routeName_str = ''
  let paramsObj: AnyObject = {}
  if (jumpType === 'app-link') {
    routeName_str = 'SPWebViewPage'
    paramsObj = {
      url: jumpLink,
      title: ''
    }
  } else if (jumpType === 'app-path') {
    routeName_str = jumpLink.split('?')[0]
    //拆解链接
    paramsObj = queryURLParams(jumpLink)
  } else {
    routeName_str = pageObj[jumpType].route
    paramsObj[pageObj[jumpType].paramsName] = jumpLink
  }
  // #ifdef H5
  $flutter.fbRouter({ routeName: routeName_str, params: paramsObj })
  // #endif
}
/**
 * @description: 跳转小程序
 */
const feConfig = computed(() => store.state.config.feConfig)
export const dealAppletFn = (tempObj: AnyObject) => {
  const { jumpType } = tempObj
  let path = ''
  if (jumpType === 'applet-vehicle') {
    path = '/package-car/pages/vehicle-setting/vehicle-setting'
  }
  // #ifdef H5
  const { originalId, miniprogramType } = feConfig.value
  $flutter.openMiniProgram({ username: originalId, path, type: miniprogramType }) // prod 环境type为 release(默认)，其他环境为 trial
  // #endif
}
