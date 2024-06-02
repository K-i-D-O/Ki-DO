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
      <NavBar title="미션 : 288 우 3650 주차 정산" link="#"></NavBar>
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
          <p className="text-[#FFF] text-[24px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">차량번호 입력</p>
          <svg className="opacity-0 w-[35px]" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full bg-[#fff]  max-w-[380px] py-[20px] px-[40px]">
          <p className="text-[#232323] text-[18px] sm:text-[20px] lg:text-[22px] font-[700] tracking-[-0.7px] leading-[145%] break-keep text-center">
            차량번호 뒤의 4자리를 입력 후<br />
            확인 버튼을 눌러주세요.
          </p>
          <div className="w-full grid grid-cols-4 gap-[8px] my-[15px] sm:my-[25px] px-[15px] sm:px-[5px]">
            <div className="w-full aspect-square flex items-center justify-center bg-[#232323]">
              <span className="text-[#fff] text-[30px] font-[700] tracking-[-0.8px]">3</span>
            </div>
            <div className="w-full aspect-square flex items-center justify-center bg-[#232323]"></div>
            <div className="w-full aspect-square flex items-center justify-center bg-[#232323]"></div>
            <div className="w-full aspect-square flex items-center justify-center bg-[#232323]"></div>
          </div>
          <div className="w-full grid grid-cols-3 gap-[8px] px-[25px] sm:px-[15px]">
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">1</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">2</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">3</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">4</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">5</span>
            </Link>
            <Link href="./kiosk_3" className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary">
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">6</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">7</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">8</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">9</span>
            </Link>
            <Link href="./kiosk_main" className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_259_6098)">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.0063 10.9375H39.0625C40.3057 10.9375 41.498 11.4314 42.3771 12.3104C43.2561 13.1895 43.75 14.3818 43.75 15.625V34.375C43.75 35.6182 43.2561 36.8105 42.3771 37.6896C41.498 38.5686 40.3057 39.0625 39.0625 39.0625H17.0063C16.3034 39.0623 15.6096 38.9041 14.9762 38.5996C14.3428 38.295 13.7859 37.852 13.3469 37.3031L5.6125 27.6375C5.01303 26.8891 4.68638 25.9589 4.68638 25C4.68638 24.0411 5.01303 23.1109 5.6125 22.3625L13.3469 12.6969C13.7853 12.1489 14.3411 11.7063 14.9734 11.4018C15.6056 11.0972 16.2982 10.9386 17 10.9375H17.0063ZM9.68437 9.76875C10.5628 8.67066 11.677 7.78424 12.9444 7.17514C14.2118 6.56603 15.6 6.24985 17.0063 6.25H39.0625C41.5489 6.25 43.9335 7.23772 45.6916 8.99587C47.4498 10.754 48.4375 13.1386 48.4375 15.625V34.375C48.4375 36.8614 47.4498 39.246 45.6916 41.0041C43.9335 42.7623 41.5489 43.75 39.0625 43.75H17.0063C15.6 43.7502 14.2118 43.434 12.9444 42.8249C11.677 42.2158 10.5628 41.3293 9.68437 40.2312L1.95312 30.5656C0.688798 28.9861 -6.10352e-05 27.0232 -6.10352e-05 25C-6.10352e-05 22.9768 0.688798 21.0139 1.95312 19.4344L9.68437 9.76875ZM22.75 17.0937C22.3057 16.6797 21.7181 16.4544 21.1109 16.4651C20.5037 16.4758 19.9243 16.7218 19.4949 17.1512C19.0655 17.5806 18.8195 18.1599 18.8088 18.7671C18.7981 19.3743 19.0235 19.962 19.4375 20.4063L24.0312 25L19.4375 29.5938C19.2072 29.8083 19.0225 30.0671 18.8944 30.3546C18.7663 30.6421 18.6975 30.9524 18.6919 31.2671C18.6863 31.5818 18.7442 31.8944 18.8621 32.1862C18.98 32.4781 19.1554 32.7432 19.378 32.9657C19.6006 33.1883 19.8657 33.3638 20.1575 33.4816C20.4493 33.5995 20.7619 33.6574 21.0766 33.6518C21.3913 33.6463 21.7017 33.5774 21.9892 33.4493C22.2767 33.3212 22.5354 33.1365 22.75 32.9062L27.3437 28.3125L31.9375 32.9062C32.1521 33.1365 32.4108 33.3212 32.6983 33.4493C32.9858 33.5774 33.2962 33.6463 33.6109 33.6518C33.9256 33.6574 34.2382 33.5995 34.53 33.4816C34.8218 33.3638 35.0869 33.1883 35.3095 32.9657C35.5321 32.7432 35.7075 32.4781 35.8254 32.1862C35.9433 31.8944 36.0012 31.5818 35.9956 31.2671C35.99 30.9524 35.9212 30.6421 35.7931 30.3546C35.665 30.0671 35.4803 29.8083 35.25 29.5938L30.6562 25L35.25 20.4063C35.664 19.962 35.8894 19.3743 35.8787 18.7671C35.868 18.1599 35.622 17.5806 35.1926 17.1512C34.7631 16.7218 34.1838 16.4758 33.5766 16.4651C32.9694 16.4544 32.3818 16.6797 31.9375 17.0937L27.3437 21.6875L22.75 17.0937Z"
                    fill="#111111"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_259_6098">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-white border-[2px] border-[#232323] hover:opacity-70 hover:border-primary"
            >
              <span className="text-[#000] text-[30px] font-[700] tracking-[-0.8px]">0</span>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("차량번호는 3650입니다.");
              }}
              className="w-full aspect-square flex items-center justify-center bg-primary border-[2px] border-primary hover:opacity-70"
            >
              <span className="text-[#fff] text-[30px] font-[700] tracking-[-0.8px]">확인</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
