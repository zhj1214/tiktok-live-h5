<!--
 * @Description: 
 * @Version: 0.0.1
 * @Autor: zhj1214
 * @Date: 2022-04-06 09:56:38
 * @LastEditors: spx-8206 spx-qixt@supaur.com
 * @LastEditTime: 2022-05-17 15:13:23
-->
<script lang="ts">
import store from '@src/store'
export default {
  onLaunch: function () {
    console.log('App Launch')
    // 初始化appConfig
    store.dispatch('getAppConfig')
    // 清除token，避免重新登录获取到旧的token
    uni.removeStorageSync('token')
  },
  onShow: function () {
    uni.setStorageSync('pageUrl', location.href.split('#')[0])
  }
}
</script>

<style lang="scss">
/*公共css */
@import './style/element.scss';
@import './style/font.scss';
@import './style/common.scss';
</style>
