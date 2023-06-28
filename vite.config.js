import { resolve } from 'path'
import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

// const ENV = import.meta.env.VITE_APP_ENV
// const isSourceMap = ENV === 'sit' || ENV === 'dev'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    legacy({
      targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'] // 面向IE11时需要此插件
    })
  ],
  base: '/live',
  publicDir: 'public',
  build: {
    assetsDir: ''
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import 'src/uni.scss';"
      }
    }
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.json'],
    alias: {
      '@src': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, 'src/api'),
      '@util': resolve(__dirname, 'src/util'),
      '@static': resolve(__dirname, 'src/static'),
      $dayjs: resolve(__dirname, 'node_modules/dayjs/esm/index')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 8080
  }
})
