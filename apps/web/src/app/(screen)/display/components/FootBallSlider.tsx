'use client';
import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { Socket, io } from "socket.io-client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "universal-cookie";

interface FootBallSliderProps {
  sliderHeight: string;
  ballSize: number;
  setState?: React.Dispatch<React.SetStateAction<"none" | "tu" | "cu">>;
  data : {
    status: string;
    tu: number;
    cu: number;
  };
}


const MAX_LENGTH = 1300;
const cookies = new Cookies(null, { path: '/' });

const FootBallSlider = (props: FootBallSliderProps) => {
  const [position, setPosition] = useState(0);

  const { status, tu, cu } = props.data;

  useEffect(() => {
      const handleChangePosition= (tu: number, cu: number) => {
        const position = (tu - cu)/(tu + cu)*MAX_LENGTH;
        setPosition(position)
      }
      handleChangePosition(tu, cu);
  }, [tu, cu, status]);


  return (
    <>
      <div className={`bg-white text-black flex flex-row justify-between items-center shadow-lg h-[80px] rounded-full p-4 w-full`}>
        <div className="text-4xl bg-gradient-to-l from-cu-light-pink via-cu-pink to-cu-dark-pink text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมจุฬา
        </div>
        <div className="flex items-center justify-center space-x-36 relative">
          <Image src={'/slider/shake.svg'}  alt="shake" width = {96} height={96} />
          <div className={`absolute w-full`} style={{ left: `${position}px`, transition: 'left 0.3s ease' }}>
            <Image src={'slider/ball.svg'} alt="football" width={150} height={150}/>
          </div>
          <Image src={'/slider/shake.svg'} alt="shake" width={96} height={96}/>
        </div>
        <div className="text-4xl bg-gradient-to-r from-tu-light-orange via-tu-orange to-tu-dark-orange text-white flex items-center justify-center px-4 py-2 rounded-full h-full w-5/12">
          #ทีมมธ.
        </div>
      </div>
    </>
  );
};

export default FootBallSlider;
