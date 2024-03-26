import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import Image from "next/image";


const anuphan = Anuphan({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        {children}
      <footer className="flex flex-col items-center text-xs py-2">
        <div className="flex">
          <Image
              src="user/sgcu.svg"
              width={50}
              height={50}
              alt="sgcu"
          />
          <Image
              src="user/isd.svg"
              width={30}
              height={30}
              alt="isd"
          />
        </div>
        <div>
          พัฒนาโดย ฝ่ายพัฒนาระบบสารสนเทศ
        </div>
        <div>
          องค์การบริหารสโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย
        </div>
      </footer>
      </body>
    </html>
  );
}
