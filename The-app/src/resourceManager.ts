import osUtils from "os-utils"
import os from "os"
import fs from "fs"
import { BrowserWindow } from "electron"
const Interval=500

export function pollResource(mainWindow?: BrowserWindow ){
    setInterval(async ()=>{
        const cpuUsage=await getCpuUsage();
        const memoryUsage=getMemoryUsage();
        const storageData=getStorage() || "nan";
     
        mainWindow.webContents.send("statistics",{
          cpuUsage,memoryUsage,storageData  
        } )
        // console.log(cpuUsage,memoryUsage,storageData)
    },Interval)
}

function getCpuUsage(){
    return new Promise((resolve)=>{
        return osUtils.cpuUsage(resolve)
    });
}

function getMemoryUsage(){
    return 1- osUtils.freememPercentage()
}

function getStorage(){
    const stats= fs.statSync(process.platform === 'win32'  ? "C://" : '/');
    const total=stats.blksize * stats.blocks;
    return {/*storage used */}
}

export function getStaticData(){
    const stats= fs.statSync(process.platform === 'win32'  ? "C://" : '/');
    const total=stats.blksize * stats.blocks;
    const totalStorage = total;
    const cpuModel=os.cpus()[0].model
    const totalMemoryGB=Math.floor(osUtils.totalmem()/1024)
    return {totalStorage,cpuModel,totalMemoryGB}
}