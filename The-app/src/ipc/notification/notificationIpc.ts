import { ipcMain, IpcMainEvent, Notification } from "electron";
import say from 'say'
import { playForInterval } from "./ringAlarm";

let notifications:Map<number|BigInt,any>=new Map()//using map to keep notificaiton in scope else notification varibale will get garbage collected and events won't work
async function handleNotification(event:IpcMainEvent,id:number|BigInt,message:string){
    try {
      console.log(id)
      console.log(message)
       const notification=new Notification({
          title:"Its  Notification",
          body:message,
          actions:[{type:'button',text:"Dismiss"}],
          silent:false,
          urgency:"critical",
          closeButtonText:"Dismiss",
          timeoutType:"never",
         })
         notifications.set(id,notification)
         await say.speak(message,'',1.1)

         const stopAlarm=playForInterval()
      
         notification.closeButtonText="dismiss";
         notification.on("click",()=>{
            stopAlarm() ; 
            notifications.delete(id)
            //removing from map once the alarm has stopped
         })
         notification.on("close",()=>{
             stopAlarm();
             notifications.delete(id)
            })
         notification.addListener("action",()=>{
            stopAlarm(); 
            notifications.delete(id)
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