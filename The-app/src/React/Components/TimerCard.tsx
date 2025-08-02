import { useNavigate } from "react-router-dom"
import { useEffect ,useState} from "react"
import { Trash2, RotateCcw, Play, Pause } from 'lucide-react';

const TimerCard = () => {
    const navigate = useNavigate()
    const [percentage,setPercentage]=useState<number>(1)
    const [fill,setFill]=useState<number>()
    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => {
            console.log(stats)
          });
          // setInterval(()=>{
          //   setPercentage((prevPercentage)=> (prevPercentage+10)%100)
          // },1000)
        return unsub;
    }, [])
    useEffect(()=>{
      const filllength=percentageTofillLength(percentage)
      setFill(filllength);
    },[percentage])
    const circumference = 2 * Math.PI * 45; //283
    const percentageTofillLength=(percentage:number)=>{
      
      const filledLength = (percentage)/100  * circumference;
      return filledLength;
    }
    // const [timeLeft,setTimeLeft]=useState({
    //   minutes:25,
    //   seconds:12,
    // })
    const [timeLeft, setTimeLeft] = useState(25*60); // 25 minutes
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };
  const [countDown,setCountDown]=useState()
  const [start,setStart]=useState(false)
  return (
      <div className="bg-white shadow-lg rounded-xl p-6 w-64 text-center relative">
        {/*  Icons */}
        <div className="flex justify-between mb-6">
          <button title="Delete" className="p-2 rounded bg-gray-50 hover:bg-gray-300">
            <Trash2  className="w-5 h-5 text-gray-600" />
            {/* Del Icon */}
          </button>
          <button  title="Reset" className="p-2   bg-gray-50 rounded hover:bg-gray-300">
            <RotateCcw className="w-5 h-5 text-gray-500 " />
            {/* Reset icon */}
          </button>
        </div>

          {/* Circle */}
  {/* Circle */}
<div className="flex items-center justify-center mb-6">
  <div className="relative w-44 h-44 rounded-full bg-gray-200 flex items-center shadow-md justify-center">
    {/* Circular loading bar */}
    <div className="absolute inset-0 ">
      <svg
        className="w-full h-full duration-100"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          className="stroke-current text-blue-600 duration-150 dark:text-blue-500"
          strokeWidth="9.5"
          strokeDasharray={`${fill} ${circumference}`}
          strokeLinecap="butt"
          transform="rotate(90 50 50)"
        />
      </svg>
    </div>

    {/* Inner circle with time */}
    <div className="w-40 h-40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] rounded-full flex items-center justify-center bg-white z-10">
      <span className="text-3xl font-bold text-gray-800">
        {formatTime(timeLeft)}
      </span>
    </div>
    
  </div>
</div>


        {/* Start Btn */}
        {start?(
        <button onClick={()=>{setStart(!start)}} className=" bg-gray-600  hover:bg-gray-700  text-white rounded-md font-medium px-2 py-2  flex items-center justify-center gap-2 w-full">
          <Pause className="w-4 h-4  fill-white " />
          <p className="pb-1">Pause</p>
        </button>):(<button onClick={()=>{setStart(!start)}} className="group bg-blue-600  hover:bg-blue-700  text-white rounded-md font-medium px-2 py-2  flex items-center justify-center gap-2 w-full">
          <Play className="w-4 h-4  group-hover:fill-white " />
          <p className="pb-1">Start</p>
        </button>)}
      </div>
  );
}

export default TimerCard;


// <!-- Circular Progress -->
// <div className="relative size-40">
//   <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
//     <!-- Background Circle -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
//     <!-- Progress Circle -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="75" stroke-linecap="round"></circle>
//   </svg>
// </div>
// <!-- End Circular Progress -->

// <!-- Circular Progress -->
// <div className="relative size-40">
//   <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
//     <!-- Background Circle -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="2"></circle>
//     <!-- Progress Circle -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="2" stroke-dasharray="100" stroke-dashoffset="65" stroke-linecap="round"></circle>
//   </svg>

//   <!-- Percentage Text -->
//   <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
//     <span className="text-center text-2xl font-bold text-blue-600 dark:text-blue-500">35%</span>
//   </div>
// </div>
// <!-- End Circular Progress -->






// <!-- Gauge Component -->
// <div className="relative size-40">
//   <svg className="rotate-[135deg] size-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
//     <!-- Background Circle (Gauge) -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1.5" stroke-dasharray="75 100" stroke-linecap="round"></circle>

//     <!-- Gauge Progress -->
//     <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="1.5" stroke-dasharray="37.5 100" stroke-linecap="round"></circle>
//   </svg>

//   <!-- Value Text -->
//   <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
//     <span className="text-4xl font-bold text-blue-600 dark:text-blue-500">50</span>
//     <span className="text-blue-600 dark:text-blue-500 block">Score</span>
//   </div>
// </div>
// <!-- End Gauge Component -->

// <!-- Gauge Component -->
{/* <div className="relative size-40">
  <svg className="size-full rotate-180" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <!-- Background Circle (Gauge) -->
    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" stroke-width="1" stroke-dasharray="50 100" stroke-linecap="round"></circle>

    <!-- Gauge Progress -->
    <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-blue-600 dark:text-blue-500" stroke-width="1.5" stroke-dasharray="37.5 100" stroke-linecap="round"></circle>
  </svg> */}

//   <!-- Value Text -->
//   <div className="absolute top-9 start-1/2 transform -translate-x-1/2 text-center">
//     <span className="text-3xl font-bold text-blue-600 dark:text-blue-500">75</span>
//     <span className="text-sm text-blue-600 dark:text-blue-500 block">Score</span>
//   </div>
// </div>
// <!-- End Gauge Component -->