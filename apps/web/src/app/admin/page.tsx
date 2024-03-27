import React from "react";
import Image from "next/image";

const page = () => {
  return (
    <div
      className="w-screen h-screen p-28"
      style={{
        background: "linear-gradient(to right, #F1678C, #ED1C24, #FBAF44)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="h-1/2 flex flex-col justify-center items-center gap-20 pb-10">
        <div className="flex-col space-y-6">
          <Image src={"/admin/live.svg"} alt="live" width={200} height={200} />
          <h1 className="text-3xl text-white">LIVE FEEDBACK</h1>
        </div>

        <Image
          src={"/admin/cu-tu-ball-logo.svg"}
          alt="Cu Tu Ball Logo"
          width={250}
          height={250}
        />
        <h1 className="text-8xl text-white font-medium">For Admin</h1>
      </div>
      <div className="w-full h-1/2 flex justify-center flex-row space-x-60">
        <div className="flex-col w-1/3">
          <div className="bg-display rounded-[2rem] w-full h-3/4 flex justify-center items-center flex-col p-10 shadow-xl">
            <Image
              src={"/admin/display.svg"}
              alt="feedback"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-white rounded-[2rem] w-2/3 px-20 py-10 text-8xl shadow-2xl hover:bg-slate-300 font-medium">
              Display 1
            </button>
          </div>
        </div>
        <div className="flex-col w-1/3">
          <div className="bg-display rounded-[2rem] w-full h-3/4 flex justify-end items-center flex-col p-10 shadow-xl">
            <Image
              src={"/admin/display.svg"}
              alt="feedback"
              width={1000}
              height={1000}
            />
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-white rounded-[2rem] w-2/3 px-20 py-10 text-8xl shadow-2xl hover:bg-slate-300 font-medium">
              Display 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
