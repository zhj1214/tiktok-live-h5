import { wxConfig } from '@util/platform/wechat'
import currentPlatForm from '@util/platform'

export const wxShare = (params: { title: string; imgUrl: string; desc?: string }) => {
  const { title, imgUrl, desc } = params
  if (!currentPlatForm.matchlist.includes('wechat')) {
    return
  }
  wxConfig()
    .then(() => {
      // 分享朋友圈
      jWeixin.updateTimelineShareData({
        title: title, // 分享标题
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
      // 分享好友
      jWeixin.updateAppMessageShareData({
        title: title, // 分享标题
        desc: desc || '',
        link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: imgUrl, // 分享图标
        success: function () {
          // 设置成功
        }
      })
    })
    .catch((error) => {})
}
