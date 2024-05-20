import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

export default function Main() {
  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title>
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="모의 키오스크" link="#"></NavBar>
      <div className="relative flex flex-col items-center justify-start w-full h-[calc(100%-48px)] px-[20px] bg-[#232323] pt-[20px] pb-[60px]">
        <img className="absolute bottom-[20px] left-[50%] translate-x-[-50%]  w-[90%]" src="/imgs/kiosk_list/status.svg" alt="status 이미지" />
        <div className="flex flex-col gap-y-[18px] items-center justify-center w-full overflow-y-auto  my-[5px] mb-[40px] pt-[70px] sm:pt-[16px] sm:mb-[20px]">
          <Link href="/kiosk/food/kiosk_view_1" className="kiosk_mission_list relative duration-500 flex flex-row gap-x-[3px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 px-[16px] py-[15px] bg-[#DFDFDF] opacity-[0.85]">
            <div className="flex flex-col gap-y-[11px]">
              <p className="text-[#232323] text-[16px] font-[700] tracking-[-0.8px] ">
                치즈버거 세트를 주문해 볼까요?
                <br /> 제일 간단한 버거 세트 주문하기
              </p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[12px] rounded-[48px] text-[#fff] w-[180px] text-[17px] font-[700] tracking-[-0.6px]">1단계 재도전</div>
            </div>
            <img className="w-[100px] aspect-square" src="/imgs/kiosk_list/food_1.svg" alt="1단계 이미지" />
            <div className="absolute top-[-25px] left-[-10px]">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_37_4912)">
                  <path
                    d="M47.5 7.50001C47.0834 8.47224 46.8056 9.79168 46.7361 10.625C45.625 10.625 44.7222 11.5278 44.7222 12.6389C44.7222 13.75 45.625 14.6528 46.7361 14.6528C46.875 14.6528 47.0139 14.6528 47.1528 14.5833C47.0139 17.5695 44.5834 19.9306 41.5278 19.9306C38.4722 19.9306 36.0417 17.5695 35.9028 14.5833C36.8056 14.4445 37.5695 13.6111 37.5695 12.6389C37.5695 11.5278 36.6667 10.625 35.5556 10.625H35.3472C35.0695 9.23612 34.3056 7.0139 33.4028 7.0139C32.5 7.0139 31.7361 9.16668 31.4584 10.625C31.3195 10.625 31.1806 10.5556 31.0417 10.5556C29.9306 10.5556 29.0278 11.4583 29.0278 12.5695C29.0278 13.5417 29.7222 14.375 30.6945 14.5833C30.5556 17.5695 28.125 19.9306 25.0695 19.9306C22.0139 19.9306 19.5834 17.5 19.4445 14.5139C20.3472 14.3056 20.9722 13.5417 20.9722 12.5695C20.9722 11.4583 20.0695 10.5556 18.9584 10.5556H18.75C18.4722 9.16668 17.7084 6.94446 16.8056 6.94446C15.9028 6.94446 15.1389 9.09724 14.8611 10.5556C14.7222 10.5556 14.5834 10.4861 14.4445 10.4861C13.3334 10.4861 12.4306 11.3889 12.4306 12.5C12.4306 13.5417 13.1945 14.375 14.2361 14.5139C14.0972 17.5 11.5972 19.8611 8.61114 19.8611C5.55558 19.8611 3.12503 17.5 2.98614 14.5139C3.12503 14.5139 3.26392 14.5833 3.4028 14.5833C4.51392 14.5833 5.41669 13.6806 5.41669 12.5695C5.41669 11.4583 4.51392 10.5556 3.4028 10.5556H3.26392C3.12503 9.65279 2.91669 8.47224 2.63892 7.50001C2.43058 6.73612 1.38892 6.87501 1.38892 7.70835V40.2083H48.8889V7.84724C48.75 7.0139 47.8472 6.80557 47.5 7.50001Z"
                    fill="#FFB636"
                  />
                  <path d="M49.1667 30.2778H0.833333C0.347222 30.2778 0 29.9306 0 29.4444V27.0833C0 26.5972 0.347222 26.25 0.833333 26.25H49.0972C49.5833 26.25 49.9306 26.5972 49.9306 27.0833V29.4444C50 29.9306 49.6528 30.2778 49.1667 30.2778ZM50 42.0833V39.7222C50 39.2361 49.6528 38.8889 49.1667 38.8889H0.833333C0.347222 38.8889 0 39.2361 0 39.7222V42.0833C0 42.5694 0.347222 42.9167 0.833333 42.9167H49.0972C49.6528 42.9167 50 42.5694 50 42.0833Z" fill="#FFD469" />
                  <path d="M44.7223 34.7222C44.7223 35.9722 43.7501 36.9444 42.5001 36.9444C41.2501 36.9444 40.2778 35.9722 40.2778 34.7222C40.2778 33.4722 41.2501 32.5 42.5001 32.5C43.7501 32.5 44.7223 33.4722 44.7223 34.7222ZM25.0001 32.5C23.7501 32.5 22.7778 33.4722 22.7778 34.7222C22.7778 35.9722 23.7501 36.9444 25.0001 36.9444C26.2501 36.9444 27.2223 35.9722 27.2223 34.7222C27.2223 33.4722 26.2501 32.5 25.0001 32.5ZM7.50005 32.5C6.25005 32.5 5.27783 33.4722 5.27783 34.7222C5.27783 35.9722 6.25005 36.9444 7.50005 36.9444C8.75005 36.9444 9.72228 35.9028 9.72228 34.7222C9.72228 33.5417 8.75005 32.5 7.50005 32.5Z" fill="#FFC7EF" />
                </g>
                <defs>
                  <clipPath id="clip0_37_4912">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Link>
          <Link href="/kiosk/food/kiosk_view_1" className="kiosk_mission_list duration-500 flex flex-row gap-x-[3px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 px-[16px] py-[15px] bg-[#fff]">
            <div className="flex flex-col gap-y-[11px]">
              <p className="text-[#232323] text-[16px] font-[700] tracking-[-0.8px] ">
                옵션을 변경해 볼까요?
                <br />
                제로콜라로 바꿔서 주문하기
              </p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[12px] rounded-[48px] text-[#fff] w-[180px] text-[17px] font-[700] tracking-[-0.6px]">2단계 도전</div>
            </div>
            <img className="w-[100px] aspect-square" src="/imgs/kiosk_list/food_2.svg" alt="2단계 이미지" />
          </Link>
          <Link href="/kiosk/food/kiosk_view_1" className="kiosk_mission_list duration-500 flex flex-row gap-x-[3px] items-center justify-between w-full border-[2px] border-primary rounded-[4px] hover:opacity-70 px-[16px] py-[15px] bg-[#fff]">
            <div className="flex flex-col gap-y-[11px]">
              <p className="text-[#232323] text-[16px] font-[700] tracking-[-0.8px] ">
                추가 주문해 볼까요?
                <br />
                너겟 8조각 추가 주문하기
              </p>
              <div className="bg-primary flex items-center justify-center py-[8px] px-[12px] rounded-[48px] text-[#fff] w-[180px] text-[17px] font-[700] tracking-[-0.6px]">3단계 도전</div>
            </div>
            <img className="w-[100px] aspect-square" src="/imgs/kiosk_list/food_3.svg" alt="3단계 이미지" />
          </Link>
        </div>
      </div>
    </>
  );
}
