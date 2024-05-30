import Head from "next/head";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from 'axios';

export default function Main() {
  const router = useRouter();
  const [isHelper, setIsHelper] = useState(false);

  const toggleHelperStatus = async (status) => {
    try {
      const storedUsername = localStorage.getItem('guestUsername');
      console.log('Stored Username:', storedUsername);
      if (!storedUsername) {
        throw new Error('No guest username found in local storage');
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/become-helper/`,
        { is_helper: status, username: storedUsername },
        { withCredentials: true }
      );
      if (response.data.status === 'success') {
        setIsHelper(status);
      } else {
        console.error('Failed to toggle helper status:', response.data.message);
      }
    } catch (error) {
      console.error('Error toggling helper status:', error);
    }
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
      <div className="flex flex-col items-center justify-between w-full h-[calc(100%-48px)] px-[20px] bg-[#232323] py-[30px]">
        <div className="flex flex-col items-center gap-y-[24px] w-full h-auto  ">
          <label
            onClick={() => {
              toggleHelperStatus(!isHelper);
              router.push("/help_req/settings_verify_modal");
            }}
            htmlFor="change_unit_helper"
            className="flex flex-row items-center justify-between w-full py-[12px] px-[24px] bg-[#fff] rounded-[4px]"
          >
            <div className="flex flex-col gap-y-[3px] ">
              <p className="text-[#090A0A] text-[17px] font-[700] tracking-[-0.8px] leading-[117%]">헬퍼로 활동하기</p>
              <p className="text-[#72777A] text-[14px] font-[500] tracking-[-0.8px] leading-[117%]">도움 요청 받기</p>
            </div>
            <label tabIndex="0" className="flex items-center relative w-max cursor-pointer !mb-0">
              <input
                type="checkbox"
                tabIndex="-1"
                id="change_unit_helper"
                name="change_unit_helper"
                className="custom-toggle-box peer appearance-none transition-colors cursor-pointer w-[65px] h-[36px] rounded-full !mt-0 focus:outline-none bg-[#d9d9d9] checked:!bg-primary"
                checked={isHelper}
                readOnly
              />
              <span className="absolute flex justify-center items-center w-[28px] h-[28px] left-[4px] rounded-full peer-checked:translate-x-[29px] transform transition-transform bg-[#fff]"></span>
            </label>
          </label>
        </div>
      </div>
    </>
  );
}
