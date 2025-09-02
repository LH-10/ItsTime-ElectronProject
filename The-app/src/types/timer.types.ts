
export type Time={
    hours:number
    minutes:number
    seconds:number

}
export interface NewTimerParams{
    title:string,message:string;time:Time
}


export type AddNewTimer=(params:NewTimerParams)=>void