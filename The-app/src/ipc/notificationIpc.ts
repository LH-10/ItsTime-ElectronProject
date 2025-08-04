import { ipcMain, IpcMainEvent, Notification } from "electron";

function handleNotification(event:IpcMainEvent,message:string){
    const notification=new Notification({
        title:"Its Time Notification",
        body:message,
        actions:[{type:'button',text:"Dismiss"}]
    })
    notification.show()
}

 function notificationIPC(){
    ipcMain.on('alarm-notification',handleNotification)
}

module.exports= notificationIPC;