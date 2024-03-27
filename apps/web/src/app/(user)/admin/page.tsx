import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div
      className="w-screen h-screen p-1"
      style={{
        background: "linear-gradient(to right, #F1678C, #ED1C24, #FBAF44)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
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
        <h1 className="text-4xl text-white font-medium mt-4">For Admin</h1>
      </div>
      <div className="w-full h-1/2 flex justify-center flex-row space-x-10">
        <div className="flex-col w-1/3">
          <div className="bg-display rounded-[2rem] w-full h-[200px] md:h-1/2 lg:h-3/4 flex justify-center items-center flex-col p-3 md:p-10 shadow-xl">
            <Image
              src={"/admin/display.svg"}
              alt="feedback"
              width={500}
              height={500}
            />
          </div>
          <div className="flex justify-center mt-5">
            <button className="bg-white rounded-[2rem] w-2/3 px-2 py-2 text-sm md:text-xl shadow-2xl hover:bg-slate-300 font-medium">
              Display 1
            </button>
          </div>
        </div>
        <div className="flex-col w-1/3">
          <div className="bg-display rounded-[2rem] w-full h-[200px] md:h-1/2 lg:h-3/4 flex justify-end items-center flex-col p-3 md:p-10 shadow-xl">
            <Image
              src={"/admin/display.svg"}
              alt="feedback"
              width={500}
              height={500}
            />
          </div>

          <div className="flex justify-center mt-5">
            <button className="bg-white rounded-[2rem] w-2/3 px-2 py-2 text-sm md:text-xl shadow-2xl hover:bg-slate-300 font-medium">
              Display 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
