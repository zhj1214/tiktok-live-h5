interface AddWishParams {
  itemId: number
  itemName: string
  skuId: number
  isCheckout: number
  isPreSale: number
  isShowPrice: number
  extra: {
    modelName: string
    optionalPackIds: string[]
    carPoster: string
    totalPrice: number
    saleAttrs: string[]
  }
}
