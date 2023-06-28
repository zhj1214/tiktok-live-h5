import store from '@src/store'
export const selectDealerData = (data: AnyObject, sourcePage: string) => {
  const { id, name, code, saleTel, province, city, region, details, telephone } = data
  if (id) {
      // 说明来源 爱车首页选择经销商
    if (sourcePage === 'carHomePage') {
      uni.navigateTo({
        url: `/package-car/pages/test-drive/test-drive?dealerCode=${data.code}`
      })
    } else if (['goodsDetailPage', 'purchaseSettlementPage'].includes(sourcePage)) {
      // 将选中的值放入store
      store.commit('dealer/setGoodsSelectedDealer', data)
      window.$flutter.passDealerInfo({
        dealerName: name || '',
        dealerId: id || '',
        dealerCode: code || '',
        dealerSaleTel: saleTel || '',
        dealerAddress: (province || '') + (city || '') + (region || '') + (details || ''),
        dealerTel: telephone || ''
      })
      window.$flutter.fbNavigationBack()
    }
  }
}
