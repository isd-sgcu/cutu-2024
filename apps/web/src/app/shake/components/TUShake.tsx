import Image from "next/image"

export default function TUShake() {
    return (
        <div className="flex flex-col gap-5 p-[2.5rem] text-white items-center justify-center min-h-screen bg-gradient-to-b from-[#AA1E23] to-[#FBAF44]">
            <Image src="/cu-tu-ball-logo.svg" alt="cu-tu-ball-logo" width={65} height={104} ></Image>
            <Image src="/tu-logo.svg" alt="chula-logo" width={65} height={104} ></Image>
            <h1>#ทีมมธ.</h1>
            <p>ร่วมส่งพลังให้ทีมที่คุณเชียร์!</p>
            <Image src="/shake-icon.svg" alt="shake-icon" width={226} height={233}></Image>
            <div className="flex flex-row">
                <h1>เขย่า</h1><p>โทรศัพท์ของคุณ!</p>
            </div>
            <div className="self-end">
                <Image src="/fire-icon.svg" alt="fire-icon" width={36} height={36}></Image>
            </div>
            <div className="w-full h-[16px] bg-white rounded-[20px]">
                <div className="h-full bg-[#FF6625] rounded-[20px]" style={{ width: `20%` }}></div>
            </div>
        </div>
    )
}