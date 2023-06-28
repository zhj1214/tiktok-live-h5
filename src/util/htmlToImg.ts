import html2canvas from 'html2canvas'

// html转canvas，canvas导出成图片下载
export const htmlToImage = ($el: HTMLElement, options?: any) => {
  return new Promise(async (resolve, reject) => {
    const canvas = await html2canvas($el, { ...options })
    const url = canvas.toDataURL('image/jpeg')
    resolve(url)
    // canvas.toBlob((blob) => {
    //   resolve(blob)
    // })
  })
}

export const saveFile = (blob: Blob, imageType: string = 'jpeg') => {
  const url = window.URL || window.webkitURL
  let pageUrl = url.createObjectURL(blob)
  let aTag = window.document.createElement('a')
  let filename = new Date().getTime() + '.' + imageType

  // 浏览器环境下调用
  aTag.href = pageUrl
  aTag.download = filename
  window.document.body.appendChild(aTag)
  aTag.click()
  url.revokeObjectURL(pageUrl) // 下载成功后清空创建的引用
  aTag.remove()
}
