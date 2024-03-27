import React from 'react'
import FootBallSlider from '@/app/display/components/FootBallSlider'
import Image from 'next/image'
import QrCode from '@/app/display/components/QrCode';

const DisplayPage = () => {
  return (
    <div className='w-auto h-screen flex flex-col items-center bg-gradient-to-r from-cu-pink via-tu-dark-orange to-tu-light-orange space-y-40 p-24'>
    
        <div className='flex justify-between w-full items-center space-x-10'>
            <Image src= {'/slider/live.svg'} alt="Live" width={384} height={384}/>
            <Image src={'/slider/trophy.svg'} alt="Trophy" width={254} height={254} />
            <div className='flex items-center justify-center space-x-10' >
                <Image src={'/slider/isd.svg'} alt="ISD"  width={160} height={160}/>
                <Image src={'/slider/sgcu.svg'} alt="SGCU" width={160} height={160}/>
            </div>
        </div>
        <div className='w-full'>
            <div className='flex justify-between w-full px-20 py-10'>
                <Image src={'/slider/team-chula.svg'} alt="Team Chula" width={280} height={280}/>
                <div className='text-6xl font-bold text-white px-5'>
                    ร่วมส่งพลังให้ทีมที่คุณเชียร์!
                </div>
                <Image src={'/slider/thammasat-new-logo.svg'} alt="Team Thammasat" width={240} height={240}/>
            </div>
            <FootBallSlider />
        </div>
        <div className='space-y-20 flex items-center justify-center flex-col mt-8'>
            <Image src={'/slider/shake-white.svg'} alt="Shake" width={200} height={200} />
            <div className='text-5xl text-white'>
                ร่วมเชียร์ด้วยการ
                <span className='font-bold'>เขย่าโทรศัพท์</span>ได้เลย!
            </div>
            <QrCode/>
        </div>
    </div>
  )
}

export default DisplayPage
