import React from "react-dom/client";
import TimerCard from "./Components/TimerCard";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AppRoute=()=>{
    const navigate=useNavigate()
    // @ts-ignore
    window.electron.getStaticData();

   
    return (
        <>
        {/* <h2>Hello React!</h2> */}
       
       <TimerCard/>
        </>
    )
}

export default AppRoute