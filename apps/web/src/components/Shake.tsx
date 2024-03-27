import Image from "next/image"
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
            className="h-full px-[2.5rem] pt-[1.5rem] text-white"
            style={university == 'cu' ?
                    { background: 'linear-gradient(to bottom, #EE457B 0%, #F1678D 35%, #F6ADCD 90%, #FFFFFF 100%)' } :
                    { background: 'linear-gradient(to bottom, #AA1E23 0%, #F06143 35%, #FBAF44 90%, #FFFFFF 100%)' }
                }
        >
            <div className="h-full max-h-[600px] flex flex-col items-center justify-between">
                <Image src="shake/cu-tu-ball-logo.svg" alt="cu-tu-ball-logo" width={60} height={104} ></Image>
                <Image src={university == 'cu' ? "shake/chula-logo.svg" : "shake/tu-logo.svg"} alt="chula-logo" width={65} height={104} ></Image>
                <h1 className="font-bold">{university == 'cu' ? '#ทีมจุฬาฯ' : '#ทีมมธ.'}</h1>
                <p>ร่วมส่งพลังให้ทีมที่คุณเชียร์!</p>
                <div onClick={() => setIsClicked(true)}>
                    {isClicked ? (
                        <Image src="shake/pink-shake.svg" alt="pink-shake-icon" width={150} height={150}></Image>
                    ) : (
                        <Image src="shake/white-shake.svg" alt="white-shake-icon" width={150} height={150}></Image>
                    )}
                </div>
                <div className="self-end mb-[-15px]">
                    <Image src="shake/fire-icon.svg" alt="fire-icon" width={36} height={36}></Image>
                </div>
                <div className="w-full h-[16px] bg-white rounded-[20px] mb-[20px]">
                    <div className={university == 'cu' ? "h-full bg-[#EE477C] rounded-[20px]" : "h-full bg-[#FF6625] rounded-[20px]"}
                        style={{ width: `${(count / 700) * 100}%`}} />
                </div>
            </div>
        </div>
    )
}