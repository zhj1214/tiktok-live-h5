/**
 * 页面跳转拦截器
 */

export function storeFullPath() {
  setTimeout(() => {
    const page = getCurrentPages()
    uni.setStorageSync('fullPath', (page[page.length - 1] as PageCustomOptions).$page.fullPath)
  }, 500)
}

uni.addInterceptor('navigateTo', {
  success() {
    storeFullPath()
  }
})

uni.addInterceptor('navigateBack', {
  success() {
    storeFullPath()
  }
})

uni.addInterceptor('switchTab', {
  success() {
    storeFullPath()
  }
})
