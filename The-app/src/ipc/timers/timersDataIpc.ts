import { ipcMain } from "electron";
import { db } from "../../database/sqldb";

async function getTimerData(){
    const row = db.prepare('Select * from timers ')
    const timer=await row.all()
    console.log(timer)
    return timer
}

export function timeDataIPC(){
    ipcMain.handle("get-timersData",getTimerData)
}