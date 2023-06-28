/**
 * request请求类型声明
 */
interface RequestOptionInfo {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  domain: string
  header?: any
  data?: any
  withoutToken?: boolean
  needTerminal?: boolean
}
interface UploadRequestOptionInfo {
  hideLoading?: boolean
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  domain: string
  header?: any
  data?: any
  withoutToken?: boolean
  needTerminal?: boolean
}

interface UploadRequestData {
  files?: [File]
  file?: File
  fileType?: 'image' | 'video' | 'audio'
  /**
   * 要上传文件资源的路径
   */
  filePath?: string
  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name?: string
  hideLoading?: true
}
