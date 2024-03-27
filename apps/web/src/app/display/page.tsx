import React from 'react'
import FootBallSlider from '@/app/display/components/FootBallSlider'
import Image from 'next/image'
import trophyIcon from '../../../public/slider/trophy.svg';
import shakeWhiteIcon from '../../../public/slider/shake-white.svg';
import QrCode from '@/app/display/components/QrCode';
import TeamChula from '../../../public/slider/team-chula.svg';
import TeamThammasat from '../../../public/slider/thammasat-new-logo.svg';
import LiveIcon from '../../../public/slider/live.svg';
import isdIcon from '../../../public/slider/isd.svg';
import sgcuIcon from '../../../public/slider/sgcu.svg';

const DisplayPage = () => {
  return (
    <div className='w-auto h-screen flex flex-col items-center bg-gradient-to-r from-cu-pink via-tu-dark-orange to-tu-light-orange space-y-40 p-24'>
    
        <div className='flex justify-between w-full items-center space-x-10'>
            <Image src= {LiveIcon} alt="Live" className='w-96 h-96' />
            <Image src={trophyIcon} alt="Trophy" className='w-96 h-96' />
            <div className='flex items-center justify-center space-x-10'>
                <Image src={isdIcon} alt="ISD" className='w-40 h-40' />
                <Image src={sgcuIcon} alt="SGCU" className='w-40 h-40' />
            </div>
        </div>
        <div className='w-full'>
            <div className='flex justify-between w-full px-20 py-10'>
                <Image src={TeamChula} alt="Team Chula" className='w-60 h-60' />
                <div className='text-6xl font-bold text-white px-5'>
                    ร่วมส่งพลังให้ทีมที่คุณเชียร์!
                </div>
                <Image src={TeamThammasat} alt="Team Thammasat" className='w-60 h-60' />
            </div>
            <FootBallSlider />
        </div>
        <div className='space-y-20 flex items-center justify-center flex-col mt-8'>
            <Image src={shakeWhiteIcon} alt="Shake" className='w-64 h-64' />
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
