
export const urlValidation = (webSocket, request) => {

    try {
        const url = request.url.split('?')[0]
      
        // take list of hospitals and channels from sqlite
        const listOfHospital = ['psg','royalCare','kmch']                                        // retrieve all hospital names

        if (listOfHospital.includes(url.split('/')[1])) {                                        

            const listOfChannels = ['doctorOnlineStatus', 'robotMaintenanceStatus', 'joyStrick']   // list of channels in a particular hospital

            if (listOfChannels.includes(url.split('/')[2])) {                                     
                request.body.hospitalName = url.split('/')[1]
                request.body.channelName = url.split('/')[2]
                return true
            }
            else {
                webSocket.send("channel is not found")
                webSocket.close()
                return false
            }
        }
        else {
            webSocket.send("hospital is not found")
            webSocket.close()
            return false
        }
    }
    catch (error) { throw error }
}