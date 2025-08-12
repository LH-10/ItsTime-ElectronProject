import { ipcMain, IpcMainEvent, Notification } from "electron";
import say from 'say'

async function handleNotification(event:IpcMainEvent,message:string){
    const notification=new Notification({
        title:"Its Time Notification",
        body:message,
        actions:[{type:'button',text:"Dismiss"}],
    })

   say.speak(message,'',1.24)
    notification.show()

}

 function notificationIPC(){
    ipcMain.on('alarm-notification',handleNotification)
}

module.exports= notificationIPC;