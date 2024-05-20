import QuickNav from "@/components/layouts/quickNav";
import classNames from "clsx";

import { Lemonada, Noto_Sans_KR, Mochiy_Pop_P_One, Nanum_Pen_Script } from "next/font/google";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import { useRouter } from "next/router";

const lemonada = Lemonada({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-lemonada",
});
const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-noto_sans_kr",
});

const mochiypoppone = Mochiy_Pop_P_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-mochiypoppone",
});
const nanumpenscript = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nanumpenscript",
});
export default function Layout({ children }) {
  const router = useRouter();

  return (
    <div className="w-full h-full bg-[#f5f5f5]">
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        a {
          cursor: pointer !important;
        }
      `}</style>
      <div id="layout-wrapper" className={`${lemonada.variable} ${notoSansKr.variable}  ${mochiypoppone.variable} ${nanumpenscript.variable} realative h-[100vh] lg:w-[95%] w-full lg:max-w-[450px] flex flex-col items-center justify-between font-custom duration-500 layout-load preload lg:ml-[50%] mx-auto `} data-aos="zoom-out" data-aos-duration="500" data-aos-once="true">
        <main className={classNames("main-wrapper w-full h-[calc(100%-68px)]")}>{children}</main>
        <QuickNav />
        <div className="absolute top-[42%] left-[-100%] animate-bounce">
          <img className="w-[18vw]" src="/imgs/logo.svg" alt="키도로고" />
        </div>
      </div>
    </div>
  );
}
