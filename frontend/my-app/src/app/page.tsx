'use client'

//imports
import Image from "next/image";
import WorkoutContainer from "./components/WorkoutContainer";
import Timer from "./components/Timer";
import {useEffect, useState, useRef} from "react"

// Const to store the type writer text
const introText = `ATTENTION! I'm Dr. Drill, your personal coach. I'm 
            here to help you master your skills, push your limits, and destroy your goals. Add your workouts, set a
            time span, and get ready to WORK! Together, we'll battle the dreaded sickness called losing, and I'll be 
            the medicine to help you fight against it. `

// length of text above
const textLength = 360

export default function Home() {

  // hooks
  const [text, setText] = useState("")
  const [dontText, setdoneText] = useState(false)
  const hasTyped = useRef(false)


  //Once page loads begin the type writing effect
  useEffect ( () =>{
      if (hasTyped.current) return;

      const write = async () => {
          // loop the length of string
          for (let i = 0; i < textLength; i++){
              //slice and update the text
              const slicedText = introText.slice(0,i);
              setText(slicedText)
              // wait 35 ms before looping again
              await new Promise(resolve => setTimeout(resolve,20));
          }

          //Once finished loop change variable to display text later
          setdoneText(true);
          hasTyped.current = true;
      }
      write()
    }, [])
    
 
  return (<div className="bg-[#121212] min-h-screen">
      <div className="flex flex-container flex-col items-center pt-10 md:pt-20 gap-5 px-4">
          <h1 className="text-white font-mono text-4xl md:text-6xl lg:text-8xl text-center">Dr Drill</h1>
          <p className="text-white font-mono text-sm md:text-lg lg:text-xl w-[90%] md:w-[70%] lg:w-[50%] text-center"> {text} </p>
          {dontText && <WorkoutContainer/>}
      </div>

      

    </div>
  );
}
