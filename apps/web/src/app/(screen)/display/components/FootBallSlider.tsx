"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

interface FootBallSliderProps {
  sliderHeight: string;
  ballSize: number;
}

const FootBallSlider = (props: FootBallSliderProps) => {
  const [position, setPosition] = useState(0);

  return (
    <>
      <div className={`bg-white text-black flex flex-row justify-between items-center shadow-lg h-${props.sliderHeight} rounded-full p-4 w-full`}>
        <div className="text-6xl bg-gradient-to-l from-cu-light-pink via-cu-pink to-cu-dark-pink text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมจุฬา
        </div>
        <div className="flex items-center justify-center space-x-36 relative">
          <Image src={'/slider/shake.svg'}  alt="shake" width = {96} height={96} />
          <div className={`absolute w-full`} style={{ left: `${position}px`, transition: 'left 0.3s ease' }}>
            <Image src={'slider/ball.svg'} alt="football" width={props.ballSize} height={props.ballSize}/>
          </div>
          <Image src={'/slider/shake.svg'} alt="shake" width={96} height={96}/>
        </div>
        <div className="text-6xl bg-gradient-to-r from-tu-light-orange via-tu-orange to-tu-dark-orange text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมมธ.
        </div>
      </div>
    </>
  );
};

export default FootBallSlider;
