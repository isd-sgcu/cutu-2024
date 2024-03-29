"use client"

import { useState } from "react";
import OverLay from "./components/Overlay";
import Display from "./components/Display";

const Screen = () => {
    const [showedPage, setShowPage] = useState<"overlay" | "display">("display");

    return (  
        <div>
            {showedPage == "overlay" ? <OverLay /> : <Display />}
        </div>
    );
}
 
export default Screen;