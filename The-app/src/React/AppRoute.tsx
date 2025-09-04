import React from "react-dom/client";
import TimerCard from "./Timers/Components/TimerCard";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { ForwardRefExoticComponent, useEffect } from "react";
import TimerSection from "./Timers/TimerSection";
import { BarChart3, Bell, Calendar, Clock, Clock2Icon, Home, HourglassIcon, Settings, Timer } from "lucide-react";
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
    { icon: Settings, label: "Settings", id: "settings" },
  ]);

  return (
    <div className="w-full h-screen flex flex-row sm:gap-5">
      {/* SideBar */}
      <div className="h-full px-1 md:px-0 w-10 md:w-56 bg-gray-100 border-r border-gray-200 flex flex-col transition-all duration-300">
        {/* Logo/ */}
        <div className="py-4 px-3 border-b border-gray-200">
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block">ItsTime</h1>
          
        </div>

        {/* Navigation Menu (Options) */}
        <nav className="flex-1 py-2 md:p-4">
          <div className="space-y-1">
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
        </nav>
      </div>
      {/* Timer Section */}
      <div className=" flex-1 pt-3 overflow-y-auto  content-center">
        <div className="w-auto h-auto" hidden={activeItem!="timer"}> {/*logic to make it visible only when active item is timer*/ }

        <TimerSection  />
        </div>
        <div className="w-auto h-auto  " hidden={activeItem!="stopwatch"}> {/*logic to make it visible only when active item is timer*/ }

        <Stopwatch/>
        </div>
      </div>
        
    </div>
  );
};

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
      className={`w-full flex items-center gap-3 px-2 md:px-2 py-2 rounded-lg text-left transition-colors ${
        active
          ? "bg-gray-300 text-black"
          : "text-gray-700 hover:bg-gray-200 hover:text-black"
      } sm:justify-start justify-center`}
      title={label} // Tooltip for collapsed state
    >
      <Icon className="w-[1.1rem] h-[1.1rem] flex-shrink-0" />
      <span className="text-sm font-medium hidden md:block">{label}</span>
    </button>
  );
}

export default AppRoute;