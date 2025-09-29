
declare module "*.svg" {
  import * as React from "react";
  const content: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default content;
}

declare module "node-wav-player"
interface Statistics{
    cpuUsage:number;
    ramUsage:number;
    storageUsage?:number;
}

interface StaticData{
    totalStorage:number;
    cpuModel:string;
    totalMemory:number;
}

type AddNewTimer=(timerParams:{title:string,message:string,time:{hours:number,minutes:number,seconds:number}})=>Promise<any>
type EditTimer=(id:number,title:string,message:string,time:number)=>Promise<any>;
interface Window{
    electron:{
        getTimerData:()=>Promise<any>,
        sendNotification:(message:string)=>void,

    }
    timeApi:{
        timer:{
            addNewTimer:AddNewTimer,
            editTimer:EditTimer
            deleteTimer:(id:number)=>Promise<any>
        }
    }
}