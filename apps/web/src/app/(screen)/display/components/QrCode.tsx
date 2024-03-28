import React from 'react';
import Image from 'next/image';

interface QrCodeProps {
    imageUrl?: string;
    size: number
}

const QrCode: React.FC<QrCodeProps> = ({imageUrl, size}) => {
  return (
    <div className={`bg-white flex justify-center items-center text-4xl font-bold overflow-hidden`}>
        {imageUrl ? (
            <Image src={imageUrl} alt="QR Code" width={size} height={size}/>
        ) : (
            'QR'
        )}
    </div>
  );
}

export default QrCode;
