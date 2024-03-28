'use client'

import React, { useState } from 'react'
import FootBallSlider from '@/app/(screen)/display/components/FootBallSlider'
import Image from 'next/image'
import QrCode from '@/app/(screen)/display/components/QrCode';

const DisplayPage = () => {
  const [state, setState] = useState<'cu' | 'tu' | 'none'>('none');

  return (
    <div className='w-auto h-screen flex flex-col items-center bg-gradient-to-r from-cu-pink via-tu-dark-orange to-tu-light-orange space-y-40 p-24'>
        {state == 'none' &&
            <>
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
                    <FootBallSlider ballSize={400} sliderHeight='48' setState={setState} />
                </div>
                <div className='space-y-20 flex items-center justify-center flex-col mt-8'>
                    <Image src={'/slider/shake-white.svg'} alt="Shake" width={200} height={200} />
                    <div className='text-5xl text-white'>
                        ร่วมเชียร์ด้วยการ
                        <span className='font-bold'>เขย่าโทรศัพท์</span>ได้เลย!
                    </div>
                    <QrCode size={200} />
                </div>
            </>
        }

        {state !== 'none' && <div className='text-[200px] font-bold text-white mt-[200px] [text-shadow:_1px_1px_1px_rgb(0_0_0)]'>Winner</div>}

        {state == 'tu' && 
                <Image 
                    src='/user/tu-component.svg'
                    height={800}
                    width={800}
                    className='mx-auto my-auto'
                    alt='tu'
                />
        }

        {state == 'cu' &&
                <Image 
                    src='/user/cu-component.svg'
                    height={800}
                    width={800}
                    className='mx-auto my-auto'
                    alt='cu'
                />
        }
    </div>
  )
}

export default DisplayPage
