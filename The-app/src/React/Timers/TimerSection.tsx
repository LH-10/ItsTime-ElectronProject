import React,{useState} from "react";
import { LucideAArrowDown } from "lucide-react";
import TimerCard from "./Components/TimerCard";

const TimerSection=()=>{

    const [timers,setTimers]=useState([{id:'1',title:'1st Timer',time:20,message:"Do this task"},{title:'2nd Timer',id:'2',time:20,message:"do another task"}])

    return(
        <>
        <div className="grid grid-flow-row grid-cols-2 gap-x-4">
            
    {        timers.map((timer)=>(
        <TimerCard key={timer.id} time={timer.time} title={timer.title} message={ timer.message} other={''} />
    ))}
    </div>
        </>
    )
}

export default TimerSection;