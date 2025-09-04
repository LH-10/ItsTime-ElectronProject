import { contextBridge, ipcRenderer } from "electron";
import { NewTimerParams } from "../../src/types/timer.types";

export const exposeTimerAPI=()=>{
    contextBridge.exposeInMainWorld('timeApi',{
        timer:{

            addNewTimer:(data:NewTimerParams)=>ipcRenderer.invoke('addTimer',data.title,data.message,data.time),
            editTimer:(id:number,title:string,message:string,time:number)=>ipcRenderer.invoke('editTimer',id,title,message,time),
            deleteTimer:(id:number)=>ipcRenderer.invoke('deleteTimer',id)
        }
    }
)
}