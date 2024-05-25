import Head from "next/head";
import React, { useState, useEffect } from "react";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";
import { useRouter } from "next/router";
import { messaging, getToken,onMessage } from '../../utils/firebase';
import axios from 'axios';

export default function Main() {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isHelper, setIsHelper] = useState(false);

  //FCM토큰 저장
  const saveTokenToServer = async (token) => {
    const storedUsername = localStorage.getItem('guestUsername');
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/save-token/`,
        { token, username: storedUsername },
        { withCredentials: true }
      );
      if (response.data.status === 'success') {
        console.log('Token saved successfully');
      } else {
        console.error('Failed to save token:', response.data.message);
      }
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };
  //헬퍼 푸시알림 전체목록
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/requests/`);
        setRequests(response.data.requests);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  //웹페이지가 닫혀있을때 푸시알림
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          navigator.serviceWorker.ready.then(registration => {
            getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, serviceWorkerRegistration: registration })
              .then((currentToken) => {
                if (currentToken) {
                  console.log('current token for client: ', currentToken);
                  saveTokenToServer(currentToken);
                } else {
                  console.log('No registration token available. Request permission to generate one.');
                }
              })
              .catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
              });
          });
        }
      });
      
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        // Customize notification here
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
          body: payload.notification.body,
          icon: payload.notification.icon
        };

        if (Notification.permission === 'granted') {
          new Notification(notificationTitle, notificationOptions);
        }
      });
    }
  }, []);

  //본인인증 카카오로그인
  useEffect(() => {
    const { code } = router.query;
    if (code) {
      const sendCodeToBackend = async (code) => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/kakao/callback/`,
            { code }
          );
          const userData = response.data.user_data;

          // Convert guest user to helper
          const convertResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/kakao-helper/`,
            userData
          );
          console.log(userData)
          if (convertResponse.data.status === 'success') {
            localStorage.setItem('guestUsername', userData.id); // 업데이트된 guestUsername
            setIsHelper(true); // 헬퍼 상태로 전환
            router.push('/help_req/settings_helper_main');
          } else {
            console.error('Failed to convert to helper:', convertResponse.data.message);
          }
        } catch (error) {
          console.error('Error during Kakao login', error);
        }
      };

      sendCodeToBackend(code);
    }
  }, [router.query]);
  
  //헬퍼 상태 변환
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
      <div className="flex flex-col items-center justify-between w-full h-[calc(100%-48px)] px-[20px] bg-[#232323] py-[30px] overflow-y-auto">
        <div className="flex flex-col items-center gap-y-[18px] w-full h-auto max-h-[calc(100vh-140px)] overflow-y-auto">
          <label
            onClick={() => {
              toggleHelperStatus(!isHelper);
              router.push("/help_req/settings_helper_main");
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
          {/* 헬퍼 상태에 따라 조건부로 렌더링 */}
          {isHelper && (
            isLoading ? (
              <p>Loading...</p>
            ) : (
            requests.map((request) => (
              <div key={request.id} className="w-full h-auto py-[20px] px-[24px] bg-[#fff] rounded-[4px]">
                <p className="text-[#090A0A] text-[17px] font-[700] tracking-[-0.8px] leading-[117%] text-left w-full">최근 도움 요청</p>
                <div className="w-full flex flex-col items-center gap-y-[16px] bg-[#F7F8F9] border border-[#dfdfdf] rounded-[4px] p-[15px]">
                  <div className="w-full flex items-center gap-x-[10px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 8V12L14.5 13M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" stroke="#131214" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px] leading-[117%]">{request.created_at}</p>
                  </div>
                  <div className="w-full flex items-center gap-x-[10px]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.7292 10.8148C18.7292 14.4197 15.577 17.6744 13.5603 19.3877C12.5993 20.2041 11.2295 20.2041 10.2686 19.3877C8.25185 17.6743 5.09961 14.4197 5.09961 10.8148C5.09961 9.00741 5.8176 7.27404 7.09562 5.99601C8.37365 4.71799 10.107 4 11.9144 4C13.7218 4 15.4552 4.71799 16.7332 5.99601C18.0112 7.27404 18.7292 9.00741 18.7292 10.8148Z" stroke="#131214" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M11.9144 13.0864C13.169 13.0864 14.186 12.0694 14.186 10.8148C14.186 9.56024 13.169 8.54321 11.9144 8.54321C10.6598 8.54321 9.64282 9.56024 9.64282 10.8148C9.64282 12.0694 10.6598 13.0864 11.9144 13.0864Z" stroke="#131214" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px] leading-[117%]">전화번호: {request.phone_number}</p>
                  </div>
                </div>
                <Link href={`/help_req/settings_helper_accpet/${request.id}`} className="bg-primary flex items-center justify-center py-[13px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
                  요청 수락하기
                </Link>
                <Link href="/" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
                  요청 거절
                </Link>
              </div>
            ))
          ))}
        </div>
        <Link href="#" className="flex flex-row items-center justify-between w-full py-[12px] px-[24px] bg-transparent border border-[#D9D9D9] rounded-[4px]">
          <div className="flex flex-col gap-y-[3px] ">
            <p className="text-[#D9D9D9] text-[17px] font-[700] tracking-[-0.8px] leading-[117%]">헬퍼로 활동하기</p>
            <p className="text-[#72777A] text-[14px] font-[500] tracking-[-0.8px] leading-[117%]">도움 요청 받기</p>
          </div>
          <div className="bg-primary flex items-center justify-center py-[8px] px-[15px] rounded-[48px] text-[#fff] w-auto text-[14px] font-[700] tracking-[-0.8px] hover:opacity-70">회원탈퇴</div>
        </Link>
      </div>
    </>
  );
}
