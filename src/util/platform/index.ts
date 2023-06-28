import Platform from './platform'
import configs from './config'

const currentPlatForm = new Platform(configs, {
  logprint: true
})

export default currentPlatForm
