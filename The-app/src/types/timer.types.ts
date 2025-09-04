
export type Time={
    hours:number
    minutes:number
    seconds:number

}
export interface NewTimerParams{
    title:string,message:string;time:Time
}

export type UpdateTimer=(id:number,title:string,message:string,time:Time)=>Promise<void>;

export type AddNewTimer=(params:NewTimerParams)=>void