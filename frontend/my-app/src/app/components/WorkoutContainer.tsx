// Imports
import WorkoutInput from "./WorkoutInput"
import { useState, useEffect } from "react"
import Timer from "./Timer";

function Workouts () {

    // Hooks 
    const [NumInputs, setNumInputs] = useState([1]);
    const [openTime, setopenTime] = useState(false);
    const [workouts, setWorkouts] = useState<{[key: string]: string}>({});
    
    // Add/Remove workout fields
    const onChange = (e: React.MouseEvent<HTMLButtonElement>) =>{

        // If button name is add, increase length by one
        if (e.currentTarget.name == "add"){
            setNumInputs([...NumInputs, NumInputs.length+1]);
            
        // Else button name is removed
        } else{

            // Check if there is atleast 2 workouts
            if (NumInputs.length > 1){

                // Collect ID of target
                const idRemove = parseInt(e.currentTarget.value);

                // Create a new array, removing the ID of target
                const newArray = NumInputs.filter((id) => id != idRemove);

                // Update new array
                setNumInputs(newArray);

                // Remove workout from state when input is removed
                const newWorkouts = {...workouts};
                delete newWorkouts[e.currentTarget.value];
                setWorkouts(newWorkouts);
            }
        }
    }

    // Function to handle workout input changes
    const handleWorkoutChange = (id: string, value: string) => {
        setWorkouts(prev => ({
            ...prev,
            [id]: value
        }));
    }

    // Get array of workout values, remove any empty feilds
    const workoutList = Object.values(workouts).filter(workout => workout.trim() !== "");
    
    // Use useEffect to control timer visibility
    useEffect(() => {
        // Check if there is atleast one workout input that is filled
        if (workoutList.length > 0){
            setopenTime(true);
        // Else block the start time feature
        } else {
            setopenTime(false);
        }
    // Only check when workouts change, not when openTime changes
    }, [workoutList.length]);

    return <>
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-6xl items-start lg:items-center justify-center">
                {/* Workouts Section */}
                <div className="flex flex-col items-center w-full lg:w-1/2">
                    <h2 className="text-white font-mono text-3xl md:text-5xl lg:text-6xl text-center mt-5 md:mt-10">Workouts</h2>
                    <form className="flex flex-col h-[200px] md:h-[250px] lg:h-[280px] overflow-y-auto justify-start items-center w-full max-w-2xl px-4"> 
                       
                        {/* Loop through each element of NumInputs then create a WorkoutInput */}
                        {NumInputs.map((id)=>{
                            return <WorkoutInput 
                                key={id} 
                                id={id.toString()} 
                                remove={onChange}
                                onWorkoutChange={handleWorkoutChange}
                                value={workouts[id.toString()] || ""}
                            />
                        })}
                    </form>
                    <button type="button" name="add" onClick={onChange} className="mt-4 bg-green-800 text-white px-6 py-3 rounded-lg border-2 border-green-500 shadow-lg shadow-green-500/20 hover:bg-green-700 transition-colors"> Add </button>
                </div>

                {/* Timer Section */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <Timer Open={openTime} workouts={workoutList}/>
                </div>
            </div>
    </>
}

export default Workouts