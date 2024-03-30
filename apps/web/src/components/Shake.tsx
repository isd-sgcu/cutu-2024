import Image from "next/image"
import Link from "next/link";
import { useState } from "react"

export default function ShakeComponent({
    university,
    count,
    onClick,
}: {
    university: string | string[],
    count: number,
    onClick: () => void,
}) {

    const [isClicked, setIsClicked] = useState(false);

    return(
        <div 
            className="h-full px-[2.5rem] pt-[1.5rem] text-white w-auto"
            style={university == 'cu' ?
                    { background: 'linear-gradient(to bottom, #EE457B 0%, #F1678D 35%, #F6ADCD 90%, #FFFFFF 100%)' } :
                    { background: 'linear-gradient(to bottom, #AA1E23 0%, #F06143 35%, #FBAF44 90%, #FFFFFF 100%)' }
                }
        >
            <Link href="../user" className="flex justify-start">
                <Image src="../shake/arrow-back.svg" alt="arrow-back" width={25} height={25} />                    
            </Link>
            <div className="h-full max-h-[600px] flex flex-col items-center justify-between">
                <Image src="../shake/cu-tu-ball-logo.svg" alt="cu-tu-ball-logo" width={60} height={104} ></Image>
                <Image src={university == 'cu' ? "../shake/chula-logo.svg" : "../shake/tu-logo.svg"} alt="chula-logo" width={65} height={104} ></Image>
                <h1 className="font-bold">{university == 'cu' ? '#ทีมจุฬาฯ' : '#ทีมมธ.'}</h1>
                <p>ร่วมส่งพลังให้ทีมที่คุณเชียร์!</p>
                <div onClick={() => { onClick(); setIsClicked(true);}}>
                    {isClicked ? (
                        <div className="flex flex-col items-center justify-center space-y-2 drop-shadow-lg">
                            <div className="w-44 h-44 bg-cu-pink rounded-full flex justify-center iems-center">
                                <Image src="../shake/pink-shake.svg" alt="pink-shake-icon" width={100} height={100}></Image>
                            </div>
                            <span className="text-white drop-shadow-lg text-lg font-bold">เขย่าเลย!</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-2 drop-shadow-lg">
                            <div className="w-44 h-44 bg-white rounded-full flex justify-center items-center">
                                <Image src="../shake/white-shake.svg" alt="white-shake-icon" width={100} height={100}></Image>
                            </div>
                            <span className="text-white drop-shadow-lg text-lg font-bold">กดเพื่อเริ่มเขย่า!</span>
                        </div>
                    )}
                </div>
                <div className="self-end mb-[-15px]">
                    <Image src="../shake/fire-icon.svg" alt="fire-icon" width={36} height={36}></Image>
                </div>
                <div className="w-full h-[16px] bg-white rounded-[20px] mb-[20px]">
                    <div className={university == 'cu' ? "h-full bg-[#EE477C] rounded-[20px]" : "h-full bg-[#FF6625] rounded-[20px]"}
                        style={{ width: `${Math.min((count / 500) * 100, 100)}%`}} />
                </div>
            </div>
        </div> 
    )
}