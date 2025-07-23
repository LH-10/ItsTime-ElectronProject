import "./TimerCard.css"

const TimerCard=()=>{
    return(
        <>
  <div className="timer-card">
    <div className="head-opt">
        <button className="head-btn">Start</button>
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