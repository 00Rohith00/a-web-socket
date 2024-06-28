
import jwt from "jsonwebtoken"
import { jwtToken } from "../../config/config.js"

export const tokenVerification = (webSocket, request) => {

    try {
        const authHeader = request.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (!token) {
            webSocket.send("authentication token is missing")
            webSocket.close()
            return false
        }
        
        const isValidToken =  jwt.verify(token, jwtToken.tokenKey, (error, user) => {
            
            const userId = request.url.split('?')[1] ? request.url.split('?')[1].split('=')[1] : request.url.split('?')[1]

             if (error || user.token.user_id != userId) {
                user.token.user_id == userId ?  webSocket.send("invalid authentication token") : webSocket.send("send user_id")
                webSocket.close()
                return false
            }
            request.body = { ...user.token }
            return true
        })
        return isValidToken
    }
    catch (error) { throw error }
}