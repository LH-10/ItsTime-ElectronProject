import { useEffect, useInsertionEffect, useLayoutEffect, useState } from "react";
import { Clock, X, ChevronUp, ChevronDown, Edit3, MessageSquareIcon } from "lucide-react";
import {  UpdateTimer, Time } from "../../../../src/types/timer.types";

type EditTimerProps={
    openstates?:[boolean,React.Dispatch<React.SetStateAction<boolean>>]
    updateTimer:UpdateTimer | null
    timerData:{id:number;title:string;message:string;time:number}
}

const EditTimer=({openstates,updateTimer,timerData}:EditTimerProps)=>{
    
    // return(
    //     <>
    //     <div className="flex z-50 w-[100vw] h-[100vh] bg-opacity-50 top-0 left-0 right-0 bottom-0 justify-center items-center bg-black">
    //         <div className="flex flex-col bg-gray-200 w-72  h-24 gap-5 p-3 justify-center items-center">
    //             <h3 className="font-semibold text-black"> Title </h3>
    //             <div className="bg-white mx-4 my-2">
    //                 00:00:00
    //             </div>
    //         </div>
    //     </div>
    //     </>
    // )
    const formatNumber = (num:number) => num.toString().padStart(2, '0');
    const [timerTitle,setTimerTitle]=useState<string>()
    const [timerMessage,setTimerMessage]=useState<string>()
    
    const [isVisible, setIsVisible] =  openstates || useState(false);
    const [time, setTime] =  useState<Time>({
            hours: 0,
            minutes: 0,
            seconds: 0
            });

    useEffect(()=>{
      if(isVisible){
        console.log(timerData)
        if(timerData!=null){

          setTimerTitle(timerData.title)
          setTimerMessage(timerData.message)

          console.log(timerData.time)
          const hours=Math.floor(timerData.time/3600)
          const minutes=Math.floor((timerData.time%3600)/60)
          const seconds=Math.floor((timerData.time)%60)
          setTime({hours,minutes,seconds})
        }
      }  
    },[isVisible])  

    const adjustTime = (unit:string, increment:number) => {
        setTime(prev => {
        const newTime:any = { ...prev };  
        newTime[unit] += increment;
        
        if (unit === 'hours') {
            newTime[unit] = Math.max(0, Math.min(23, newTime[unit]));
        } else {  
            newTime[unit] = Math.max(0, Math.min(59, newTime[unit]));
        }    
        
        return newTime;
        });
    };    


    const handleInputChange = (unit:string, value:string) => {
        const numValue = parseInt(value) || 0;
        setTime(prev => ({
        ...prev,
        [unit]: unit === 'hours' ? Math.max(0, Math.min(23, numValue)) : Math.max(0, Math.min(59, numValue))
        }));
    };

    const handleKeyDown = (e:KeyboardEvent, unit:string) => {
        if (e.key === 'ArrowUp') {
        e.preventDefault();
        adjustTime(unit, 1);
        } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        adjustTime(unit, -1);
        }
    };

    
   

    if (!isVisible){
        return(<></>)
    }
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="text-white" size={20} />
            <h3 className="text-white font-semibold text-lg">Set Time</h3>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

    {/* Time Picker*/}
        <div className="p-8 bg-gray-50">
         <div className="flex items-center justify-center gap-4">
  {/* Hours */}
    < div className="flex flex-col items-center">
        <button
        onClick={() => adjustTime('hours', 1)}
        aria-label="Increase hours"
        className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-1"
        >
        <ChevronUp size={20} />
        </button>

    <div className="rounded-xl bg-white/90 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500/60 shadow-sm transition">
      <input
        type="number"
        inputMode="numeric"
        min="0"
        max="23"
        value={formatNumber(time.hours)}
        onChange={(e) => handleInputChange('hours', e.target.value)}
        onKeyDown={(e: any) => handleKeyDown(e, 'hours')}
        className="w-16 h-14 text-center text-xl font-mono font-semibold text-gray-900 bg-transparent outline-none appearance-none selection:bg-blue-100 selection:text-blue-900"
      />
    </div>

    <button
      onClick={() => adjustTime('hours', -1)}
      aria-label="Decrease hours"
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mt-1"
    >
      <ChevronDown size={20} />
    </button>

    <span className="text-[10px] tracking-wide text-gray-500 mt-1 font-medium">HOURS</span>
  </div>

  <div className="text-2xl font-bold text-gray-500 mx-1">:</div>

  {/* Minutes */}
  <div className="flex flex-col items-center">
    <button
      onClick={() => adjustTime('minutes', 1)}
      aria-label="Increase minutes"
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-1"
    >
      <ChevronUp size={20} />
    </button>

    <div className="rounded-xl bg-white/90 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500/60 shadow-sm transition">
      <input
        type="number"
        inputMode="numeric"
        min="0"
        max="59"
        value={formatNumber(time.minutes)}
        onChange={(e) => handleInputChange('minutes', e.target.value)}
        onKeyDown={(e: any) => handleKeyDown(e, 'minutes')}
        className="w-16 h-14 text-center text-xl font-mono font-semibold text-gray-900 bg-transparent outline-none appearance-none selection:bg-blue-100 selection:text-blue-900"
      />
    </div>

    <button
      onClick={() => adjustTime('minutes', -1)}
      aria-label="Decrease minutes"
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mt-1"
    >
      <ChevronDown size={20} />
    </button>

    <span className="text-[10px] tracking-wide text-gray-500 mt-1 font-medium">MINUTES</span>
  </div>

  <div className="text-2xl self-center font-bold text-gray-500 mx-1">:</div>

  {/* Seconds */}
  <div className="flex flex-col items-center">
    <button
      onClick={() => adjustTime('seconds', 1)}
      aria-label="Increase seconds"
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-1"
    >
      <ChevronUp size={20} />
    </button>

    <div className="rounded-xl bg-white/90 ring-1 ring-gray-200 focus-within:ring-2 focus-within:ring-blue-500/60 shadow-sm transition">
      <input
        type="number"
        inputMode="numeric"
        min="0"
        max="59"
        value={formatNumber(time.seconds)}
        onChange={(e) => handleInputChange('seconds', e.target.value)}
        onKeyDown={(e: any) => handleKeyDown(e, 'seconds')}
        className="w-16 h-14 text-center text-xl font-mono font-semibold text-gray-900 bg-transparent outline-none appearance-none selection:bg-blue-100 selection:text-blue-900"
      />
    </div>

    <button
      onClick={() => adjustTime('seconds', -1)}
      aria-label="Decrease seconds"
      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mt-1"
    >
      <ChevronDown size={20} />
    </button>

    <span className="text-[10px] tracking-wide text-gray-500 mt-1 font-medium">SECONDS</span>
  </div>

          </div>
        </div>
        <div className="w-full flex items-center  justify-center py-3 gap-4 px-5">
          <Edit3/>
          <input type="text"className="w-full px-4 py-1 outline-none rounded-md border border-gray-400 
             placeholder-gray-500 placeholder:italic placeholder:text-sm 
             focus:border-blue-500 focus:ring-1 focus:ring-blue-500" 
              value={timerTitle} onChange={(e)=>{setTimerTitle(e.target.value)}}
             placeholder={"Title"}/>
        </div>
        <div className="w-full flex items-center  justify-center py-3 gap-4 px-5">
          <MessageSquareIcon/>
          <input type="text" value={timerMessage} onChange={(e)=>{setTimerMessage(e.target.value)}} className="w-full px-4 py-1.5 outline-none rounded-md border border-gray-400 
             placeholder-gray-500 placeholder:italic placeholder:text-sm 
             focus:border-blue-500 focus:ring-1 focus:ring-blue-500" placeholder={"Message"}/>
        </div>

        <div className="bg-white px-6 py-4 border-t border-gray-200 flex justify-center gap-3">
          <button 
            onClick={() => setIsVisible(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              updateTimer(timerData.id,timerTitle,timerMessage,time)
              setIsVisible(false)
            }}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
          >
            Set Time
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default EditTimer;