import React, { useEffect, useRef, useState } from "react";
import AddTimer from "./Components/AddTimer"
import { Edit2Icon, LucideAArrowDown, LucideAlarmClockPlus, LucideAlarmPlus, LucideEdit, LucidePlus, LucideSeparatorVertical, PlusIcon, PlusSquareIcon } from "lucide-react";
import TimerCard from "./Components/TimerCard";
import { AddNewTimer, NewTimerParams } from "./timer.types";

const TimerSection = () => {
    const [timers, setTimers] = useState([{ id: '3', title: '1st Timer', time: 20, message: "Do this task" }, { title: '2nd Timer', id: '2', time: 20, message: "do another task" }])
    const [showAddTimer,setShowAddTimer]=useState(false)
    useEffect(() => {
        async function getTimerInfo() {
            const datas = await window.electron.getTimerData()
            datas.map((data:any)=>{data["title"] = '1st Timer';
            data["message"] = 'Some other task';
            data['time'] = parseInt(data["seconds"])
            console.log(data)
            setTimers((prev)=>[...prev,data])
        })
        }
        getTimerInfo();
    }, [])
    
    function addNewTimer(timerParams:NewTimerParams):AddNewTimer{
        console.log(timerParams.title)
        
        window.timeApi.timer.addNewTimer(timerParams)
        return 
    }

    return (
        <>
            <div className=" flex flex-col items-center justify-center gap-8 ">

                <div className="bg-gray-100 flex z-10 absolute w-28 top-0 right-0 mx-8 my-2 justify-center items-center shadow-md">
                    <div className="p-2 m-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200" onClick={()=>{setShowAddTimer(true)}}>
                        <LucideAlarmClockPlus />
                    </div>
               

                    <div className="p-2 m-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200">
                        <LucideEdit />
                    </div>
                </div>
                <div className="my-2 grid grid-flow-row sm:grid-cols-2 xl:grid-cols-3 gap-x-9 gap-y-6">

                    {timers.map((timer) => (
                        <TimerCard key={timer.id} time={timer.time} title={timer.title} message={timer.message} other={''} />
                    ))}
                </div>

            </div>
            <AddTimer openstates={[showAddTimer,setShowAddTimer]} addNewTimer={addNewTimer} />
        </>
    )
}

export default TimerSection;