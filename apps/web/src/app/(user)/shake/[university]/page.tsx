"use client"

import { useEffect, useRef, useState } from "react";
import { peekTime, resetTime, tickTime } from "@/utils/timeCounter";
import { getMobileOperatingSystem } from "@/utils/getMobileOperatingSystem";
import ShakeComponent from '../../../../components/Shake';
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from 'react';
import { io, Socket } from "socket.io-client";
import Cookies from 'universal-cookie';
import { v4 as uuidv4 } from 'uuid';
let shaking: { x: number; y: number; z: number } | undefined;

function normalize(x: number, y: number, z: number) {
    const len = Math.hypot(x, y, z);
    return [x / len, y / len, z / len];
}

export default function Shake() {
    let fid: string | null = null;
    const cookies = new Cookies();
    const [ socketState, setSocketState ] = useState<Socket | null>(null)    

    /* const temp = setTimeout(() => {
        setCount(prevCount => {
            const newCount = prevCount + 1;
            if (socketState?.connected) {
                socketState.emit("submit", `${university} 1`);
            }
            return newCount;
        });
    }, 100)  */

    useEffect(() => {
        const handleConnect = () => {
            console.log('Client has connected to the server!');
        };

        const handleCid = (serverCid: string) => {
            console.log('woo');
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
            fid = cookies.get('fid');
            if (!fid) {
                fid = uuidv4(); 
                cookies.set('fid', fid);
            }


            const savedCid = cookies.get('cid');
            
            const extraHeaders: { [key: string]: string } = {
                fid: fid || '',
                name: 'john'
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
            socket.on('disconnect', handleDisconnect);
            setSocketState(socket)
            return () => {
                socket?.disconnect();
            };
        })();
    }, []);

    const [motion1, setMotion1] = useState({
        x: 0,
        y: 0,
        z: 0,
    });

    const motion2 = useRef({
        x: 0,
        y: 0,
        z: 0,
    });

    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const university = useParams().university || 'cu'

    useEffect(() => {
        const hypot = Math.hypot(motion1.x, motion1.y, motion1.z);

        if (hypot > 30) {
            if (shaking) {
                const [a, b, c] = normalize(motion1.x, motion1.y, motion1.z);
                const [d, e, f] = normalize(shaking.x, shaking.y, shaking.z);
                // check if [a,b,c] and [d,e,f] are pointing to the same direction by using dot product
                if (Math.abs(a * d + b * e + c * f) < 0.3) {
                    shaking = undefined;
                }
            }
            if (!shaking) {
                shaking = {
                    x: motion1.x,
                    y: motion1.y,
                    z: motion1.z,
                };
                setCount(prevCount => {
                    const newCount = prevCount + 1;
                    if (socketState?.connected) {
                        socketState.emit("submit", `${university} 1`);
                    }
                    return newCount;
                });
                tickTime();
                setTime(Math.round(peekTime()));
            }
        } else if (hypot < 20) {
            shaking = undefined;
        }

        // document.querySelector("#debug")!.textContent = `${Math.round(max)}`;

        // Update new position
        motion2.current = {
            x: motion1.x,
            y: motion1.y,
            z: motion1.z,
        };
    }, [motion1, motion2.current]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Math.round(peekTime()));
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleRequestMotion = async () => {
        const mobile = getMobileOperatingSystem();
        if (mobile === "iOS") {
            if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
                (DeviceMotionEvent as any)
                    .requestPermission()
                    .then((permissionState: any) => {
                        if (permissionState === "granted") {
                            window.addEventListener("devicemotion", (e: any) => {
                                setMotion1({
                                    x: e.accelerationIncludingGravity.x,
                                    y: e.accelerationIncludingGravity.y,
                                    z: e.accelerationIncludingGravity.z,
                                });
                            });
                        }
                    })
                    .catch(console.error);
            } else {
                // handle regular non iOS 13+ devices
                console.log("Not Supported");
            }
        } else {
            window.addEventListener("devicemotion", (e: any) => {
                setMotion1({
                    x: e.accelerationIncludingGravity.x,
                    y: e.accelerationIncludingGravity.y,
                    z: e.accelerationIncludingGravity.z,
                });
            });
        }
    };

    return (
        <>
            <Suspense fallback={<div>Loading...</div>} >
                <ShakeComponent university={university} count={count} onClick={handleRequestMotion}/>
            </Suspense>
        </>
    );
}
