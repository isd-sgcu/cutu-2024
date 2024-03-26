"use client";

import Link from 'next/link'
import Image from 'next/image'

const User = () => {
    return (  
        <div className='bg-gradient-to-b from-cu-secondary via-cu-primary via-tu-primary to-tu-secondary w-screen h-full font-semibold p-10'>
            <div className='text-white flex flex-col justify-between w-fit mx-auto gap-6'>
                <div className='flex flex-col items-center gap'>
                    <Image
                        src="user/live.svg"
                        width={30}
                        height={30}
                        alt="live feedback"
                    />
                    <span>LIVE FEEDBACK</span>
                </div>
                <div className='flex flex-col items-center gap'>
                    <Image
                        src="user/logo.svg"
                        width={60}
                        height={60}
                        alt="logo"
                    />
                    <span >เลือกทีมที่คุณเชียร์!</span>
                </div>
                <Link href="/shake/cu" >
                    <Image
                        src="user/cu-component.svg"
                        width={140}
                        height={140}
                        alt="cu"
                    />
                </Link>
                <Link href="/shake/tu">
                    <Image
                        src="user/tu-component.svg"
                        width={140}
                        height={140}
                        alt="tu"
                    />
                </Link>
            </div>
        </div>
    );
}
 
export default User;