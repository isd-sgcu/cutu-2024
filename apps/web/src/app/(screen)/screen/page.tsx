"use client"

import { useEffect, useState } from "react";
import OverLay from "./components/Overlay";
import Display from "./components/Display";
import Cookies from "universal-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Socket, io } from "socket.io-client";

const Screen = () => {
    const [showedPage, setShowPage] = useState<"overlay" | "display">("overlay");
    const [ data, setData ] = useState({
        status: "waiting",
        cu: 0,
        tu: 0
    })
    const cookies = new Cookies( null, { path: "/" } )
    //console.log(data)

    useEffect(() => {
        const handleConnect = (socket: Socket) => {
            console.log('Client has connected to the server!');
            setTimeout(() => {
                console.log('Subscribing');
                socket.emit('subscribe', '123');
            }, 3000);
        };

        const handleScoreBoard = (scoreString: string) => {
            //console.log(scoreString);
            const parts = scoreString.split(" ");
            //console.log(parts)
            const cuScore = Math.round(parseFloat(parts[1]));
            const tuScore = Math.round(parseFloat(parts[3]));
            
            //console.log({cuScore, tuScore}  )
            setData({...data, cu: cuScore, tu: tuScore})
        }

        const handleScreen = (screen: string) => {
            //console.log(screen);
            //setShowPage('full' ? 'overlay' : 'display')
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
            setData({...data, status: events})
        }

        const handleDisconnect = () => {
            console.log('The client has disconnected!');
        };

        (async () => {
            const savedCid = cookies.get('cid');

            if(!cookies.get('fid')){
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                const fid = result.visitorId;
                cookies.set('fid', fid)
            }

            const fid = cookies.get('fid')
            
            const extraHeaders: { [key: string]: string } = {
                fid: fid,
                name: 'pun1'
            };

            if (savedCid) {
                extraHeaders.cid = savedCid;
            }

            console.log(extraHeaders)

            const socket = io('wss://api.cutu2024.sgcu.in.th', { 
                auth: extraHeaders,
                path: "/api/ws", 
                transports: ['websocket'],
            });

            socket.on('connect', () => handleConnect(socket))
            socket.on('cid', handleCid);
            socket.on('scoreboard', handleScoreBoard)
            socket.on('disconnect', handleDisconnect);
            socket.on('events', handleEvents);
            socket.on('screen', handleScreen);
            
            
            return () => {
                socket?.disconnect();
            };
        })();
    }, []);   

    return (  
        <div>
            {showedPage == "overlay" ? <OverLay data={data}/> : <Display data={data}/>}
            <button className="w-[200px] h-[200px] bg-white" onClick={() => setShowPage(prev => prev == "overlay" ? "display" : "overlay")}>เปลี่ยนหน้า</button>
        </div>
    );
}
 
export default Screen;