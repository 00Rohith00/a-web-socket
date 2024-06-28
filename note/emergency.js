
// Example function for sending emergency notifications with data
function sendEmergencyNotification(hospital, data) {
    const notificationChannel = 'notification'
  
    // Check if the hospital has the notification channel
    if (hospitals.has(hospital) && hospitals.get(hospital).has(notificationChannel)) {
      const clients = hospitals.get(hospital).get(notificationChannel)
  
      // Broadcast the emergency notification with data to all clients in the notification channel
      for (const client of clients) {
        if (client.readyState === WebSocket.OPEN) {
          const notification = {
            type: 'emergency',
            data: data,
          };
          client.send(JSON.stringify(notification))
        }
      }
    }
  }
  
// Example: Sending an emergency notification with data to Royal Hospital
const emergencyData = {
    patientName: 'John Doe',
    emergencyDetails: 'Critical condition',
    appointmentTime: '2024-01-24 10:00 AM',
  };
  
  sendEmergencyNotification('royal', emergencyData)
  