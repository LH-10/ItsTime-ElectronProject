import React from "react-dom/client";
import TimerCard from "./Timers/Components/TimerCard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
       {/* <Link to="/">Timers</Link>
       <Link to="/new" >Text</Link>
       
       <Routes>
        <Route path="/" element={<TimerSection/>}/>
        <Route path="/new" element={<h1 className="text-xl text-blue-400">new page</h1>}/>
       </Routes>
         */}
        <TimerSection/>
        </>
    )
}

export default AppRoute