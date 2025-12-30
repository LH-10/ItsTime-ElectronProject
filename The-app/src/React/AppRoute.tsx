import React from "react";
import TimerCard from "./Timers/Components/TimerCard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ForwardRefExoticComponent, useEffect } from "react";
import TimerSection from "./Timers/TimerSection";
import { AlarmClockIcon, AlertCircle, BarChart3, Bell, Calendar, Clock, Clock2Icon, Home, HourglassIcon, Settings, Timer } from "lucide-react";
import {  Watch } from "lucide-react";
import { useState } from "react";
import {  RefAttributes, SVGProps } from "react";
import Stopwatch from "./Stopwatch/Stopwatch";
// import    TimerIcon  from "../ui-assets/hourglass.svg" 

const AppRoute = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("timer");

  const [navItems, setNavItems] = useState([
    { icon: HourglassIcon, label: "Timer", id: "timer" },
    { icon: Clock2Icon, label: "Stopwatch", id: "stopwatch" },
    { icon: AlarmClockIcon, label: "Alarm", id: "alarm" },
  ]);

  // { icon: Settings, label: "Settings", id: "settings" },
  useEffect(()=>{
    console.log(activeItem)
  },[activeItem])
  return (
    <div className="w-full h-screen flex flex-row  sm:gap-5">
      {/* SideBar */}
      <div className="h-full px-1 md:px-0 w-10 md:w-56 bg-gray-100 border-r border-gray-200 flex flex-col transition-all duration-300">
        {/* Logo/ */}
        <div className="py-4 px-3 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block">ItsTime</h1>
          
        </div>

        {/* Navigation Menu (Options) */}
        <nav className="flex flex-1 flex-col py-2 h-screen  md:p-4">
          <div className="space-y-1 ">
            {navItems.map((item) => (
              <SidebarItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeItem === item.id}
                onClick={() => setActiveItem(item.id)}
              />
            ))}
            </div>
            <div className="     gap-y-2 mt-auto ">
              <SidebarItem
                icon={Settings}
                label={"Settings"}
                active={activeItem === "settings"}
                onClick={() => setActiveItem("settings")}
              />
            </div>
        </nav>
      </div>
      <div className=" flex-1 pt-2 overflow-y-auto  content-center">
        <div className="w-auto h-auto" hidden={activeItem!="timer"}> {/*logic to make it visible only when active item is timer*/ }
      {/* Timer Section */}

        <TimerSection  />
        </div>
        <div className="w-auto h-auto  " hidden={activeItem!="stopwatch"}>
          {/*Stopwatch Section */}
        <Stopwatch/>
        </div>
        <div className="w-auto h-auto  " hidden={activeItem!="settings"}> 
          {/*Settings Section */}
          <InDev sectionName={"Settings"} 
                 aim="This Section will Aim to Provide some personal Customization for the user"
                 alert={"I am currently thinking what all options should i add in this section so it might take a while"}
                 Icon={Settings}/>

        </div>
        <div className="w-auto h-auto  " hidden={activeItem!="alarm"}> 
          {/*Alarm Section */}
          <InDev sectionName={"Alarm"} 
                 aim="This Section will contain daily alarm"
                 alert={"I am still figuring out how should i go about programming alarm feature using electron"}
                 Icon={AlarmClockIcon}/>

        </div>
      </div>
        
    </div>
  );
};

// function isDev({Icon:any,sectionName:string,aim:string,alert:string})=>{
//   return (<div className="bg-white/95  m-auto backdrop-blur-sm rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-gray-100">
//               <div className="relative w-24 h-24 mx-auto mb-6">
//                   <Settings
//                     className="absolute top-0 left-4 w-16 h-16 text-red-600 "
                    
//                   />
                  
//                 </div>

//                 <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
//                   In Development
//                 </div>

       
//               <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">Settings Coming Soon</h1>
//               <p className="text-gray-600 text-base mb-6 leading-relaxed">
//                 This Section will Aim to Provide some personal Customization for the user
//               </p>

//               <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
//                 <div
//                   className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"
//                   style={{ width: "5%" }}
//                 />
//               </div>

//          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
//           <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
//           <span className="text-red-800 text-sm leading-relaxed">
//             I am currently thinking what all options should i add in this section so it might take a while
//           </span>
//         </div>
//       </div>)
//   }

const InDev = React.memo(({ Icon, sectionName, aim, alert }: { Icon: any, sectionName: string, aim: string, alert: string }) => {
  return (
    <div className="bg-white/95 m-auto backdrop-blur-sm rounded-2xl shadow-2xl p-12 max-w-md w-full text-center border border-gray-100">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <Icon className="absolute top-0 left-4 w-16 h-16 text-red-600" />
      </div>

      <div className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 animate-pulse">
        In Development
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{sectionName} Coming Soon</h1>
      <p className="text-gray-600 text-base mb-6 leading-relaxed">{aim}</p>

      <div className="bg-gray-200 h-2 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse" style={{ width: "5%" }} />
      </div>

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
        <span className="text-red-800 text-sm leading-relaxed">
          {alert}
        </span>
      </div>
    </div>
  );
});

interface SidebarItemProps {
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement> & RefAttributes<SVGSVGElement>>;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function SidebarItem({ icon: Icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-2 md:px-3 py-2 rounded-lg text-left transition-colors ${
        active
          ? "bg-gray-300 text-black"
          : "text-gray-700 hover:bg-gray-200 hover:text-black"
      } sm:justify-start justify-center`}
      title={label} 
    >
      <Icon className="w-[1.1rem] h-[1.1rem] flex-shrink-0" />
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </button>
  );
}

export default AppRoute;