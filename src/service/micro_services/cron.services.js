import cron from 'node-cron'

const cronServer = async (start = false) => {

    start ?
        console.log("🟢 Cron Server started...", "")
        :
        console.log("🔴 Please pass the argument to start cron server...")

    if (start) {
        // update here
        cron.schedule('*/3  * * * *', async () => {
           // add the functions that are need to run in cron
        })

        cron.schedule('*/1  * * * *', async () => {
           
           
        })

    }
}

export {
    cronServer
}