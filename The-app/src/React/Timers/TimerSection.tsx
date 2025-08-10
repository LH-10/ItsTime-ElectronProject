import React,{useState} from "react";
import { LucideAArrowDown } from "lucide-react";
import TimerCard from "./Components/TimerCard";

const TimerSection=()=>{

    const [timers,setTimers]=useState([{id:'1',time:20},{id:'2',time:20}])

    return(
        <>
    {        timers.map((timer)=>(
                <TimerCard key={timer.id} time={timer.time} message={ ''} other={''} />
            ))}
        </>
    )
}

export default TimerSection;