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
      <NavBar title="미션 : 아이스 아메리카노 주문하기!" link="#"></NavBar>
      <div className=" relative flex flex-col items-center justify-between w-full h-[calc(100%-48px)] bg-[#fff]">
        <Link href="./kiosk_main" className="w-full h-full bg-[#000]/60 absolute top-0 left-0 z-[99]"></Link>
        <div className="w-[90%] h-[90%] bg-[#fff] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[101] rounded-[10px] p-[20px] box-border">
          <p className="text-primary text-[20px] lg:text-[21px] font-[700] tracking-[-0.7px] leading-[155%] break-keep mb-[1px] h-[40px] text-center">주문정보를 확인해주세요</p>
          <form action="./kiosk_3" className="w-full h-[calc(100%-40px)] flex flex-col justify-between items-center border-[2px] border-primary rounded-[4px] px-[8px] py-[15px]">
            <div>dd</div>
            <div className="grid grid-cols-2 gap-[8px] w-full">
              <Link href="./kiosk_3" className="py-[6px] px-[5px] w-full flex items-center justify-center hover:opacity-70 cursor-pointer bg-[#fff] border-primary border">
                <span className="text-primary text-[15px] font-[700]">취소</span>
              </Link>
              <Link href="./kiosk_pay_select" className="py-[6px] px-[5px] w-full flex items-center justify-center hover:opacity-70 cursor-pointer bg-primary">
                <span className="text-[#fff] text-[15px] font-[700]">결제</span>
              </Link>
            </div>
          </form>
        </div>
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
            <Link href="#" className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-primary duration-150">
              커피
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              스무디
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              에이드
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              음료
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="w-full px-[5px] py-[15px] text-center text-[#000] text-[14px] font-[700] tracking-[-0.6px] leading-[155%] border-b-[3px] border-[#fff] hover:!opacity-70 hover:border-b-[3px] hover:border-primary duration-150"
            >
              차
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
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
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img1}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">아메리카노</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">3500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img2}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">카페라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4000원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img3}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">에스프레소</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">3000원</p>
            </Link>

            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img4}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">바닐라라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img5}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">카페모카</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img1}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">콜드브루</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">4500원</p>
            </Link>
            <Link
              href="#"
              onClick={() => {
                alert("잘못된 선택! 미션을 다시 확인해주세요!");
              }}
              className="flex flex-col items-center w-full aspect-square bg-[#fff] py-[5px] px-[10px] rounded-[10px] cursor-pointer hover:border-[2px] hover:border-primary hover:opacity-70 duration-150"
            >
              <div className="w-[80%] aspect-square bg-cover bg-center" style={bg_img2}></div>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">콜드브루 라떼</p>
              <p className="text-[#000] text-[13px] sm:text-[16px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-center">5000원</p>
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full h-[150px] bg-[#232323]">
          <div className="flex flex-col items-center justify-start w-[55%] h-full bg-[#fff] overflow-y-auto px-[10px] py-[12px]">
            {/* <button id="basket-1" className="w-full flex items-start gap-x-[8px] hover:opacity-70">
              <svg className="mt-[3px] w-[25px]" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="18" height="18" fill="#FF2F21" />
                <path d="M10.908 9.00001L14.085 12.177L12.177 14.085L9.00001 10.908L5.81401 14.094L3.90601 12.186L7.09201 9.00001L3.90601 5.81401L5.81401 3.90601L9.00001 7.09201L12.186 3.91501L14.094 5.82301L10.908 9.00001Z" fill="white" />
              </svg>
              <div className="w-full flex flex-col">
                <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">아메리카노 </p>
              </div>
              <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">3500원</p>
            </button> */}
          </div>

          <div className="flex w-[45%] h-full bg-[#fff]">
            <div className="flex flex-col justify-between items-center w-full h-full bg-[#fff]">
              <div className="w-full h-full flex flex-col justify-between items-end  p-[8px] border border-primary">
                <p className="text-[#000] text-[14px] font-[700] tracking-[-0.7px] leading-[155%] break-keep text-left">총 결제금액 </p>
                <p className="text-[#000] text-[15px] font-[700] tracking-[-0.7px] leading-[155%] break-keep">
                  <span className="text-primary text-[20px] tracking-[-0.9px] font-[700]">7500</span>원
                </p>
              </div>
              <Link href="./kiosk_main" className="bg-[#232323]/80 py-[9px] px-[5px] w-full text-[#fff] text-[15px] font-[700] tracking-[-0.9px] leading-[155%] text-center">
                전체취소
              </Link>
            </div>
            <Link
              onClick={() => {
                alert("메뉴를 선택해주세요.");
              }}
              href=" "
              className="flex items-center justify-center w-full h-full bg-primary"
            >
              <img src="/imgs/kiosk_list/btn-pay.svg" alt="결제하기" className="w-[80%] max-w-[80px]" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
