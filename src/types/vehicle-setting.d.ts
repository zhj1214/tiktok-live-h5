interface CarSku {
  bizCarFacadeVo: {
    groupedCustomAttributes: GroupedCustomAttributes[]
    outColor: { image: string; name: string }
    outPainting: { image: string; name: string }
    price: number
  }
  bizCarRimVo: {
    groupedCustomAttributes: GroupedCustomAttributes[]
    rim: { image: string; name: string }
    price: number
  }
  bizCarInteriorVo: {
    groupedCustomAttributes: GroupedCustomAttributes[]
    innerColor: { image: string; name: string }
    innerMaterial: { image: string; name: string }
    price: number
    bannerImgs: []
  }
  bizCarAssemblerMaterialVo: {
    imageList: imageList[]
    singleImageInfo: { path: string }
  }
  bizOptionalPackageVos: any[]
}
interface imageList {
  name: string
  path: string
}
interface Pk {
  id: string
  image: string
  name: string
  price: number
  detail: string
  packages: PackageInfo
  groupedCustomAttributes: []
}
interface PackageInfo {
  id: string
  image: string
  name: string
  price: number
  detail?: string
}
interface PackageObj {
  detail: string
  id: string
  image: string
  name: string
  price: number
}
