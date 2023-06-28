/* eslint-disable @typescript-eslint/no-explicit-any */
import Jsbridge from './util/flutterBridge'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $flutter: typeof Jsbridge
    _aMap: any
    spBridge: any
    NoCaptcha: any
    [key: string]: any
  }
}

export {}
