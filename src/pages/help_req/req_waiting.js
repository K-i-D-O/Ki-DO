import Head from "next/head";
import React, { useEffect } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";
import Script from "next/script";
import Timer from "/public/etcjs/countDown.js";
import { messaging, onMessage } from "../../utils/firebase";
import { useRouter } from "next/router";

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const handleNotification = (payload) => {
      console.log("Message received. ", payload);
      console.log(payload.data.url);
      if (payload.data && payload.data.url) {
        router.push(payload.data.url);
      }
    };

    onMessage(messaging, (payload) => {
      handleNotification(payload);
    });
  }, [router]);

  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title> <link rel="icon" href="/imgs/favi-icon.png" />
        <link rel="shortcut icon" href="/imgs/favi-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/imgs/favi-icon.png" />
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="도움 요청하기" link="/help_req/settings"></NavBar>
      <form action="/" className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] px-[20px] bg-[#232323]">
        <div className="flex flex-col items-center gap-y-[24px] w-full h-auto bg-[#fff] my-[30px] py-[32px] px-[24px] rounded-[4px] shadow-xl">
          <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px] text-center leading-[155%]">
            도움 요청이 완료되었습니다!
            <br /> 전화가 올 때까지 잠시만 기다려주세요.
          </p>
          <Timer />
          <Link href="/" className="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
            처음 화면으로 돌아가기
          </Link>
          <Link href="/helper_map" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
            디지털 안내사 위치보기
          </Link>
        </div>
      </form>
    </>
  );
}
