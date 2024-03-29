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
}

const MAX_LENGTH = 1300;

const FootBallSlider = (props: FootBallSliderProps) => {
  const [isStart, setIsStart] = useState(true);
  const [position, setPosition] = useState(0);
  const [tu, setTu] = useState(1);
  const [cu, setCu] = useState(1);

  

  useEffect(() => {
      const handleConnect = () => {
          console.log('Client has connected to the server!');
      };

      const handleScoreBoard = (scoreString: string) => {
        console.log(scoreString);
        const parts = scoreString.split(" ");
        const cuScore = parseInt(parts[1], 10);
        const tuScore = parseInt(parts[3], 10);
        console.log('cu:', cuScore, 'tu:', tuScore)
        setCu(cuScore);
        setTu(tuScore);
        const position = (tuScore - cuScore)/(tuScore + cuScore)*MAX_LENGTH;
        setPosition(position)
        console.log(cu, tu, position)
      }

      const handleCid = (serverCid: string) => {
          try {
              console.log('Received cid from server:', serverCid);
              cookies.set('cid', serverCid);
              console.log('cid cookie set with value:', serverCid);
          } catch (error) {
              console.error('Error handling cid:', error);
          }
      };

      const handleDisconnect = () => {
          console.log('The client has disconnected!');
      };

      (async () => {
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          fid = result.visitorId;
          const savedCid = cookies.get('cid');
          
          const extraHeaders: { [key: string]: string } = {
              fid: fid,
              name: 'pun1'
          };

          if (savedCid) {
              extraHeaders.cid = savedCid;
          }
          socket = io('wss://api.cutu2024.sgcu.in.th', { 
              auth: extraHeaders,
              path: "/api/ws", 
              transports: ['websocket'],
          });

          socket.on('connect', handleConnect);
          socket.on('cid', handleCid);
          socket.on('scoreboard', handleScoreBoard)
          socket.on('disconnect', handleDisconnect);
          return () => {
              socket?.disconnect();
          };
      })();
  }, []);

  // useEffect(() => {
  //     setCu(1);
  //     setTu(1);
  //     if(props.setState && !isStart){
  //       if(tu > cu){
  //         props.setState('tu')
  //       }
  //       else{
  //         props.setState('cu')
  //       }
  //     }
  // }, [isStart])

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
