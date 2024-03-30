'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import QrCode from '@/app/(screen)/display/components/QrCode';


const Display= () => {
  const [state, setState] = useState<'cu' | 'tu' | 'none'>('none');
  
  
  return (
    <div className='w-auto h-screen flex'>
        {state == 'none' &&
            <>
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-cu-dark-pink via-cu-pink to-cu-light-pink p-10 space-y-10'>
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/chula-logo.svg' width={200} height={244} alt='logo' />
                            <span className='text-5xl font-semibold text-white'>#ทีมจุฬาฯ</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '20rem' }}>{cu}%</div>
                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                            <QrCode size={150} imageUrl='/qrcode.png'/>
                            <div className='w-52 h-48 rounded-3xl flex items-center justify-center flex-col space-y-1'>
                                <Image src='/shake/pink-shake.svg' width={100} height={100} alt='shake' />
                                <span className='text-3xl text-white font-semibold text-center'>มาร่วมกันเขย่าเลย!</span>
                            </div>
                    </div>
                </div>
                
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-tu-dark-orange via-tu-orange to-tu-light-orange p-10 space-y-10'>
                        
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/tu-logo.svg' width={200} height={244} alt='logo' />
                            <span className='text-5xl font-semibold text-white'>#ทีมมธ</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '20rem' }}>{tu}%</div>
                    </div>
                    <div className='flex items-center justify-center space-x-5'>
                            <div className='w-52 h-48 rounded-3xl flex items-center justify-center flex-col space-y-2'>
                                <Image src='/shake/pink-shake.svg' width={100} height={100} alt='shake' />
                                <span className='text-3xl text-white font-semibold text-center'>มาร่วมกันเขย่าเลย!</span>
                            </div>
                            <QrCode size={150} imageUrl='/qrcode.png'/>
                    </div>
                </div>
            </>
        }

        {state == 'tu' && 
                <>
                    <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-tu-dark-orange via-tu-orange to-tu-light-orange space-y-10'>
                        <div className='flex items-center justify-center'>
                            <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '16rem' }}>Winner</div>
                        </div>
                        <div className='flex items-center justify-center flex-col space-y-10'>
                            <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                                <Image src = '/shake/tu-logo.svg' width={400} height={400} alt='logo' />
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-tu-dark-orange via-tu-orange to-tu-light-orange space-y-10'>
                        <div className='flex items-center justify-center'>
                            <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '16rem' }}>Winner</div>
                        </div>
                        <div className='flex items-center justify-center flex-col space-y-10'>
                            <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                                <Image src = '/shake/tu-logo.svg' width={400} height={400} alt='logo' />
                            </div>
                        </div>
                    </div>
                </>
        }

        {state == 'cu' &&
                <>
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-cu-dark-pink via-cu-pink to-cu-light-pink space-y-10'>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '16rem' }}>Winner</div>
                    </div>
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/chula-logo.svg' width={400} height={400} alt='logo' />
                        </div>
                    </div>
                </div>
                <div className='w-1/2 h-full flex items-center justify-center flex-col bg-gradient-to-b from-cu-dark-pink via-cu-pink to-cu-light-pink space-y-10'>
                    <div className='flex items-center justify-center'>
                        <div className='text-white font-semibold flex items-center justify-center' style={{ fontSize: '16rem' }}>Winner</div>
                    </div>
                    <div className='flex items-center justify-center flex-col space-y-10'>
                        <div className='flex flex-col items-center justify-center space-y-6 self-center'>
                            <Image src = '/shake/chula-logo.svg' width={400} height={400} alt='logo' />
                        </div>
                    </div>
                </div>
            </>
        }
    </div>
  )
}

export default Display;
