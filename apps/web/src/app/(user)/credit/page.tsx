import Image from "next/image";

const Credit = () => {
    return ( 
        <div 
            className="h-full text-white text-[14px] font-light pt-12 pb-8 [text-shadow:_0px_0px_2px_#FFFFF]"
            style={{ background: 'linear-gradient(to bottom, #F1678C, #EE457B, #ED1C24, #FBAF44)' }}
        >
            <main className="mx-auto h-full flex flex-col items-center">
                <header className="font-bold flex flex-col items-center border-b-[1.6px] w-[180px] text-xl pb-4 mb-4">
                    <Image 
                        src="credit/contact.svg" alt="pink-shake-icon" 
                        width={40} 
                        height={40} 
                    />
                    <h1>Credits</h1>
                </header>
                <div className="flex flex-col justify-between h-full max-h-[420px]">
                    <section className="flex flex-col items-center">
                        <h2 className="font-bold mb-1">พัฒนาโดย</h2>
                        <span className="text-center">
                            ฝ่ายพัฒนาระบบสารสนเทศ <br/> องค์การบริหารสโมสรนิสิต <br/> จุฬาลงกรณ์มหาวิทยาลัย
                        </span>
                    </section>
                    <section className="flex flex-col items-center">
                        <h2 className="font-bold mb-1">Project Manager</h2>
                        <ul className="flex flex-col items-center">
                            <li>ปณิธิ มักเที่ยงตรง</li>
                        </ul>
                    </section>
                    <section className="flex flex-col items-center">
                        <h2 className="font-bold mb-1">UX/UI Designer</h2>
                        <ul className="flex flex-col items-center">
                            <li>พิชญา พูลเพียร</li>
                        </ul>
                    </section>
                    <section className="flex flex-col items-center">
                        <h2 className="font-bold mb-1">Developers</h2>
                        <ul className="flex flex-col items-center">
                            <li>ธนฤต ตรีมหาฤกษ์</li>
                            <li>สหรัถ นวมจิตร</li>
                            <li>ชยพล อาภายะธรรม</li>
                            <li>สิรวิชญ์ ชนะบูรณาศักดิ์</li>
                            <li>ชโณทัย กระแจ่ม</li>
                            <li>นันท์นภัส พีรนพวัฒน์</li>
                            <li>ธนภัทร โชติพันธ์</li>
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}
 
export default Credit;