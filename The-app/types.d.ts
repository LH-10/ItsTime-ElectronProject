

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

interface Window{
    electron:{
        getTimerData:()=>Promise<any>
        sendNotification:(message:string)=>void,
        subscribeStatistics:(callback:(statistics:Statistics)=>void)=>void
        
    }
    timeApi:{
        timer:{
            addNewTimer:AddNewTimer
        }
    }
}