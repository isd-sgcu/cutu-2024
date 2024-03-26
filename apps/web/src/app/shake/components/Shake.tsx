import Image from "next/image"
import { useState } from "react"

export default function ShakeComponent({
    university,
    count,
    onClick,
}: {
    university: string,
    count: number,
    onClick: () => void,
}) {

    const [isClicked, setIsClicked] = useState(false);

    return(
        <div className="flex flex-col gap-5 p-[2.5rem] text-white items-center justify-center min-h-screen"
            style={university == 'cu' ?
                { background: 'linear-gradient(to bottom, #EE457B, #F1678D, #F6ADCD, #FFFFFF)' } :
                { background: 'linear-gradient(to bottom, #AA1E23, #F06143, #FBAF44, #FFFFFF)' }
            }
        >
            <Image src="/cu-tu-ball-logo.svg" alt="cu-tu-ball-logo" width={65} height={104} ></Image>
            <Image src={university == 'cu' ? "/chula-logo.svg" : "/tu-logo.svg"} alt="chula-logo" width={65} height={104} ></Image>
            <h1 className="font-bold">{university == 'cu' ? '#ทีมจุฬาฯ' : '#ทีมมธ.'}</h1>
            <p>ร่วมส่งพลังให้ทีมที่คุณเชียร์!</p>

            <div onClick={() => setIsClicked(true)}>
                {isClicked ? (
                    <div onClick={onClick} className="text-center flex flex-col gap-[10px]">
                        <div className={university === 'cu' ? "bg-[#F1678D] w-[245px] h-[245px] rounded-full flex items-center justify-center" : 
                        "bg-[#EF5644] w-[245px] h-[245px] rounded-full flex items-center justify-center" }>
                            <Image src="/shake-icon.svg" alt="shake-icon" width={153} height={158}></Image>
                        </div>
                        <h1 className="font-bold text-[24px] drop-shadow-md">เขย่าเลย!</h1>
                    </div>
                ) : (
                    <div className="text-center flex flex-col gap-[10px]">
                        <div className="bg-white w-[245px] h-[245px] rounded-full flex items-center justify-center">
                            <Image src="/shake-icon-black.svg" alt="shake-icon" width={153} height={158}></Image>
                        </div>
                        <h1 className="font-bold text-[24px] drop-shadow-md">กดเพื่อเริ่มเขย่า!</h1>
                    </div>
                )}
            </div>

            <div className="self-end">
                <Image src="/fire-icon.svg" alt="fire-icon" width={36} height={36}></Image>
            </div>
            <div className="w-full h-[16px] bg-white rounded-[20px] mb-[50px]">
                <div className={university == 'cu' ? "h-full bg-[#EE477C] rounded-[20px]" : "h-full bg-[#FF6625] rounded-[20px]"} 
                    style={{ width: `${(count / 1000) * 100}%`}} />
            </div>
        </div>
    )
}