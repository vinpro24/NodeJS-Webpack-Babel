import devConfig from './dev.config'
import prodConfig from './prod.config'

const isDev = process.env.NODE_ENV === 'development'

const defaultConfig = {
    PORT: process.env.PORT || 3000
}

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig
        default:
            return prodConfig
    }
}

export default {
    isDev,
    ...defaultConfig,
    ...envConfig(process.env.NODE_ENV)
}
