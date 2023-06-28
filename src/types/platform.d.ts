interface PlatformConfigs {
  [key: string]: {
    plticon?: RegExp
    jsSDKUrl: string
    jsSDKName: string
    jsSDKListerName: string
  }
}

interface PlatformOption {
  logprint: boolean
}

class Platform {
  logprint: boolean
  matchlist: string[]
  currentPlatForm: string
  configs: PlatformConfigs
  ready: () => Promise
  isMatch: (type: string) => boolean
  startRecongnition: () => void
  generateAppPlatform: () => void
  getCurrentFlatForm: () => void
  docReady: () => void
}
