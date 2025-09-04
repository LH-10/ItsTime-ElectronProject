import { FlagTriangleRightIcon, Play, Pause, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: ms.toString().padStart(2, "0"),
    };
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prevLaps) => [time, ...prevLaps]);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const { hours, minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="w-full  max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl dark:border-gray-700">
      <div className="p-8 text-center space-y-8">
        {/* Time Display */}
        <div className="space-y-2">
          <div className="text-7xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">
            {hours}:{minutes}:{seconds}
            <span className="text-5xl">.{milliseconds}</span>
          </div>
          <div className="text-sm text-blue-500 font-medium">
            {isRunning ? "Running" : time > 0 ? "Paused" : "Ready"}
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleStartStop}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 ${
              isRunning
                ? "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover:shadow-xl"
            }`}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>

          <button
            onClick={handleLap}
            disabled={!isRunning}
            className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <FlagTriangleRightIcon className="w-6 h-6" />
          </button>

          <button
            onClick={handleReset}
            disabled={time === 0}
            className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
        </div>

        {/* Laps */}
        {laps.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-500">Lap Times</h3>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {laps.map((lapTime, index) => {
                const { hours, minutes, seconds, milliseconds } = formatTime(lapTime);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <span className="font-medium text-gray-700 dark:text-gray-300">Lap {laps.length - index}</span>
                    <span className="font-mono text-sm text-blue-500">
                      {hours}:{minutes}:{seconds}.{milliseconds}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stopwatch;