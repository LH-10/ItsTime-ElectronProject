import { AddTimerIPC } from "./timers/AddTimerIpc";
import { timeDataIPC } from "./timers/timersDataIpc";
import {notificationIPC} from "./notification/notificationIpc"
export function handleIpcRegistration(){
    timeDataIPC()
    AddTimerIPC()
    notificationIPC()
}