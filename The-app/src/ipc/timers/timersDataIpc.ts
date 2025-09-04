import { ipcMain, IpcMainEvent } from "electron";
import { db } from "../../database/sqldb";

async function getTimerData(){
    const row = db.prepare('Select * from timers ')
    const timer=await row.all()
    console.log(timer)
    return timer
}

async function editTimer(id:number,title:string,message:string,time:number) {
    const update=db.prepare('Update timers set title=? , message=? , seconds=? where id=?  ')
    const info =update.run(title,message,time,id)
    if(info.changes=1){
        console.log('changed',info.lastInsertRowid)
        return {id,title,message,time}
    }
    else{
        console.log('error occured')
        throw new Error("Error occured while updating");
        
    }
}

async function deleteTimer(id:number){
    try {
        
        const deleteTimer=db.prepare("DELETE FROM timers where id=?")
        const info=deleteTimer.run(id)
        if(info.changes=1){
        console.log('changed',info.lastInsertRowid)
        return id
    }
    else{
        console.log('error occured in delete')
        throw new Error("Error occured while deleting");
        
    }
    } catch (error) {
        console.log(error)
        return error
    }

}
export function timeDataIPC(){
    ipcMain.handle('deleteTimer',(event:IpcMainEvent,id:number)=>deleteTimer(id));
    ipcMain.handle('editTimer',(event:IpcMainEvent,id:number,title:string,message:string,time:number)=>editTimer(id,title,message,time));
    ipcMain.handle("get-timersData",getTimerData);
}