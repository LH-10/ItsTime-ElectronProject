import { ipcMain, IpcMainEvent, Notification } from "electron";
import say from 'say'
import { playForInterval } from "./ringAlarm";

let notifications:Map<string,any>=new Map()//using map to keep notificaiton in scope else notification varibale will get garbage collected and events won't work
async function handleNotification(event:IpcMainEvent,message:string){
    try {
      
       const notification=new Notification({
          title:"Its  Notification",
          body:message,
          actions:[{type:'button',text:"Dismiss"}],
          silent:false,
          urgency:"critical",
          closeButtonText:"Dismiss",
          timeoutType:"never",
         })
         notifications.set(message,notification)
         say.speak(message,'',1.1)

         const stopAlarm=playForInterval()
      
         notification.closeButtonText="dismiss";
         notification.on("click",()=>{
            stopAlarm() ; 
            notifications.delete(message)
            //removing from map once the alarm has stopped
         })
         notification.on("close",()=>{
             stopAlarm();
             notifications.delete(message)
            })
         notification.addListener("action",()=>{
            stopAlarm(); 
            notifications.delete(message)
         })
         notification.show()
         
      } catch (error) {
        console.log(error)
      }
}

 function notificationIPC(){
    ipcMain.on('alarm-notification',handleNotification)
}

export {notificationIPC};