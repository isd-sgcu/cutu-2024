"use client"

import { useEffect, useRef, useState } from "react";
import { peekTime, resetTime, tickTime } from "@/utils/timeCounter";
import { getMobileOperatingSystem } from "@/utils/getMobileOperatingSystem";
import ShakeComponent from '../../../../components/Shake';
import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from 'react';

let shaking: { x: number; y: number; z: number } | undefined;

function normalize(x: number, y: number, z: number) {
    const len = Math.hypot(x, y, z);
    return [x / len, y / len, z / len];
}

export default function Shake() {
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
                setCount(count + 1);
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
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ShakeComponent university={university} count={count} onClick={handleRequestMotion}/>
            </Suspense>
        </div>
    );
}