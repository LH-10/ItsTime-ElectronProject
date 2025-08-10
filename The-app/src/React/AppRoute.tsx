import React from "react-dom/client";
import TimerCard from "./Timers/Components/TimerCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TimerSection from "./Timers/TimerSection";
const AppRoute=()=>{
    const navigate=useNavigate()
    // @ts-ignore
    window.electron.getStaticData();

   
    return (
        <>
        {/* <h2>Hello React!</h2> */}
{/*        
       <TimerCard time={11}/>
       <TimerCard time={12}/> */}
       {/* <Routes>
        <Route path="/" element={<TimerCard time={10}/>}/>
       </Routes> */}

        <TimerSection/>
        </>
    )
}

export default AppRoute