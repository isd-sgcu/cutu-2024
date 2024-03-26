"use client";

import Link from 'next/link'
import Image from 'next/image'

const User = () => {
    return (  
        <div className='bg-gradient-to-b from-cu-secondary via-cu-primary via-tu-primary to-tu-secondary w-screen h-full font-semibold p-10'>
            <div className='text-white flex flex-col justify-between w-fit mx-auto gap-6'>
                <div className='flex flex-col items-center gap-2'>
                    <Image
                        src="user/live.svg"
                        width={40}
                        height={40}
                        alt="live feedback"
                    />
                    <span>LIVE FEEDBACK</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <Image
                        src="user/logo.svg"
                        width={70}
                        height={70}
                        alt="logo"
                    />
                    <span >เลือกทีมที่คุณเชียร์!</span>
                </div>
                <Link 
                    href="/shake/cu" 
                    className='flex flex-col items-center bg-white rounded-3xl px-10 py-4 shadow-md'
                >
                    <Image
                        src="user/cu.svg"
                        width={80}
                        height={80}
                        alt="cu"
                    />
                    <span className='text-cu-primary'>#ทีมจุฬาฯ</span>
                </Link>
                <Link 
                    href="/shake/tu" 
                    className='flex flex-col items-center bg-white rounded-3xl px-10 py-4 shadow-md'
                >
                    <Image
                        src="user/tu.svg"
                        width={70}
                        height={70}
                        alt="tu"
                    />
                    <span className='text-tu-primary'>#ทีมมธ</span>
                </Link>
            </div>
        </div>
    );
}
 
export default User;