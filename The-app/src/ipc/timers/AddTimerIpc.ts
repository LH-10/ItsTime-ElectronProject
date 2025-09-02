import { ipcMain, IpcMain, IpcMainEvent } from "electron";
import { db } from "../../../src/database/sqldb";
import { Time } from "../../../src/types/timer.types";

async  function AddNewTimer(title:string,message:string,time:Time){
    const insert =db.prepare("INSERT INTO timers (title,message,seconds) values(?,?,?)")
    console.log(title,message,time)
    const seconds=time.hours*60*60+time.minutes*60+time.seconds
    const info= await insert.run(title,message,seconds)
    
    if(info.changes==1){
        console.log("timer added")
        return {title,message,seconds}
    }
    else{
        console.log("error occured during insetion")
    }

}

export const AddTimerIPC=()=>{
    ipcMain.handle('addTimer',async (event:IpcMainEvent,title,message,time)=>{return await AddNewTimer(title,message,time)})
}
