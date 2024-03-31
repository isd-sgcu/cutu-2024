"use client";
import React, { useMemo, useRef, useState } from "react";
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
  /*   const lastCu = useRef(50)
  const lastTick = useRef(new Date()) */

  const position = useMemo(() => {
    if (status == "waiting" || status == "stop") {
      return 50;
    }
    /*     
    const nowTick = new Date()
    if(nowTick.getTime() - lastTick.current.getTime() <  500){
      //console.log(nowTick.getTime() , lastTick.getTime())
      return lastCu;
    }
    
    lastCu.current = cu
    lastTick.current = nowTick */
    return cu;
  }, [cu, status]);

  // const position = 10;
  //console.log(position)
  return (
    <div className="relative px-[75px]">
      <div className="relative">
        <div className={`h-[80px] rounded-full p-4 w-full`}>
          {/* Don't Delete This */}
        </div>

        <div
          className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-white h-[80px] rounded-l-full z-20 p-4 flex flex-col justify-center items-start"
          style={{
            width: `calc(${position}%)`,
            transition: "all 0.5s ease",
          }}
        >
          <div
            className="text-4xl bg-gradient-to-l from-cu-light-pink via-cu-pink to-cu-dark-pink text-white flex items-center justify-center px-4 py-2 rounded-full h-full"
            style={{
              width: `calc(100% - 220px)`,
            }}
          >
            <div
              className="transition-opacity duration-150"
              style={{
                opacity: position > 30 ? 1 : 0,
              }}
            >
              #ทีมจุฬา
            </div>
          </div>
        </div>
        <div
          className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-white h-[80px] rounded-r-full z-10 p-4 flex flex-col justify-center items-end"
          style={{
            width: `calc(${100 - position}%)`,
            transition: "all 0.5s ease",
          }}
        >
          <div
            className="text-4xl bg-gradient-to-r from-tu-light-orange via-tu-orange to-tu-dark-orange text-white flex items-center justify-center px-4 py-2 rounded-full h-full"
            style={{
              width: `calc(100% - 220px)`,
            }}
          >
            <div
              className="transition-opacity duration-150"
              style={{
                opacity: position < 70 ? 1 : 0,
              }}
            >
              #ทีมมธ.
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-1/2 z-30`}
        style={{
          left: `${position}%`,
          transform: `translate(-${position}%, -50%)`,
          transition: "all 0.5s ease",
        }}
      >
        <div className="relative">
          <div className="relative w-[250px] h-[250px]">
            <Image
              src={"slider/ball.svg"}
              fill
              objectFit="contain"
              alt="football"
            />
          </div>

          <div
            className="absolute top-1/2 -left-28 transform -translate-y-1/2 transition-opacity duration-150"
            style={{
              opacity: position < 20 ? 0 : 1,
            }}
          >
            <div className="relative w-24 h-24">
              <Image src={"/slider/shake.svg"} alt="shake" fill />
            </div>
          </div>
          <div
            className="absolute top-1/2 -right-28 transform -translate-y-1/2 transition-opacity duration-150"
            style={{
              opacity: position > 80 ? 0 : 1,
            }}
          >
            <div className="relative w-24 h-24">
              <Image src={"/slider/shake.svg"} alt="shake" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootBallSlider;
