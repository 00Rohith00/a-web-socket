const onlineDoctors = {}

const onlineAdmins = {}

export const doctorOnlineStatus = (webSocket, request) => {

    try {
       
        if (request.body.role_name === 'doctor') {
            // check the doctor id is exist in db or not using the condition [hospital name and list of doctor_ids]
            const isExistingDoctor = true

            if (isExistingDoctor) {

                onlineDoctors[request.body.user_id.toString()] = {
                    hospitalName: request.body.hospitalName,
                    socket: webSocket,
                }

               // onlineDoctors[request.body.user_id.toString()].socket.send(`welcome ${request.body.role_name}, id no:[${request.body.user_id}]`)
                
                for (const adminDetails in onlineAdmins) {
                    if (onlineAdmins[adminDetails].hospitalName === request.body.hospitalName) {
                        const webSocketInstance = onlineAdmins[adminDetails].socket
                        webSocketInstance.send(`doctor [${request.body.user_id}] is online`)
                    }
                }
                
                webSocket.on('close', () => {
                    delete onlineDoctors[request.body.user_id.toString()]
                    for (const adminDetails in onlineAdmins) {
                        if (onlineAdmins[adminDetails].hospitalName === request.body.hospitalName) {
                            const webSocketInstance = onlineAdmins[adminDetails].socket
                            webSocketInstance.send(`doctor [${request.body.user_id}] is offline`)
                        }
                    }
                })
            }
            else {
                webSocket.send(`${role_name} is not found`)
                webSocket.close()
            }
        }
        else if (request.body.role_name === 'system_admin' || request.body.role_name === 'admin') {

            // check the given id is exist in db condition [hospital, admin_id or system_admin_id]
            const isExistingAdmin = true

            if (isExistingAdmin) {

                onlineAdmins[request.body.user_id.toString()] = {
                    hospitalName: request.body.hospitalName,
                    socket: webSocket,
                }

                onlineAdmins[request.body.user_id.toString()].socket.send(`welcome ${request.body.role_name}, id no:[${request.body.user_id}]`)

                let listOfOnlineDoctors = []

                for (const doctorDetails in onlineDoctors) {
                    if (onlineDoctors[doctorDetails].hospitalName === request.body.hospitalName) {
                        listOfOnlineDoctors.push(onlineDoctors[doctorDetails])
                    }
                }
                webSocket.send(`list of doctors in online ${listOfOnlineDoctors}`)

                webSocket.on('close', () => { delete onlineAdmins[request.body.user_id.toString()] })
            }
            else {
                webSocket.send(`${user_role} is not found`)
                webSocket.close()
            }
        }
    }
    catch (error) { throw error }
}