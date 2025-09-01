import { contextBridge, ipcRenderer } from "electron";

export const exposeTimerAPI=()=>{
    contextBridge.exposeInMainWorld('timeApi',{
        timer:{

            addNewTimer:(data:{title:string,message:string,time:{hours:number,minutes:number,seconds:number}})=>ipcRenderer.send('addTimer',data.title,data.message,data.time)
        }
    }
)
}