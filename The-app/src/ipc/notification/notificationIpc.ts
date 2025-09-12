import { ipcMain, IpcMainEvent, Notification } from "electron";
import say from 'say'
import { playForInterval, stopAlarm } from "./ringAlarm";

async function handleNotification(event:IpcMainEvent,message:string){
    
    const notification=new Notification({
        title:"Its  Notification",
        body:message,
        actions:[{type:'button',text:"Dismiss"}],
        silent:false,
        urgency:"critical",
        closeButtonText:"Dismiss",
        timeoutType:"never",
    })

   say.speak(message,'',1.1)
   playForInterval()
   notification.show()
   notification.closeButtonText="dismiss"
   notification.on("click",()=>{stopAlarm()})
   notification.on("close",()=>{stopAlarm()})
   notification.addListener("action",()=>{stopAlarm()})

}

 function notificationIPC(){
    ipcMain.on('alarm-notification',handleNotification)
}

export {notificationIPC};