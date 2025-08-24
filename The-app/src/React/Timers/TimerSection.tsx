import React, { useEffect, useRef, useState } from "react";
import AddTimer from "./Components/AddTimer"
import { Edit2Icon, LucideAArrowDown, LucideAlarmClockPlus, LucideAlarmPlus, LucideEdit, LucidePlus, LucideSeparatorVertical, PlusIcon, PlusSquareIcon } from "lucide-react";
import TimerCard from "./Components/TimerCard";

const TimerSection = () => {
    const dialogRef=useRef<any>('')
    const [timers, setTimers] = useState([{ id: '3', title: '1st Timer', time: 20, message: "Do this task" }, { title: '2nd Timer', id: '2', time: 20, message: "do another task" }])
    useEffect(() => {
        async function getTimerInfo() {
            const data = await window.electron.getTimerData()

            data["title"] = '1st Timer';
            data["message"] = 'Some other task';
            data['time'] = parseInt(data["seconds"])
            console.log(data)
            setTimers([data])
        }
        getTimerInfo();
        dialogRef.current.show()
    }, [])

    function addTimer(){
        
        // window.electron.addTimerToDb(timerinfo)
    }
    return (
        <>
            <div className=" flex flex-col items-center justify-center gap-8 ">

                <div className="bg-gray-100 flex absolute w-28 top-0 right-0 mx-8 my-2 justify-center items-center shadow-md">
                    <div className="p-2 m-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200">
                        <LucideAlarmClockPlus />
                    </div>
               

                    <div className="p-2 m-2 cursor-pointer hover:bg-gray-200 rounded transition duration-200">
                        <LucideEdit />
                    </div>
                </div>
                <div className="grid my-4 grid-flow-row grid-cols-2 gap-x-4">

                    {timers.map((timer) => (
                        <TimerCard key={timer.id} time={timer.time} title={timer.title} message={timer.message} other={''} />
                    ))}
                </div>

            </div>
            {/* <dialog ref={dialogRef}>
                    <AddTimer/>
            </dialog> */}
        </>
    )
}

export default TimerSection;