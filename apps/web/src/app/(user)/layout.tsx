import Image from "next/image";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-screen flex flex-col">
        {children}
        <footer className="flex flex-col items-center justify-center text-xs p-2">
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
          <div>พัฒนาโดย ฝ่ายพัฒนาระบบสารสนเทศ</div>
          <div>องค์การบริหารสโมสรนิสิตจุฬาลงกรณ์มหาวิทยาลัย</div>
        </footer>
    </div>
  );
}
