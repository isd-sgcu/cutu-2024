import Image from "next/image";

const OverLay = () => {
    return ( 
        <div className="bg-[#00FF00] w-full h-full text-white text-[50px] font-semibold p-32">
            <div className="flex justify-between">
                <div className="flex flex-col items-center gap-10">
                    <Image
                        src="user/logo.svg"
                        width={240}
                        height={390}
                        alt="live feedback"
                    />
                    <div className="w-[260px] h-[240px] bg-white">qr</div>
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
        </div>
    );
}
 
export default OverLay;