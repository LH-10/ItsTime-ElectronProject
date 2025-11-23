import React, { useEffect, useRef, useState } from "react";
import AddTimer from "./Components/AddTimer"
import { Edit2Icon, LucideAArrowDown, LucideAlarmClockPlus, LucideAlarmPlus, LucideEdit, LucidePlus, LucideSeparatorVertical, PlusIcon, PlusSquareIcon } from "lucide-react";
import TimerCard from "./Components/TimerCard";
import { AddNewTimer, NewTimerParams, UpdateTimer } from "../../types/timer.types";
import { time } from "console";
import EditTimer from "./Components/EditTimer";

const TimerSection = () => {
    type TimerData={
            id:number
            seconds: number;
            time: number;
            message: string;
            title: string;
    }
    const [isSelectable,setIsSelectable]=useState<boolean>(false)
    const [timers, setTimers] = useState<TimerData[]>([])
    const [showAddTimer, setShowAddTimer] = useState(false)
    const [showEditTimer, setShowEditTimer] = useState(false)
    const [timerInfo,setTimerInfo]=useState<TimerData>(null)  //to pass as a prop to edittimer component
    useEffect(() => {
        async function getTimerInfo() {
            const data = await window.electron.getTimerData()
            data.map((timer: TimerData) => {
                timer["message"] = timer.message;
                timer['time'] = timer["seconds"]
                console.log(timer)
                setTimers((prev) => [...prev, timer])
            })
        }
        getTimerInfo();
    }, [])

    const editTimer:UpdateTimer=async (id,title,message,time)=>{
        try {
            const seconds=time.hours*3600+time.minutes*60+time.seconds
            console.log(seconds,time.hours)
            const updatedTimer:TimerData=await window.timeApi.timer.editTimer(id,title,message,seconds)
            console.log(updatedTimer)
            setTimers((timers)=>timers.map(timer=>timer.id==id?updatedTimer:timer))
        } catch (error)  {
            console.log(error)
        }
    }

    async function addNewTimer(timerParams: NewTimerParams) {
      
        const newTimer:TimerData  = await window.timeApi.timer.addNewTimer(timerParams)
        console.log("newTImer:", newTimer)
        newTimer.time = newTimer.seconds
        setTimers((prev) => [...prev, newTimer])

        return
    }

    async function deleteTimer(id:number){
        try {
            const deletedId:number=await window.timeApi.timer.deleteTimer(id)
            setTimers((timers)=>timers.filter((timer)=>timer.id!=deletedId))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className=" flex py-3 flex-col items-center justify-center gap-8 ">

                <div className="bg-gray-100 flex  z-20 opacity-80 absolute w-28 top-0 right-0 mx-8 my-2 justify-center items-center shadow-md">
                    <div title="Add Timer" className="p-2 m-2  cursor-pointer hover:bg-gray-200 rounded transition duration-200" onClick={() => { setShowAddTimer(true) }}>
                        <LucideAlarmClockPlus  />
                    </div>


                    <div title="Edit Timer" className="p-2 m-2  cursor-pointer hover:bg-gray-200 rounded transition duration-200" onClick={()=>{setIsSelectable((pr)=>!pr)}}>
                        <LucideEdit />
                    </div>
                </div>
                <div className="my-5 grid grid-flow-row sm:grid-cols-2 xl:grid-cols-3 gap-x-9 gap-y-6">

                    {timers.map((timer) => (
                        <div className={`w-auto h-auto rounded-xl transition-all duration-300 ease-in-out 
                                        ${isSelectable ? "border-2 border-blue-500 shadow-lg hover:shadow-xl hover:border-blue-600 hover:scale-105 cursor-pointer": ""}`}
                            onClick={isSelectable?()=>{
                                setTimerInfo(timer)
                                setShowEditTimer(true)
                                setIsSelectable(false)
                            }:()=>{}}>

                        <TimerCard key={timer.id} time={timer.time} title={timer.title} message={timer.message} other={{id:timer.id,deleteTimer}} />
                        </div>
                    ))}
                </div>

            </div>
            <AddTimer openstates={[showAddTimer, setShowAddTimer]} addNewTimer={addNewTimer} />
            <EditTimer  openstates={[showEditTimer,setShowEditTimer]} updateTimer={editTimer} timerData={timerInfo} />
        </>
    )
}

export default TimerSection;