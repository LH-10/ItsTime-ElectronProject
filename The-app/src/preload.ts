import { contextBridge, ipcRenderer } from "electron";
import { getStaticData } from "./resourceManager";

contextBridge.exposeInMainWorld('electron',{
    subscribeStatistics:(callback:(statistics:any)=>void)=>{
        ipcRenderer.on("statistics",(_,statistics)=>{
            
            callback(statistics)
        })
        },
    getStaticData: ()=> console.log('static')
})

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
