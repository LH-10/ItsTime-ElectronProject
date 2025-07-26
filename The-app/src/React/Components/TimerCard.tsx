import "./TimerCard.css"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const TimerCard=()=>{

    const navigate=useNavigate()


    useEffect(()=>{

        const unsub=window.electron.subscribeStatistics((stats:Statistics)=>{
            console.log(stats)
        });
        return unsub;
    }
    ,[])

    return(
        <>
  <div className="timer-card ">
    <div className="head-opt">
        <button className="head-btn" onClick={()=>navigate('/')}>Start</button>
        <button className="head-btn">Reset</button>
    </div>
    <div className="time-class">
        <div className="time-remaining">
            <span className="time-display">25:00</span>
        </div>
        <div className="opt-btns">
            <button className="opt-btn">Pause</button>
            <button className="opt-btn">Skip</button>
        </div>
    </div>
</div>
        </>
    )
}

export default TimerCard;