"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useState } from "react";
import { io } from "socket.io-client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Cookies from "js-cookie";
import {v4 as uuidv4} from 'uuid';

interface FootBallSliderProps {
  sliderHeight: string;
  ballSize: number;
  setState?: React.Dispatch<React.SetStateAction<"none" | "tu" | "cu">>;
}

const MAX_LENGTH = 1500;

const FootBallSlider = (props: FootBallSliderProps) => {
  const [isStart, setIsStart] = useState(true);
  const [position, setPosition] = useState(0);
  const [tu, setTu] = useState(1);
  const [cu, setCu] = useState(1);
  const [cid, setCid] = useState<string | null>(null);
  let fid: string | null = null;

  const socket = io("wss://api.cutu2024.sgcu.in.th", {
    path: "/api/ws",
    auth: { fid: "1234", name: "hehe", cid: '86ccc208-46ef-488c-acbe-f827629b502d' },
    transports: ['websocket'],
  });

  function onConnect() {
    console.log("connect")
    console.log(socket.id, socket.connected)
  }
  function onDisconnect() {
    console.log("disconnect")
    console.log(socket.id, socket.connected)
  }

  useEffect(() => {
    socket.on("cid", (serverCid) => {
      console.log(serverCid);
      setCid(serverCid);
      Cookies.set("cid", serverCid, { expires: 365 * 100000 });
    });

    socket.on("connect", onConnect);
    socket.on("disconnect", (reason, details) => {
      console.log(reason);

      // the low-level reason of the disconnection, for example "xhr post error"
      console.log(details);
    });

    socket.on("events", (serverCid) => {
      console.log(serverCid);
    });

    socket.on("state", (serverCid) => {
      console.log(serverCid);
    });

    socket.on("scoreboard", (serverCid) => {
      console.log(serverCid);
      const part = serverCid.split(" ");

      const cuScore = parseInt(part[1]);
      const tuScore = parseInt(part[2]);

      setCu(cuScore);
      setTu(tuScore);
      console.log(position, cu, tu);
    });
  }, [])
  useEffect(() => {
    //console.log((tu - cu)/(tu + cu) * MAX_LENGTH)
    setPosition((tu - cu)/(tu + cu) * MAX_LENGTH)
  }, [tu, cu])

  useEffect(() => {
      setCu(1);
      setTu(1);

      if(!props.setState) return;

      if(!isStart){
        ( tu > cu ) ? props.setState('tu') : props.setState('cu')  
      }
      else{
        props.setState('none')
      }
  }, [isStart])

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
