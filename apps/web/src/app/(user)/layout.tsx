import Image from "next/image";
import Link from "next/link";

import './style.css'

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col">
        {children}
        <footer className="flex flex-col items-center justify-center text-xs bg-white bg-opacity-80 p-5 space-y-5">
          <div className="flex space-x-3 items-center justify-center">
            <div className="flex items-center rounded-full bg-white w-20 h-20 justify-center ">
              <Image
                  src="user/sgcu.svg"
                  width={70}
                  height={70}
                  alt="sgcu"
                 
              />
            </div>
            <Link 
              href="https://isd.sgcu.in.th/"
              className="flex items-center rounded-full bg-black w-20 h-20 justify-center drop-shadow"
            >
              <Image
                  src="/shake/isd.svg"
                  width={50}
                  height={50}
                  alt="isd"
              />
            </Link>
          </div>
          <div>
            <div className="text-lg text-center font-semibold text-gray-800">พัฒนาโดย ฝ่ายพัฒนาระบบสารสนเทศ</div>
            <div className="text-md text-center font-semibold text-gray-800">องค์การบริหารสโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย</div>
          </div>
          <Link href="/credit" className="text-lg text-center font-semibold text-gray-800 underline">Credit</Link>
        </footer>
    </div>
  );
}
