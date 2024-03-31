"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";

interface FootBallSliderProps {
  sliderHeight: string;
  ballSize: number;
  setState?: React.Dispatch<React.SetStateAction<"none" | "tu" | "cu">>;
  data: {
    status: string;
    tu: number;
    cu: number;
  };
}


const FootBallSlider = (props: FootBallSliderProps) => {
  //console.log(position)
  const { status, cu } = props.data;
  const [lastTick , setLastTick ] = useState(new Date())
  const [ lastCu, setLastCu ] = useState(50)

  
  const position = useMemo(() => {
    if (status == "waiting" || status == "stop") {
      return 50;
    }
    
    const nowTick = new Date()
    if(nowTick.getTime() - lastTick.getTime() <  500){
      //console.log(nowTick.getTime() , lastTick.getTime())
      return lastCu 
    }
    
    setLastCu(cu)
    setLastTick(nowTick)
    return cu;
  }, [cu, status])
  
  //const position = 0
  //console.log(position)
  return (
    <div className="relative px-[75px]">
      <div
        className={`bg-white text-black flex flex-row justify-between items-center shadow-lg h-[80px] rounded-full p-4 w-full`}
      >
        <div className="text-4xl bg-gradient-to-l from-cu-light-pink via-cu-pink to-cu-dark-pink text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมจุฬา
        </div>
        <div className="flex items-center justify-center space-x-36 relative">
          <Image src={"/slider/shake.svg"} alt="shake" width={96} height={96} />
          <Image src={"/slider/shake.svg"} alt="shake" width={96} height={96} />
        </div>
        <div className="text-4xl bg-gradient-to-r from-tu-light-orange via-tu-orange to-tu-dark-orange text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมมธ.
        </div>

        <div
          className={`absolute`}
          style={{
            left: `${position}%`,
            transform: `translateX(-${position}%)`,
            transition: "all 0.5s ease",
          }}
        >
          <div className="relative w-[250px] h-[250px]"><Image
            src={"slider/ball.svg"}
            fill
            objectFit="contain"
            alt="football"
          /></div>
        </div>
      </div>
    </div>
  );
};

export default FootBallSlider;
