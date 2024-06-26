"use client";

import { useEffect, useRef, useState } from "react";
import OverLay from "./components/Overlay";
import Display from "./components/Display";
import Cookies from "universal-cookie";
import { Socket, io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { TransitionGroup, Transition } from "react-transition-group";

const Screen = () => {
  let fid: string | null = null;
  const [showedPage, setShowPage] = useState<"overlay" | "display">("overlay");
  const [data, setData] = useState({
    status: "playing",
    cu: 50,
    tu: 50,
  });
  const cookies = new Cookies(null, { httpOnly: true });
  const lastTickRef = useRef(new Date());
  /*   const lastTimeOutRef = useRef<Timeout>("");
  const adderRef = useRef(10);

  clearTimeout(lastTimeOutRef.current);
  lastTimeOutRef.current = setTimeout(() => {
    setData((prev) => {
      if (prev.cu >= 100 || prev.cu <= 0) {
        adderRef.current *= -1;
      }
      return {
        ...prev,
        cu: prev.cu + adderRef.current,
        tu: prev.tu - adderRef.current,
      };
    });
  }, 1000); */

  // console.log(data);
  //console.log('show: ', showedPage)

  useEffect(() => {
    const handleConnect = (socket: Socket) => {
      console.log("Client has connected to the server!");
      console.log("Subscribing");
      socket.emit("subscribe", "123");
    };

    const handleScoreBoard = (scoreString: string) => {
      const nowTick = new Date();
      if (nowTick.getTime() - lastTickRef.current.getTime() < 1000) return;

      //console.log(scoreString);
      lastTickRef.current = nowTick;
      const parts = scoreString.split(" ");
      //console.log(parts)
      const cuScore = Math.round(parseFloat(parts[1]));
      const tuScore = Math.round(parseFloat(parts[3]));

      //console.log({cuScore, tuScore})
      setData((data) => ({ ...data, cu: cuScore, tu: tuScore }));
    };

    const handleScreen = (screen: string) => {
      console.log(screen);
      setShowPage(screen == "overlay" ? "overlay" : "display");
    };

    const handleCid = (serverCid: string) => {
      try {
        console.log("Received cid from server:", serverCid);
        cookies.set("cid", serverCid);
        console.log("cid cookie set with value:", serverCid);
      } catch (error) {
        console.error("Error handling cid:", error);
      }
    };

    const handleEvents = (events: string) => {
      console.log(events);
      setData((data) => ({ ...data, status: events }));
    };

    const handleDisconnect = () => {
      console.log("The client has disconnected!");
    };

    (async () => {
      fid = cookies.get("fid");
      if (!fid) {
        fid = uuidv4();
        cookies.set("fid", fid);
      }

      const savedCid = cookies.get("cid");

      const extraHeaders: { [key: string]: string } = {
        fid: fid || "",
        name: "john",
      };

      if (savedCid) {
        extraHeaders.cid = savedCid;
      }

      console.log(extraHeaders);

      const socket = io("wss://api.cutu2024.sgcu.in.th", {
        auth: extraHeaders,
        path: "/api/ws",
        transports: ["websocket"],
      });

      socket.on("connect", () => handleConnect(socket));
      socket.on("cid", handleCid);
      socket.on("scoreboard", handleScoreBoard);
      socket.on("disconnect", handleDisconnect);
      socket.on("events", handleEvents);
      socket.on("screen", handleScreen);

      return () => {
        socket?.disconnect();
      };
    })();
  }, []);

  return (
    <div className="bg-[#3dff3d]">
      <TransitionGroup>
        {showedPage == "overlay" ? (
          <Transition key="overlay" timeout={700} classNames="item">
            {(state) => (
              <div
                style={{
                  transition: "opacity 500ms ease",
                  opacity: state == "entered" ? 1 : 0,
                }}
              >
                <OverLay data={data} />
              </div>
            )}
          </Transition>
        ) : (
          <Transition key="display" timeout={700} classNames="item">
            {(state) => (
              <div
                style={{
                  transition: "opacity 500ms ease",
                  opacity: state == "entered" ? 1 : 0,
                }}
              >
                <Display data={data} />
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
      {/* <button
        className="w-[200px] h-[200px] bg-white"
        onClick={() =>
          setShowPage((prev) => (prev == "overlay" ? "display" : "overlay"))
        }
      >
        เปลี่ยนหน้า
      </button> */}
    </div>
  );
};

export default Screen;
