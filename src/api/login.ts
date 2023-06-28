function getRoute(): void {
  // eslint-disable-next-line
  // eslint-disable-next-line no-undef
  var pages = getCurrentPages()
  var page = pages[pages.length - 1]
  uni.setStorageSync('pathname', page.route)
}
