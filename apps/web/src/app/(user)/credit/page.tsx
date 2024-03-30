import Image from "next/image";
import Link from "next/link";
const Credit = () => {
  return (
    <div
      className="h-full text-white text-[14px] font-light pt-12 pb-8 [text-shadow:_0px_0px_2px_#FFFFF] p-10"
      style={{
        background:
          "linear-gradient(to bottom, #F1678C, #EE457B, #ED1C24, #FBAF44)",
      }}
    >
      <Link href="/user" className="flex justify-start">
        <Image
          src="../shake/arrow-back.svg"
          alt="arrow-back"
          width={25}
          height={25}
        />
      </Link>
      <main className="mx-auto h-full flex flex-col items-center">
        <header className="font-bold flex flex-col items-center border-b-[1.6px] w-[180px] text-xl pb-4 mb-4">
          <Image
            src="credit/contact.svg"
            alt="pink-shake-icon"
            width={40}
            height={40}
          />
          <h1>Credits</h1>
        </header>
        <div className="flex flex-col justify-between h-full max-h-[420px]">
          <section className="flex flex-col items-center">
            <h2 className="font-bold mb-1">พัฒนาโดย</h2>
            <span className="text-center">
              ฝ่ายพัฒนาระบบสารสนเทศ <br /> องค์การบริหารสโมสรนิสิต <br />{" "}
              จุฬาลงกรณ์มหาวิทยาลัย
            </span>
          </section>
          <section className="flex flex-col items-center">
            <h2 className="font-bold mb-1">Project Manager</h2>
            <ul className="flex flex-col items-center">
              <li>
                <a href="https://github.com/betich">ปณิธิ มักเที่ยงตรง</a>
              </li>
            </ul>
          </section>
          <section className="flex flex-col items-center">
            <h2 className="font-bold mb-1">UX/UI Designer</h2>
            <ul className="flex flex-col items-center">
              <li>
                <a href="https://www.instagram.com/klonqdoublek/">
                  พิชญา พูลเพียร
                </a>
              </li>
            </ul>
          </section>
          <section className="flex flex-col items-center">
            <h2 className="font-bold mb-1">Developers</h2>
            <ul className="flex flex-col items-center">
              <li>
                <a href="https://github.com/ImSoZRious">ปัณณวิชญ์ โลหะนิมิต</a>
              </li>
              <li>
                <a href="https://github.com/PatrickChoDev">ธนภัทร โชติพันธ์</a>
              </li>
              <li>
                <a href="https://github.com/teetri">ธนฤต ตรีมหาฤกษ์</a>
              </li>
              <li>
                <a href="https://github.com/tntons">สหรัถ นวมจิตร</a>
              </li>
              <li>
                <a href="https://github.com/TeeGoood">ชยพล อาภายะธรรม</a>
              </li>
              <li>
                <a href="https://github.com/punchanabu">
                  สิรวิชญ์ ชนะบูรณาศักดิ์
                </a>
              </li>
              <li>
                <a href="https://github.com/boomchanotai">ชโณทัย กระแจ่ม</a>
              </li>
              <li>
                <a href="https://github.com/punchpnp">นันท์นภัส พีรนพวัฒน์</a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Credit;
