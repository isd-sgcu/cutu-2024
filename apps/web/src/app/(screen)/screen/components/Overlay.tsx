import Image from "next/image";
import QrCode from "../../display/components/QrCode";
import FootBallSlider from "../../display/components/FootBallSlider";
interface OverLayProps {
    data : {
        status: string;
        tu: number;
        cu: number;
    }
}

const Page = ({data} : OverLayProps) => {
    console.log(data)
    return (  
        <div className="w-full h-full bg-[#3dff3d] text-white text-3xl font-bold flex flex-col justify-between p-[50px]">
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-10">
                    <Image
                        src="user/logo.svg"
                        width={100}
                        height={100}
                        alt="live feedback"
                    />
                    <QrCode size={150} imageUrl='/qrcode.png'/>
                </div>
                <div className="flex flex-col items-center gap-[20px]">
                    <div className="flex flex-col items-center gap-10">
                        <Image
                            src="user/live.svg"
                            width={80}
                            height={80}
                            alt="live feedback"
                        />
                        <span>LIVE FEEDBACK</span>
                    </div>
                    <div className="flex gap-[20px]">
                        <Image
                            src="user/sgcu.svg"
                            width={80}
                            height={80}
                            alt="sgcu"
                        />
                        <Image
                            src="user/isd.svg"
                            width={80}
                            height={80}
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
                            width={120}
                            height={120}
                            alt="cu-team"
                        />
                        <span>#ทีมจุฬาฯ</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Image
                            src="overlay/team-tu.svg"
                            width={120}
                            height={120}
                            alt="tu-team"
                        />
                        <span>#ทีมมธ</span>
                    </div>
                </div>
                <FootBallSlider sliderHeight='[20px]' ballSize={0} data = {data}/>
            </div>
        </div>
    );
}
 

const OverLay = ({data}: OverLayProps) => {
    return (  
        <div className="w-[3840px] h-[1080px] flex">
            <Page data = {data}/>
            <Page data = {data}/>
        </div>
    );
}
 
export default OverLay;