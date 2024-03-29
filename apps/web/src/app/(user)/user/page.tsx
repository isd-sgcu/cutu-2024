"use client";

import Link from 'next/link'
import Image from 'next/image'

const User = () => {
    return (  
        <div 
            className='text-white font-semibold p-10 h-full'
            style={{ background: 'linear-gradient(to bottom, #F1678C, #EE457B, #ED1C24, #FBAF44)' }}
        >
            <div className='flex flex-col justify-between w-fit mx-auto h-full max-h-[500px] space-y-4'>
                <div className='flex flex-col items-center gap-2'>
                    <Image
                        src="user/live.svg"
                        width={30}
                        height={30}
                        alt="live feedback"
                    />
                    <span>LIVE FEEDBACK</span>
                </div>
                <div className='flex flex-col items-center gap-2'>
                    <Image
                        src="user/logo-shadow.svg"
                        width={60}
                        height={60}
                        alt="logo"
                    />
                    <span>เลือกทีมที่คุณเชียร์!</span>
                </div>
                <div className='flex flex-col items-center justify-center space-y-10'>
                    <Link href="/shake/cu" >
                        <div className='w-52 h-48 bg-white rounded-3xl flex items-center justify-center flex-col space-y-2'>
                            <Image
                                src="/user/chula-logo.svg"
                                width={100}
                                height={100}
                                alt="cu"
                            />
                            <span className='text-cu-secondary'>#ทีมจุฬาฯ</span>
                        </div>
                    </Link>
                    <Link href="/shake/tu">
                        <div className='w-52 h-48 bg-white rounded-3xl flex items-center justify-center flex-col space-y-2'>
                            <Image
                                src="/user/thammasat-logo.svg"
                                width={100}
                                height={100}
                                alt="cu"
                            />
                            <span className='text-tu-text'>#ทีมมธ.</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default User;