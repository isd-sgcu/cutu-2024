import Image from "next/image";
import QrCode from "../../display/components/QrCode";
import FootBallSlider from "../../display/components/FootBallSlider";

const Page = () => {
    return (  
        <div className="w-[1920px] h-[1080px] bg-[#3dff3d] text-white">
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-10">
                    <Image
                        src="user/logo.svg"
                        width={70}
                        height={70}
                        alt="live feedback"
                    />
                    <QrCode size={100} imageUrl='/qrcode.png'/>
                </div>
                <div className="flex flex-col items-center gap-[50px]">
                    <div className="flex flex-col items-center gap-10">
                        <Image
                            src="user/live.svg"
                            width={50}
                            height={50}
                            alt="live feedback"
                        />
                        <span>LIVE FEEDBACK</span>
                    </div>
                    <div className="flex gap-[40px]">
                        <Image
                            src="user/sgcu.svg"
                            width={120}
                            height={120}
                            alt="sgcu"
                        />
                        <Image
                            src="user/isd.svg"
                            width={120}
                            height={120}
                            alt="isd"
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between mb-4">
                    <div className="flex flex-col items-center">
                        <Image
                            src="overlay/team-cu.svg"
                            width={140}
                            height={140}
                            alt="cu-team"
                        />
                        <span>#ทีมจุฬาฯ</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="overlay/team-tu.svg"
                            width={140}
                            height={140}
                            alt="tu-team"
                        />
                        <span>#ทีมมธ</span>
                    </div>
                </div>
                <FootBallSlider sliderHeight='[50px]' ballSize={250} />
            </div>
        </div>
    );
}
 

const overlay = () => {
    return (  
        <div className="">
            <Page />
        </div>
    );
}
 
export default overlay;