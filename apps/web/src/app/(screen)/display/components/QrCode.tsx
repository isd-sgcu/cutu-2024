import React from 'react';
import Image from 'next/image';

interface QrCodeProps {
    imageUrl?: string;
}

const QrCode: React.FC<QrCodeProps> = ({imageUrl}) => {
  return (
    <div className='w-64 h-64 bg-white flex justify-center items-center text-4xl font-bold overflow-hidden'>
        {imageUrl ? (
            <Image src={imageUrl} alt="QR Code" fill={true}/>
        ) : (
            'QR'
        )}
    </div>
  );
}

export default QrCode;
