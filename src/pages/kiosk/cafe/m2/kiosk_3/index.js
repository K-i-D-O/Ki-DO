import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";

export default function Main() {
  const bg_img1 = { backgroundImage: "url('/imgs/cafe/beverage/1.png')" };
  const bg_img2 = { backgroundImage: "url('/imgs/cafe/beverage/2.png')" };
  const bg_img3 = { backgroundImage: "url('/imgs/cafe/beverage/3.png')" };
  const bg_img4 = { backgroundImage: "url('/imgs/cafe/beverage/4.png')" };
  const bg_img5 = { backgroundImage: "url('/imgs/cafe/beverage/5.png')" };
  const bg_img6 = { backgroundImage: "url('/imgs/cafe/beverage/6.png')" };

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
      <NavBar title="미션 : HOT 녹차라떼 테이크아웃!" link="#"></NavBar>
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
          <p className="text-[#FFF] text-[24px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">KiDo Coffee</p>
          <svg className="opacity-0 w-[35px]" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.4375 11.9451V3.28125H22.9688V7.27686L17.5 2.1875L0 18.5938H4.375V32.8125H14.2188V21.875H20.7812V32.8125H30.625V18.5938H35L28.4375 11.9451Z" fill="white" />
          </svg>
        </div>
        <div className="flex flex-col  w-full h-[calc(100%-205px)] bg-[#d9d9d9]">
          <div className="grid grid-cols-6 gap-[5px] w-full h-auto bg-[#fff]">
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              커피
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              스무디
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              에이드
            </Link>
            <Link href="#" className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-primary duration-150">
              음료
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              차
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              디저트
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-[15px] w-full h-auto bg-[#d9d9d9] py-[5px] px-[15px] overflow-y-auto my-[10px]">
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img1}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">녹차라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4000원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img2}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">딸기라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4700원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img3}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">밀크티라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">5000원</p>
            </Link>

            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img6}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">흑당버블라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">5500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img4}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">초코라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4000원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img3}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">오곡라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("이미 메뉴를 선택했습니다. 결제를 진행해주세요");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img5}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">토피넛 라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4800원</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full h-[150px] bg-[#232323]">
          <div className="flex flex-col items-center justify-start w-[55%] h-full bg-[#fff] overflow-y-auto px-[10px] py-[12px]">
            <Link
              href="./kiosk_main"
              onClick={() => {
                alert("메뉴가 삭제됩니다.");
              }}
              id="basket-1"
              className="w-full flex items-start gap-x-[8px] hover:opacity-70"
            >
              <svg className="mt-[3px] w-[25px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" fill="#FF2F21" />
                <path d="M10.908 9.00001L14.085 12.177L12.177 14.085L9.00001 10.908L5.81401 14.094L3.90601 12.186L7.09201 9.00001L3.90601 5.81401L5.81401 3.90601L9.00001 7.09201L12.186 3.91501L14.094 5.82301L10.908 9.00001Z" fill="white" />
              </svg>
              <div className="w-full flex flex-col">
                <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">녹차라떼 </p>
              </div>
              <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">4000원</p>
            </Link>
          </div>

          <div className="flex w-[45%] h-full bg-[#fff]">
            <div className="flex flex-col justify-between items-center w-full h-full bg-[#fff]">
              <div className="w-full h-full flex flex-col justify-between items-end  p-[8px] border border-primary">
                <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">총 결제금액 </p>
                <p className="text-[#000] text-[15px] font-[700] tracking-[-0.7px] leading-[155%] break-keep">
                  <span className="text-primary text-[20px] tracking-[-0.9px] font-[700]">4000</span>원
                </p>
              </div>
              <Link href="./kiosk_main" className="bg-[#232323]/80 py-[9px] px-[5px] w-full text-[#fff] text-[15px] font-[700] tracking-[-0.9px] leading-[155%] text-center">
                전체취소
              </Link>
            </div>
            <Link href="./kiosk_pay_select" className="flex items-center justify-center w-full h-full bg-primary">
              <img src="/imgs/kiosk_list/btn-pay.svg" alt="결제하기" className="w-[80%] max-w-[80px]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
