'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import QrCode from '@/app/(screen)/display/components/QrCode';
import Cookies from "universal-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { io } from "socket.io-client";

const cookies = new Cookies(null, { path: '/' });

const Display= () => {
  const [state, setState] = useState<'cu' | 'tu' | 'none'>('none');
  const [isStart, setIsStart] = useState(false);
  const [tu, setTu] = useState(62);
  const [cu, setCu] = useState(48);

  

  useEffect(() => {
      const handleConnect = () => {
          console.log('Client has connected to the server!');
      };

      const handleScoreBoard = (scoreString: string) => {
        console.log(scoreString);
        // TODO : handle scoreboard
        // NOTE: expect the the score to be percentage
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

      const handleEvents = (events: string) => {
        console.log(events)
        setIsStart(events != "stop")
        setCu(1);
        setTu(1);
        if(setState != undefined){
          if(events == "stop"){
            tu > cu ? setState('tu') :  setState('cu')
          }
          else{
            setState('none')
          }
        }
      }

      const handleDisconnect = () => {
          console.log('The client has disconnected!');
      };

      (async () => {
          const fp = await FingerprintJS.load();
          const result = await fp.get();
          const fid = result.visitorId;
          const savedCid = cookies.get('cid');
          
          const extraHeaders: { [key: string]: string } = {
              fid: fid,
              name: 'pun1'
          };

          if (savedCid) {
              extraHeaders.cid = savedCid;
          }
          const socket = io('wss://api.cutu2024.sgcu.in.th', { 
              auth: extraHeaders,
              path: "/api/ws", 
              transports: ['websocket'],
          });

          socket.on('connect', handleConnect);
          socket.on('cid', handleCid);
          socket.on('scoreboard', handleScoreBoard)
          socket.on('disconnect', handleDisconnect);
          socket.on('events', handleEvents);
          return () => {
              socket?.disconnect();
          };
      })();
  }, []);
  return (
    <div className='w-auto h-screen flex'>
        {state == 'none' &&
            <>
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-cu-dark-pink via-cu-pink to-cu-light-pink p-10 space-y-10'>
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/chula-logo.svg' width={200} height={244} alt='logo' />
                            <span className='text-5xl font-semibold text-white'>#ทีมจุฬาฯ</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '20rem' }}>{cu}%</div>
                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                            <QrCode size={150} imageUrl='/qrcode.png'/>
                            <div className='w-52 h-48 rounded-3xl flex items-center justify-center flex-col space-y-1'>
                                <Image src='/shake/pink-shake.svg' width={100} height={100} alt='shake' />
                                <span className='text-3xl text-white font-semibold text-center'>มาร่วมกันเขย่าเลย!</span>
                            </div>
                    </div>
                </div>
                
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-tu-dark-orange via-tu-orange to-tu-light-orange p-10 space-y-10'>
                        
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/tu-logo.svg' width={200} height={244} alt='logo' />
                            <span className='text-5xl font-semibold text-white'>#ทีมมธ</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '20rem' }}>{tu}%</div>
                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                            <div className='w-52 h-48 rounded-3xl flex items-center justify-center flex-col space-y-2'>
                                <Image src='/shake/pink-shake.svg' width={100} height={100} alt='shake' />
                                <span className='text-3xl text-white font-semibold text-center'>มาร่วมกันเขย่าเลย!</span>
                            </div>
                            <QrCode size={150} imageUrl='/qrcode.png'/>
                    </div>
                </div>
            </>
        }
        {/*TODO: implement winning and losing */}
        {/* {state !== 'none' && <div className='text-[200px] font-bold text-white mt-[200px] [text-shadow:_1px_1px_1px_rgb(0_0_0)]'>Winner</div>}

        {state == 'tu' && 
                <Image 
                    src='/user/tu-component.svg'
                    height={800}
                    width={800}
                    className='mx-auto my-auto'
                    alt='tu'
                />
        }

        {state == 'cu' &&
                <Image 
                    src='/user/cu-component.svg'
                    height={800}
                    width={800}
                    className='mx-auto my-auto'
                    alt='cu'
                />
        } */}
    </div>
  )
}

export default Display;
