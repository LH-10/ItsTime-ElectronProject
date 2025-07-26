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
	  <h1 className="text-2xl text-red-200 bg-black px-12 py-3 rounded-xl font-bold" onClick={()=>{navigate("/first")}}>1.Hello Tailwind in Electron Forge!</h1>
	  <h1 className="text-2xl text-red-200 bg-black px-12 py-3 rounded-xl font-bold" onClick={()=>{navigate("/next")}}>2.Hello Tailwind in Electron Forge!</h1>
        {/* <h2>Hello React!</h2> */}
        <Routes>
            <Route path="/first" element={<TimerCard/>} />
            <Route path="/next" element={<><h2 className="text-red-200 bg-black px-12 py-3">New page </h2></>}/>
        </Routes>
        </>
    )
}

export default AppRoute