"use client"

import { useEffect, useState } from "react";
import OverLay from "./components/Overlay";
import Display from "./components/Display";
import Cookies from "universal-cookie";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { io } from "socket.io-client";

const Screen = () => {
    const [showedPage, setShowPage] = useState<"overlay" | "display">("overlay");
    

    return (  
        <div>
            {showedPage == "overlay" ? <OverLay /> : <Display />}
            <button className="w-[200px] h-[200px] bg-white" onClick={() => setShowPage(prev => prev == "overlay" ? "display" : "overlay")}>เปลี่ยนหน้า</button>
        </div>
    );
}
 
export default Screen;