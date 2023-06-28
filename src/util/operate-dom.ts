/**
 * 动态加载地图script
 */
let isLoadedScript = false
export const loadMapsScript = (amap: AnyObject) => {
  const mapKey = amap.web_api_key
  let scriptUrl = `https://map.qq.com/api/gljs?v=1.exp&key=${mapKey}&libraries=service`
  return new Promise((resolve, reject) => {
    if (isLoadedScript) {
      resolve(true)
      return
    }
    var script = document.createElement('script')
    script.src = scriptUrl
    document.body.appendChild(script)
    script.onload = function (e) {
      isLoadedScript = true
      resolve(true)
    }
  })
}
