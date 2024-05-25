import Head from "next/head";
import React, { useState, useEffect, useRef, useCallback } from "react";
import NavBar from "@/components/common/Sub/navBar";
import modal from "@/components/common/Sub/navBar";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

export default function Main() {
  const router = useRouter();
  const { id } = router.query;
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchRequestDetails = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/request-details/${id}/`);
          if (response.data.status === 'success') {
            setRequestDetails(response.data.data);
          } else {
            console.error('Failed to fetch request details:', response.data.message);
          }
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching request details:', error);
          setIsLoading(false);
        }
      };

      fetchRequestDetails();
    }
  }, [id]);

  const handleResponse = async (response) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/respond-to-request/${id}/${response}/`,
        {},
        { withCredentials: true }
      );
      if (res.data.status === 'success') {
        console.log('Request response submitted successfully');
        router.push('/help_req/settings_helper_main');
      } else {
        console.error('Failed to submit request response:', res.data.message);
      }
    } catch (error) {
      console.error('Error submitting request response:', error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!requestDetails) {
    return <p>Request not found.</p>;
  }

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
        <div className="flex flex-col items-center gap-y-[18px] w-full h-auto  ">
          <label
            onClick={() => {
              router.push("/help_req/settings");
            }}
            for="change_unit_helper"
            className="flex flex-row items-center justify-between w-full py-[12px] px-[24px] bg-[#fff] rounded-[4px]"
          >
            <div className="flex flex-col gap-y-[3px] ">
              <p className="text-[#090A0A] text-[17px] font-[700] tracking-[-0.8px] leading-[117%]">헬퍼로 활동하기</p>
              <p className="text-[#72777A] text-[14px] font-[500] tracking-[-0.8px] leading-[117%]">도움 요청 받기</p>
            </div>
            <label tabindex="0" className="flex items-center relative w-max cursor-pointer !mb-0">
              <input checked type="checkbox" tabindex="-1" id="change_unit_helper" name="change_unit_helper" className="custom-toggle-box peer appearance-none transition-colors cursor-pointer w-[65px] h-[36px] rounded-full !mt-0 focus:outline-none bg-[#d9d9d9] checked:!bg-primary" />
              <span className="absolute flex justify-center items-center w-[28px] h-[28px] left-[4px] rounded-full peer-checked:translate-x-[29px] transform transition-transform bg-[#fff]"></span>
            </label>
          </label>
          <div className=" w-full h-auto py-[20px] px-[24px] bg-[#fff] rounded-[4px]">
            <form action="/help_req/settings_helper_main" className="flex flex-col items-center gap-y-[19px] w-full h-auto">
              <p className="text-[#090A0A] text-[17px] font-[700] tracking-[-0.8px] leading-[117%] text-left w-full">수락한 요청</p>
              <div className="w-full flex flex-col items-center gap-y-[16px] bg-[#F7F8F9] border border-[#dfdfdf] rounded-[4px] p-[15px]">
                <div className="w-full flex items-center gap-x-[10px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L14.5 13M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#131214" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px] leading-[117%]">2024-05-22 / 14:04</p>
                </div>
                <div className="w-full flex items-center gap-x-[10px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.7292 10.8148C18.7292 14.4197 15.577 17.6744 13.5603 19.3877C12.5993 20.2041 11.2295 20.2041 10.2686 19.3877C8.25185 17.6743 5.09961 14.4197 5.09961 10.8148C5.09961 9.00741 5.8176 7.27404 7.09562 5.99601C8.37365 4.71799 10.107 4 11.9144 4C13.7218 4 15.4552 4.71799 16.7332 5.99601C18.0112 7.27404 18.7292 9.00741 18.7292 10.8148Z" stroke="#131214" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11.9144 13.0864C13.169 13.0864 14.186 12.0694 14.186 10.8148C14.186 9.56024 13.169 8.54321 11.9144 8.54321C10.6598 8.54321 9.64282 9.56024 9.64282 10.8148C9.64282 12.0694 10.6598 13.0864 11.9144 13.0864Z" stroke="#131214" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>

                  <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px] leading-[117%]">내 위치에서 500M</p>
                </div>
              </div>
              <Link href={`tel:${requestDetails.phone_number}`} className="bg-primary flex items-center justify-center py-[13px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
                바로 전화하기
              </Link>
              <Link href="/" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
                해결 완료
              </Link>
            </form>
          </div>
        </div>
        <Link href="#" className="flex flex-row items-center justify-between w-full py-[12px] px-[24px] bg-transparent border border-[#D9D9D9] rounded-[4px]">
          <div className="flex flex-col gap-y-[3px] ">
            <p className="text-[#D9D9D9] text-[17px] font-[700] tracking-[-0.8px] leading-[117%]">헬퍼로 활동하기</p>
            <p className="text-[#72777A] text-[14px] font-[500] tracking-[-0.8px] leading-[117%]">도움 요청 받기</p>
          </div>
          <div class="bg-primary flex items-center justify-center py-[8px] px-[15px] rounded-[48px] text-[#fff] w-auto text-[14px] font-[700] tracking-[-0.8px] hover:opacity-70">회원탈퇴</div>
        </Link>
      </div>
    </>
  );
}
