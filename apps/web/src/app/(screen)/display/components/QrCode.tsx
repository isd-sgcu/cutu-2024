import React from 'react';
import Image from 'next/image';

interface QrCodeProps {
    imageUrl?: string;
    size: number
}

const QrCode: React.FC<QrCodeProps> = ({size}) => {
  return (
    <div className={`bg-white flex justify-center items-center text-4xl font-bold overflow-hidden`}>
          <Image src={"/user/qrcode.svg"} alt="QR Code" width={size} height={size}/>
    </div>
  );
}

export default QrCode;
