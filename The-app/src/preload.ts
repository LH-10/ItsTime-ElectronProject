import { contextBridge, ipcRenderer } from "electron";
import { getStaticData } from "./resourceManager";

contextBridge.exposeInMainWorld('electron',{
    subscribeStatistics:(callback:(statistics:any)=>void)=>{
        const fn=(_:Electron.IpcRendererEvent,statistics:any)=>{
            callback(statistics)
        }
        ipcRenderer.on("statistics",fn);
        return ()=>ipcRenderer.off("statistics",fn);
        },
    getStaticData: ()=> console.log('static')
})

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
