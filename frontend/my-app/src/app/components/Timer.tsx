'use client'

// Imports
import { useState, useEffect } from "react"

// Interface for props
interface timeProps  {
    Open: boolean,
    workouts: string[],

}

function Timer(props: timeProps){

    // Hooks
    
    // Hooks for timer
    const [time, setTime] = useState("0:00");
    const [lock, setLock] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [currentSeconds, setCurrentSeconds] = useState(0);

    // Hooks for form for timer
    const [formData, setFormData] = useState({"minutes": "", "seconds":""});

    // Hook for speech delay
    const [speechTime, setSpeechTime] = useState(1);

    // Function to Update form data on change
    const handleChange =  (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.currentTarget.name]: e.currentTarget.value});
    }

    // Function to rest the form inputs
    const restForm = ()=> {
        setFormData({"minutes": "", "seconds":"" })
    }

    // Function to handle form submits
    const handleSumbit = (e: React.FormEvent) => {

        // Prevent screen from refreshing
        e.preventDefault();
        setLock(true);

        // Collect the total time of timer and update state
        const minutes = formData.minutes;
        const seconds = formData.seconds;
        const total = (parseInt(minutes) * 60) + parseInt(seconds);
        setTotalSeconds(total);
        setCurrentSeconds(total);
        setTime(`${minutes}:${seconds.padStart(2, '0')}`);

        // Rest form
        restForm();
    }
    
    // Function to rest form data
    const restTime = () => {
        restForm();
        setLock(false);
        setTime("0:00");
        setTotalSeconds(0);
        setCurrentSeconds(0);
    }

    
    // useEffect to update timer when time changes
    useEffect( ()=>{

        // Check if timer is not locked or set to "0:00"
        if (!lock || time ==  "0:00") return;
        

        const updateTime = () => {
            
            // Split time state into two ints, minutes and seconds
            const [minutes, seconds] = time.split(":");
            const intMinutes = parseInt(minutes)
            const intSeconds = parseInt(seconds)
            
            // Calculate current seconds for progress
            const newCurrentSeconds = (intMinutes * 60) + intSeconds;
            setCurrentSeconds(newCurrentSeconds);
            
            // Check if there are no more seconds
            if (intSeconds == 0){

                // if there are no more minutes, timer has finished
                if (intMinutes == 0){

                    // Reset time
                    setTime("0:00");
                    setLock(false);
                    setCurrentSeconds(0);
                } else {
                    // Else update timer
                    setTime(`${intMinutes - 1}:${59}`)
                }
            
            // Check if time is less than or equal to 10 seconds to update format
            } else if (intSeconds <=10){
                setTime(`${intMinutes}:0${ intSeconds - 1}`)
        
            // Else update timer normally
            } else {
                setTime(`${intMinutes}:${intSeconds - 1}`)
            }

            // Decrease speech timer once
            setSpeechTime(speechTime -1);
            
            // Check once speech timer is zero
            if (speechTime == 0){

                // Select a random time between 2-10 seconds for next time to speak
                const randomTime = Math.floor(Math.random() * 9) + 2;
                setSpeechTime(randomTime);

                // Select a random workout to speak
                const randomIndex = Math.floor(Math.random() * props.workouts.length)
                const workout = props.workouts[randomIndex]
                const utterance = new SpeechSynthesisUtterance(workout)
                speechSynthesis.speak(utterance)
            } 
        };
        const Timer = setTimeout(updateTime, 1000);
        return () => clearTimeout(Timer)
    },[time, lock])

    // Calculate progress for circular timer
    const progress = totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;
    const circumference = 2 * Math.PI * 200; // radius of 200
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return <div className="flex flex-col items-center gap-6">
            <div className="relative flex items-center justify-center h-[500px] w-[500px]">
                <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 500 500">
                    <circle
                        cx="250"
                        cy="250"
                        r="200"
                        fill="transparent"
                        stroke="#374151"
                        strokeWidth="8"
                    />
                    <circle
                        cx="250"
                        cy="250"
                        r="200"
                        fill="transparent"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-linear"
                    />
                </svg>
                <h2 className="text-white font-mono text-4xl md:text-6xl lg:text-8xl text-center z-10">{time}</h2>
            </div>
            <form className="flex flex-row gap-4 justify-center w-full max-w-md" onSubmit={handleSumbit}>
                <input value={formData.minutes} name="minutes" type="number" min={0} max={60} placeholder="Minutes"  onChange={handleChange} className="w-32 px-4 py-3 text-white text-base bg-transparent focus:outline-none rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/20 focus:border-blue-400 transition-colors" required/>
                <input value={formData.seconds} name="seconds"placeholder="Seconds"type="number" min={0} max={60} onChange={handleChange} className="w-32 px-4 py-3 text-white text-base bg-transparent focus:outline-none rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/20 focus:border-blue-400 transition-colors" required/>
                {lock &&  <button name="Start" type="button" onClick={restTime}  className="mt-2 bg-red-800 text-white px-4 py-2 rounded-lg border-2 border-red-500 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-colors"> REST </button>}
                {props.Open && !lock && <button name="Start" type="submit" className="mt-2 bg-green-800 text-white px-4 py-2 rounded-lg border-2 border-green-500 shadow-lg shadow-green-500/20 hover:bg-green-700 transition-colors"> START </button>}
                {!props.Open && <button disabled={true} className="mt-2 bg-blue-800 text-white px-4 py-2 rounded-lg border-2 border-blue-500 shadow-lg shadow-green-500/20 hover:bg-green-700 transition-colors"> Add workouts above </button>}
            </form>
        </div>
}

export default Timer;