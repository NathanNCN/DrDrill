interface inputProp {
    id: string,
    remove: (e: React.MouseEvent<HTMLButtonElement>)=>void;
    onWorkoutChange: (id: string, value: string) => void;
    value: string;
}

function WorkoutInput(props:inputProp){
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onWorkoutChange(props.id, e.target.value);
    };

    return <div className="flex flex-col sm:flex-row justify-center w-full max-w-md mx-auto gap-3 mt-4 px-2">
            <input 
                type="text" 
                placeholder="Add your workout" 
                value={props.value}
                onChange={handleInputChange}
                className="flex-1 px-4 py-3 text-white text-base bg-transparent focus:outline-none rounded-lg border-2 border-blue-500 shadow-lg shadow-blue-500/20 focus:border-blue-400 transition-colors"
            />
            <button name="remove" value={props.id} onClick={props.remove} type="button" className="bg-red-800 text-white px-4 py-3 rounded-lg border-2 border-red-500 shadow-lg shadow-red-500/20 hover:bg-red-700 transition-colors whitespace-nowrap"> Remove </button>
    </div>
}

export default WorkoutInput