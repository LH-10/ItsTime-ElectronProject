import React from "react-dom/client";
import TimerCard from "./Components/TimerCard";
import { Route, Routes } from "react-router-dom";

const AppRoute=()=>{
    
    // @ts-ignore
    window.electron.getStaticData();


    window.electron.subscribeStatistics((stats:Statistics)=>{
        console.log(stats)
    });
    return (
        <>
        {/* <h2>Hello React!</h2> */}
        <Routes>
            <Route path="/" element={<TimerCard/>} />
        </Routes>
        </>
    )
}

export default AppRoute