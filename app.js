import socketRouter from './src/router/router.js'
import { server, app, wss } from './src/application/base.router.js'
import { port, prod } from './src/config/config.js'
import { loadAssets } from './src/utils/load.assets.js'
import { tokenVerification } from './src/middleware/jsonWebToken/jwt.js'
import { urlValidation } from './src/helper/urlValidation.js'
import { doctorOnlineStatus } from './src/service/webSocketFeatures/doctorOnlineStatus.js'

app.use(socketRouter)

wss.on('connection', (webSocket, request) => {

  try {

    if (tokenVerification(webSocket, request) && urlValidation(webSocket, request)) {
      
      const channel = request.body.channelName
      
      switch (channel) {
        case "doctorOnlineStatus": return doctorOnlineStatus(webSocket, request)
        case "joyStrick": return doctorOnlineStatus(webSocket, request)
        case "Notification": return onlineStatus(webSocket, request)
      
      }
    }
    else { }
    
  }
  catch (error) {
    webSocket.send("internal server error")
    webSocket.close()
  }
})


loadAssets() ?
  server.listen(port,
    () => {
      console.log(`Server is Running on \n👉 Mode [ ${prod("testing")} ] \n👉 Port [ ${port} ]`);
    }
  ) :
  console.log("🔴 Cannot read env file.");
