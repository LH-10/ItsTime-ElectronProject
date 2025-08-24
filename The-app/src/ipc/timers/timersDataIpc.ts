import { ipcMain } from "electron";
import { db } from "../../database/sqldb";

async function getTimerData(){
    const row = db.prepare('Select * from timers where id = ?')
    const timer=await row.get(1)
    return timer
}

export function timeDataIPC(){
    ipcMain.handle("get-timersData",getTimerData)
}