import { ipcMain, IpcMainEvent, Notification } from "electron";
import say from 'say'
import { playForInterval, stopAlarm } from "./ringAlarm";

let notification
async function handleNotification(event:IpcMainEvent,message:string){
    
     notification=new Notification({
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
   notification.closeButtonText="dismiss"
   notification.on("click",()=>{stopAlarm()})
   notification.on("close",()=>{stopAlarm()})
   notification.addListener("action",()=>{stopAlarm()})
   notification.show()

}

 function notificationIPC(){
    ipcMain.on('alarm-notification',handleNotification)
}

export {notificationIPC};