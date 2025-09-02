import React, { useEffect, useRef, useState } from "react";
import AddTimer from "./Components/AddTimer"
import { Edit2Icon, LucideAArrowDown, LucideAlarmClockPlus, LucideAlarmPlus, LucideEdit, LucidePlus, LucideSeparatorVertical, PlusIcon, PlusSquareIcon } from "lucide-react";
import TimerCard from "./Components/TimerCard";
import { AddNewTimer, NewTimerParams } from "../../types/timer.types";

const TimerSection = () => {
    const [timers, setTimers] = useState([])
    const [showAddTimer, setShowAddTimer] = useState(false)
    type TimerData={
            seconds: number;
            time: number;
            message: string;
            title: string;
    }
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

    async function addNewTimer(timerParams: NewTimerParams) {
        console.log(timerParams.title)
      
        const newTimer:TimerData  = await window.timeApi.timer.addNewTimer(timerParams)
        console.log("newTImer:", newTimer)
        newTimer.time = newTimer.seconds
        setTimers((prev) => [...prev, newTimer])

        return
    }

    return (
        <>
            <div className=" flex flex-col items-center justify-center gap-8 ">

                <div className="bg-gray-100 flex z-10 absolute w-28 top-0 right-0 mx-8 my-2 justify-center items-center shadow-md">
                    <div className="p-2 m-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200" onClick={() => { setShowAddTimer(true) }}>
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
            <AddTimer openstates={[showAddTimer, setShowAddTimer]} addNewTimer={addNewTimer} />
        </>
    )
}

export default TimerSection;