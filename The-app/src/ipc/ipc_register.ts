import { AddTimerIPC } from "./timers/AddTimerIpc";
import { timeDataIPC } from "./timers/timersDataIpc";

export function handleIpcRegistration(){
    timeDataIPC()
    AddTimerIPC()
}