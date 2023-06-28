import { isAndroid } from '@util/open-app'

export const goBack = () => {
  const historyPages = getCurrentPages()
  if (historyPages?.length > 1) {
    // 解决H5返回偶现异常的问题
    if (isAndroid) {
      window.$flutter.canGoBack()
    } else {
      uni.navigateBack({
        delta: 1
      })
    }
  } else {
    try {
      // 通过桥接方法调用回退
      window.$flutter.fbNavigationBack()
    } catch (err) {
      uni.navigateBack({})
    }
  }
}
