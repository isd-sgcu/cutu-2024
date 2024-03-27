import Image from "next/image";
import FootBallSlider from "../display/components/FootBallSlider";
import QrCode from "../display/components/QrCode";

const OverLay = () => {
    return ( 
        <div className="bg-[#00FF00] w-screen h-screen text-white text-[50px] font-semibold p-32 flex flex-col justify-between">
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-10">
                    <Image
                        src="user/logo.svg"
                        width={200}
                        height={360}
                        alt="live feedback"
                    />
                    <QrCode size="[260px]" />
                </div>
                <div className="flex flex-col items-center gap-[50px]">
                    <div className="flex flex-col items-center gap-10">
                        <Image
                            src="user/live.svg"
                            width={150}
                            height={150}
                            alt="live feedback"
                        />
                        <span>LIVE FEEDBACK</span>
                    </div>
                    <div className="flex gap-[40px]">
                        <Image
                            src="user/sgcu.svg"
                            width={140}
                            height={140}
                            alt="sgcu"
                        />
                        <Image
                            src="user/isd.svg"
                            width={140}
                            height={140}
                            alt="isd"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between">
                    <div>
                        <Image
                            src="overlay/team-cu.svg"
                            width={170}
                            height={140}
                            alt="cu-team"
                        />
                        <span>#ทีมจุฬาฯ</span>
                    </div>
                    <div>
                        <Image
                            src="overlay/team-tu.svg"
                            width={170}
                            height={140}
                            alt="tu-team"
                        />
                        <span>#ทีมมธ</span>
                    </div>
                </div>
                <FootBallSlider sliderHeight='32' ballSize='64' />
            </div>
        </div>
    );
}
 
export default OverLay;