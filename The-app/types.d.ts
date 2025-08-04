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

interface Window{
    electron:{
        sendNotification:(message:string)=>void,
        subscribeStatistics:(callback:(statistics:Statistics)=>void)=>void
    }
}