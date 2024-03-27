import React from 'react';
import Image from 'next/image';

interface QrCodeProps {
    imageUrl?: string;
    size: string
}

const QrCode: React.FC<QrCodeProps> = ({imageUrl, size}) => {
  return (
    <div className={`w-${size} h-${size} bg-white flex justify-center items-center text-4xl font-bold overflow-hidden`}>
        {imageUrl ? (
            <Image src={imageUrl} alt="QR Code" fill={true}/>
        ) : (
            'QR'
        )}
    </div>
  );
}

export default QrCode;
