import { ipcMain, IpcMain, IpcMainEvent } from "electron";
import { db } from "../../../src/database/sqldb";

 function AddNewTimer(title:string,message:string,time:{hours:number,minutes:number,seconds:number}){
    const insert =db.prepare("INSERT INTO timers (id,seconds) values(?,?)")
    console.log(title,message,time)
    const seconds=time.hours*60*60+time.minutes*60+time.seconds
    const info= insert.run((new Date().getTime()),seconds.toString())
    
    if(info.changes==1){
        console.log("timer added")
    }
    else{
        console.log("error occured during insetion")
    }

}

export const AddTimerIPC=()=>{
    ipcMain.on('addTimer',(event:IpcMainEvent,title,message,time)=>{AddNewTimer(title,message,time)})
}
