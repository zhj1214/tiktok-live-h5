/* eslint-disable */
const ci = require('miniprogram-ci')
const colors = require('colors-console')
const appIdMap = require('./appid.json')

const argv = process.argv
if (argv.length <= 2) {
  console.log(colors('red', 'Error') + ' ---> 请指定运行环境')
  return
}

const envStr = argv[2]
const env = envStr.split(':')[0] || 'dev'

const KET_MAP = {
  sit: 'scripts/private.wxbb7c62063a9ef9ff.key'
}
// 上传进度停止一分钟后关闭进程
let timer = null

module.exports.uploadProject = async (callback) => {
  const project = new ci.Project({
    appid: appIdMap['mp-weixin'][env],
    type: 'miniProgram',
    projectPath: 'dist/build/mp-weixin',
    privateKeyPath: KET_MAP[env],
    ignores: ['node_modules/**/*']
  })
  const mm = new Date().getMonth() + 1
  const MM = mm < 9 ? '0' + mm : mm
  const dd = new Date().getDate()
  const DD = dd < 10 ? '0' + dd : dd
  const hh = new Date().getUTCHours() + 8
  const HH = hh < 10 ? '0' + hh : hh
  const ver = '' + (new Date().getFullYear() - 2000) + MM + DD + HH
  await ci
    .upload({
      project,
      version: '1.0 ' + ver,
      desc: env + ' 代码上传',
      setting: {
        es6: true,
        es7: true,
        minify: true,
        autoPrefixWXSS: true
      },
      onProgressUpdate: (data) => {
        data._status && data._status === 'done' && console.log(data.toString())
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          callback({ type: 'timeout' })
        }, 60 * 1000)
      }
    })
    .then((data) => {
      console.log(data)
      timer && clearTimeout(timer)
      callback({ type: 'success' })
    })
    .catch((error) => {
      timer && clearTimeout(timer)
      callback({ type: 'error', error })
    })
}
