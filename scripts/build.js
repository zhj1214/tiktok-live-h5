const { exec } = require('child_process')
const colors = require('colors-console')
const uploadProject = require('./upload').uploadProject

const SEPARATOR = ' ---> '
const argv = process.argv

if (argv.length <= 2) {
  console.log(colors('red', 'Error') + SEPARATOR + '请指定运行环境')
  return
}
const isUpload = argv.includes('--upload')

const envStr = argv[2]
// 运行环境
const env = envStr.split(':')[0] || 'dev'
const platform = envStr.split(':')[1]

console.log('当前打包平台：' + colors('green', platform))
console.log('当前打包环境：' + colors('green', env))

const build = exec(`cross-env NODE_ENV=production UNI_PLATFORM=${platform} VITE_APP_ENV=${env} uni build -p ${platform}`, {
  cwd: process.cwd()
})

build.stdout.on('data', (data) => {
  if (data.includes('Build complete')) {
    console.log(`${colors('green', 'Build complete.')}The ${colors('green', 'dist\\build\\' + platform)} directory is ready. \r\n`)
    isUpload &&
      uploadProject((cbData) => {
        if (cbData.type === 'success') {
          console.log(`${colors('green', '上传成功.')}\r\n`)
          process.exit()
        } else if (cbData.type === 'timeout') {
          console.log(`${colors('red', '上传超时.')}\r\n`)
          process.exit(1)
        } else if (cbData.type === 'error') {
          console.log(`${colors('red', '上传失败.')} ${colors('red', cbData.error)}\r\n`)
          process.exit(1)
        }
      })
  }
})

build.stderr.on('data', (data) => {
  console.log(data)
})

build.on('error', (err) => {
  console.log(err)
})

build.on('close', (code) => {
  if (code === 0) {
    console.log(colors('green', '打包成功!') + '\n')
    console.log('打包文件地址：' + colors('blue', `dist/build/${platform === 'h5' ? 'h5' : 'mp-weixin'}`))
  }
})
