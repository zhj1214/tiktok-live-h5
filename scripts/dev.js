const os = require('os')
const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const colors = require('colors-console')
const modifyManifest = require('./manifest')
const PLATFORM_MAP = require('./platform.json')

const SEPARATOR = ' ---> '

const argv = process.argv
if (argv.length <= 2) {
  console.log(colors('red', 'Error') + SEPARATOR + '请指定运行环境')
  return
}

const envStr = argv[2]
// 运行环境
const env = envStr.split(':')[0] || 'dev'
// 运行平台
const platform = envStr.split(':')[1]

console.log('当前运行环境：' + colors('green', env) + '\n')
console.log('当前运行平台：' + colors('green', platform) + '\n')

if (!platform || !Object.keys(PLATFORM_MAP).includes(platform)) {
  console.log(colors('red', 'Error') + SEPARATOR + '请检查运行环境配置\n')
  return
}

const platformEnvVar = PLATFORM_MAP[platform]
// 系统版本
const sys = os.type()
const isWindow = sys === 'Windows_NT'
// 根据本地环境变量获取本地开发工具安装地址
const localIde = process.env[platformEnvVar] || ''
console.log('开发工具安装地址：' + colors('green', localIde) + '\n')
// 开发工具命令
const toolPath = path.resolve(localIde || '')
const cliCmd = isWindow ? 'cli' : toolPath + '/Contents/MacOS/cli'

// 已启动开发工具状态
let hasStartIde = false
let firstCheck = true

// 根据环境修改小程序 appId 配置
platform === 'mp-weixin' && modifyManifest(platform, env)

// 开始打包
init()

function init() {
  const run = exec(`cross-env NODE_ENV=development UNI_PLATFORM=${platform} VITE_APP_ENV=${env} uni -p ${platform}`, {
    cwd: process.cwd()
  })
  run.stdout.on('data', (data) => {
    if (data.includes('Starting development server')) {
      console.log(`${colors('green', 'Starting development server...')} \r\n`)
      return
    }
    if (data.includes('Compiled successfully')) {
      console.log(`${colors('green', 'Compiled successfully.')} \r\n`)
      return
    }
    if (data.includes('Build complete')) {
      console.log(
        `${colors('green', 'Build complete.')}The ${colors('green', 'dist\\dev\\' + platform)} directory is ready. ${colors(
          'blue',
          'Watching for changes...'
        )} \r\n`
      )
      if (hasStartIde) {
        return
      }
      if (platform !== 'h5') {
        initDevTool()
      }
      return
    }
    if (data.includes('App running at')) {
      console.log(colors('bright', data))
      return
    }
    if (data.includes('localhost') || data.match(/\d{1,3}.\d{1,3}.\d{1,3}/g)) {
      console.log(colors('green', data))
      return
    }
    if (data.trim() === '') {
      return
    }
    console.log(data)
  })

  run.stderr.on('data', (data) => {
    console.log(data)
  })

  run.on('error', (err) => {
    console.log(err)
  })
}

/**
 * @description 检测本地文件或文件夹是否存在
 * @author beiyou@sp0095
 * @date 2019-12-23
 * @param {Promise} path
 * @returns
 */
function getStat(url) {
  return new Promise((resolve, reject) => {
    fs.stat(url || '', (err, stats) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * @description 本地开发工具环境变量检测
 * @author beiyou@sp0095
 * @date 2019-12-23
 * @returns {boolean}
 */
function hasDevToolEnv() {
  if (!localIde) {
    firstCheck &&
      console.log(
        colors('green', 'Info') +
          SEPARATOR +
          '项目已编译成功！ 若配置系统环境变量 ' +
          colors('green', platformEnvVar) +
          '，地址为相关开发工具安装地址，则可以支持自动打开微信开发者工具'
      )
    firstCheck = false
    return false
  }
  return true
}

/**
 * @description 检测并初始化本地开发工具
 * @author beiyou@sp0095
 * @date 2019-12-23
 */
function initDevTool() {
  if (hasDevToolEnv()) {
    getStat(toolPath)
      .then(runCli)
      .catch((err) => {
        console.log(err)
        console.log(colors('red', 'Error') + SEPARATOR + colors('red', localIde) + `不存在`)
      })
  }
}

/**
 * @description 启动本地开发工具
 * @author beiyou@sp0095
 * @date 2019-12-23
 */
function runCli() {
  console.log('正在启动微信开发者工具... \r\n')
  console.log('项目打包地址：' + colors('green', process.cwd()) + '\n')
  const cli = exec(`${cliCmd} open --project  ${process.cwd()}/dist/dev/mp-weixin`, {
    cwd: toolPath
  })
  cli.stdout.on('data', (data) => {
    console.log(colors(['bright'], data))
    if (data.includes('Fail to open IDE')) {
      console.log(
        '微信开发者工具' +
          colors('red', '项目自启动失败') +
          '，请手动导入项目，或检查微信开发者工具' +
          colors('blue', '服务端口是否开启') +
          '或' +
          colors('blue', '当前微信账号是否失效')
      )
    }
  })

  cli.on('close', (code) => {
    if (code === 0) {
      hasStartIde = true
    }
  })
}
