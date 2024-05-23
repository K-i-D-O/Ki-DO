import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import modal from "@/components/common/Sub/navBar";
import Link from "next/link";
import { useRouter } from "next/router";


export default function Main() {
  const router = useRouter();

  const KAKAO_CLIENT_ID = 'efb6faf4cdddaddd5f04d3cda75e0612';
  const REDIRECT_URI = 'http://localhost:3000/help_req/settings_helper_main';

  const handleKakaoLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title>
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="도움 요청하기" link="/help_req/settings"></NavBar>
      <div className="relative flex flex-col items-center justify-between w-full h-[calc(100%-48px)] px-[20px] bg-[#232323] py-[30px]">
        <div className="flex flex-col items-center gap-y-[24px] w-full h-auto">
          <label htmlFor="change_unit_helper" className="flex flex-row items-center justify-between w-full py-[12px] px-[24px] bg-[#fff] rounded-[4px]">
            <div className="flex flex-col gap-y-[3px]">
              <p className="text-[#090A0A] text-[17px] font-[700] tracking-[-0.8px] leading-[117%]">헬퍼로 활동하기</p>
              <p className="text-[#72777A] text-[14px] font-[500] tracking-[-0.8px] leading-[117%]">도움 요청 받기</p>
            </div>
            <label tabIndex="0" className="flex items-center relative w-max cursor-pointer mb-0">
              <input type="checkbox" tabIndex="-1" id="change_unit_helper" name="change_unit_helper" className="custom-toggle-box peer appearance-none transition-colors cursor-pointer w-[65px] h-[36px] rounded-full mt-0 focus:outline-none bg-[#d9d9d9] checked:bg-primary" />
              <span className="absolute flex justify-center items-center w-[28px] h-[28px] left-[4px] rounded-full peer-checked:translate-x-[29px] transform transition-transform bg-[#fff]"></span>
            </label>
          </label>
        </div>
        {/* modal */}
        <div className="absolute w-full h-[100vh] bg-[#232323]/50 top-[-48px] left-0 z-[8]"></div>
        <div className="absolute w-[90%] h-auto py-[30px] px-[24px] bg-[#fff] top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-[9] rounded-[4px]">
          <form action="/help_req/settings_helper_main" className="flex flex-col items-center gap-y-[24px] w-full h-auto">
            <p className="text-[#232323] text-[18px] font-[700] tracking-[-0.8px] text-center leading-[155%]">헬퍼 회원 등록</p>
            <div className="w-full flex items-center justify-between">
              <div className="w-full flex items-center">
                <input required id="check_id_save" type="checkbox" className="peer w-0 h-0 opacity-0" />
                <label htmlFor="check_id_save" className="cursor-pointer flex items-center justify-center border-[1px] border-[#C5CBD1] w-[22px] h-[22px] aspect-square rounded-[4px] peer-checked:bg-[#ff2f01] peer-checked:border-[#fff]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.2559 5.24698L17.2529 5.24406C16.9275 4.91865 16.3996 4.91865 16.0746 5.24406L7.93043 13.3986L3.92543 9.39406C3.60043 9.06865 3.07252 9.06865 2.7471 9.39406L2.74418 9.39698C2.41877 9.7224 2.41877 10.2503 2.74418 10.5757L7.33877 15.1699L7.34127 15.1728C7.66668 15.4986 8.1946 15.4986 8.52002 15.1728L8.52293 15.1699L17.2559 6.42531C17.5813 6.0999 17.5813 5.5724 17.2559 5.24698Z" fill="#fff"></path>
                  </svg>
                </label>
                <label htmlFor="check_id_save" className="cursor-pointer flex items-center justify-center pl-[8px] text-[#484848] peer-checked:text-[#ff2f01] font-[500]">
                  <span className="text-[15px] leading-[110%] tracking-[-0.8px] font-[500]">이용약관 동의</span>
                </label>
              </div>
              <Link href="#" className="text-[#232323] text-[13px] leading-[155%] font-[400] underline whitespace-nowrap hover:opacity-75">
                내용보기
              </Link>
            </div>
            <button type="button" onClick={handleKakaoLogin} className="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
              본인인증 후 헬퍼로 활동하기
            </button>
            <Link href="/help_req/settings" className="text-[#FF2F01] text-[14px] font-[500] leading-[110%] tracking-[-0.6px] hover:opacity-70">
              돌아가기
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
