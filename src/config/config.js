import * as dotenv from 'dotenv'
import { loadData } from '../utils/load.assets.js'

dotenv.config()

export const port = loadData("port", process.env.PORT)

// change the mode to switch different environments
export let prod = (_now) => {
    switch (_now) {
        case "development":
            return "development"
        case "testing":
            return "testing"
        case "production":
            return "deployment"
        default:
            return "development"
    }
}

export const jwtToken = {
    tokenKey: loadData("JWT secret key", process.env.JWT_TOKEN_SECRET_KEY),
    tokenExpireIn: loadData("JWT token Expire in", process.env.JWT_EXPIRES_IN)
}
