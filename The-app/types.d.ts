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
        subscribeStatistics:(callback:(statistics:Statistics)=>void)=>void
    }
}