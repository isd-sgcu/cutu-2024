"use client"

import { useEffect, useState } from "react";
import OverLay from "./components/Overlay";
import Display from "./components/Display";
import Cookies from "universal-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { io } from "socket.io-client";

const Screen = () => {
    const [showedPage, setShowPage] = useState<"overlay" | "display">("overlay");
    const [ data, setData ] = useState({
        status: "none",
        cu: 10,
        tu: 0
    })
    const cookies = new Cookies( null, { path: "/" } )


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
            setData({...data, status: events})
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
        <div>
            {showedPage == "overlay" ? <OverLay /> : <Display />}
            <button className="w-[200px] h-[200px] bg-white" onClick={() => setShowPage(prev => prev == "overlay" ? "display" : "overlay")}>เปลี่ยนหน้า</button>
        </div>
    );
}
 
export default Screen;