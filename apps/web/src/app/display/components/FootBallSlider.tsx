"use client";
import React from "react";
import Image from "next/image";
import ballIcon from "../../../public/slider/ball.svg";
import shakeIcon from "../../../public/slider/shake.svg";
import { useState } from "react";

const FootBallSlider = () => {
  const [position, setPosition] = useState(0);

  return (
    <>
      <div className="bg-white text-black flex flex-row justify-between items-center shadow-lg h-48 rounded-full p-4 w-full">
        <div className="text-6xl bg-gradient-to-l from-cu-light-pink via-cu-pink to-cu-dark-pink flex-grow text-white flex items-center justify-center px-4 py-2 rounded-full h-full ">
          #ทีมจุฬา
        </div>
        <div className="flex items-center justify-center space-x-36 relative">
          <Image src={shakeIcon}  alt="shake" className="w-24 h-24"/>
          <div className="absolute w-96 h-96" style={{ left: `${position}px`, transition: 'left 0.3s ease' }}>
            <Image src={ballIcon} alt="football"  className="w-full h-full"/>
          </div>
          <Image src={shakeIcon} alt="shake" className="w-24 h-24"/>
        </div>
        <div className="text-6xl bg-gradient-to-r from-tu-light-orange via-tu-orange to-tu-dark-orange flex-grow text-white flex items-center justify-center px-4 py-2 rounded-full h-full ">
          #ทีมมธ.
        </div>
      </div>
    </>
  );
};

export default FootBallSlider;
