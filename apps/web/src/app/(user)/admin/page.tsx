'use client'

import React, { useState } from "react";
import Image from "next/image";
import PopUp from "./components/PopIp";

const page = () => {
  const [isStart, setIsStart] = useState(false);
  const [isShowPopUp, setIsShowPopUp] = useState(false);

  const handleOnClick = () => {
    setIsShowPopUp(!isShowPopUp)
  }

  return (
    <div
      className="w-screen h-screen pt-20"
      style={{
        background: "linear-gradient(to right, #F1678C, #ED1C24, #FBAF44)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {isShowPopUp && <PopUp isStart setIsShowPopUp={setIsShowPopUp} setIsStart={setIsStart} />}
      <div className="h-1/2 flex flex-col justify-center items-center">
        <div className="flex-col space-y-2 flex justify-center items-center mb-4">
          <Image src={"/admin/live.svg"} alt="live" width={50} height={50} />
          <h1 className="text-md text-white">LIVE FEEDBACK</h1>
        </div>

        <Image
          src={"/admin/cu-tu-ball-logo.svg"}
          alt="Cu Tu Ball Logo"
          width={100}
          height={100}
        />
        <h1 className="text-4xl text-white font-bold mt-4">For Admin</h1>
      </div>
      <span className="flex justify-center gap-8 mt-10 text-xl font-bold ">
        <button 
          disabled={isStart} 
          className="bg-white w-1/5 h-20 rounded-full hover:bg-slate-200 disabled:opacity-40"
          onClick={handleOnClick}
        >เริ่มเกมใหม่</button>
        <button 
          disabled={!isStart} 
          className="bg-white w-1/5 h-20 rounded-full hover:bg-slate-200 disabled:opacity-40"
          onClick={handleOnClick}
        >หยุดเกม</button>
      </span>
    </div>
  );
};

export default page;
