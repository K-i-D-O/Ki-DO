import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

export default function Main() {
  const bg_img1 = { backgroundImage: "url('/imgs/cafe/coffee/1.png')" };
  const bg_img2 = { backgroundImage: "url('/imgs/cafe/coffee/2.png')" };
  const bg_img3 = { backgroundImage: "url('/imgs/cafe/coffee/3.png')" };
  const bg_img4 = { backgroundImage: "url('/imgs/cafe/coffee/4.png')" };
  const bg_img5 = { backgroundImage: "url('/imgs/cafe/coffee/5.png')" };
  const bg_img6 = { backgroundImage: "url('/imgs/cafe/coffee/6.png')" };

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
      <NavBar title="모의 키오스크 결제" link="#"></NavBar>
      <div className="flex flex-col items-center justify-between w-full h-[calc(100%-48px)] bg-[#fff]">
        <div className="flex items-center justify-between w-full h-[55px] bg-primary px-[12px]">
          <Link
            href="./kiosk_main"
            onClick={() => {
              alert("처음화면으로 돌아갑니다.");
            }}
          >
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
            </svg>
          </Link>
          <p className="text-[#FFF] text-[24px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">결제 수단 선택</p>
          <svg className="opacity-0 w-[35px]" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center gap-[12px] sm:gap-[20px] w-full h-full bg-[#fff] px-[20px] py-[5px] overflow-y-auto">
          <div className="w-full flex flex-col items-start gap-[5px] sm:gap-[8px]">
            <p className="text-[#000] text-[16px] lg:text-[18px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">
              카드결제<span className="text-[13px] lg:text-[14px]"> (카드, 삼성페이, 애플페이)</span>
            </p>
            <div className="w-full grid grid-cols-3 gap-[8px]">
              <Link href="./kiosk_card" className="w-full hover:opacity-70">
                <img className="w-full pointer-events-none" src="/imgs/pay_method/card.svg" />
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-[5px] sm:gap-[8px]">
            <p className="text-[#000] text-[16px] lg:text-[18px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">
              간편결제<span className="text-[13px] lg:text-[14px]"> (바코드 방식)</span>
            </p>
            <div className="w-full grid grid-cols-3 gap-[8px]">
              <Link href="./kiosk_barcode" className="w-full hover:opacity-70">
                <img className="w-full pointer-events-none" src="/imgs/pay_method/kakao.svg" />
              </Link>
              <Link href="./kiosk_barcode" className="w-full hover:opacity-70">
                <img className="w-full pointer-events-none" src="/imgs/pay_method/naver.svg" />
              </Link>
              <Link href="./kiosk_barcode" className="w-full hover:opacity-70">
                <img className="w-full pointer-events-none" src="/imgs/pay_method/payco.svg" />
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-[5px] sm:gap-[8px]">
            <p className="text-[#000] text-[16px] lg:text-[18px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">
              기타결제<span className="text-[13px] lg:text-[14px]"> (쿠폰, 기프티콘)</span>
            </p>
            <div className="w-full grid grid-cols-2 gap-[8px]">
              <Link href="./kiosk_coupon" className="w-full hover:opacity-70">
                <img className="w-full pointer-events-none" src="/imgs/pay_method/coupon.svg" />
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-[2px] py-[8px] sm:py-[10px] px-[12px] bg-white border border-primary rounded-[8px]">
            <p className="text-[#000] text-[14px] lg:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">총 금액 : 4000원</p>
            <p className="text-[#000] text-[14px] lg:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">할인금액 : 0원</p>
            <p className="text-primary text-[15px] lg:text-[17px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">결제 할 금액 : 4000원</p>
          </div>
        </div>
      </div>
    </>
  );
}
