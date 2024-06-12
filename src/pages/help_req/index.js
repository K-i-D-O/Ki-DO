import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/common/Sub/navBar";
import Link from "next/link";
import axios from "axios";
import { messaging, getToken, onMessage } from "../../utils/firebase";

const bg_img = { backgroundImage: "url('/imgs/help_req.svg')" };

export default function Main() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");

  // FCM 토큰 저장
  const saveTokenToServer = async (token) => {
    const storedUsername = localStorage.getItem("guestUsername");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/save-token/`, { token, username: storedUsername }, { withCredentials: true });
      if (response.data.status === "success") {
        console.log("Token saved successfully");
      } else {
        console.error("Failed to save token:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  // FCM 초기화 및 토큰 저장
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission status:', permission);
        if (permission === 'granted') {
          navigator.serviceWorker.register('/firebase-messaging-sw.js').then(registration => {
            console.log('Service Worker registered:', registration);
            getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY, serviceWorkerRegistration: registration })
              .then((currentToken) => {
                if (currentToken) {
                  console.log('Current token for client:', currentToken);
                  saveTokenToServer(currentToken);
                } else {
                  console.log('No registration token available. Request permission to generate one.');
                }
              })
              .catch((err) => {
                console.error('An error occurred while retrieving token:', err);
              });

            onMessage(messaging, (payload) => {
              console.log("Message received. ", payload);
              if (payload.notification) {
                const notificationTitle = payload.notification.title;
                const notificationOptions = {
                  body: payload.notification.body,
                  icon: payload.notification.icon,
                };

                if (Notification.permission === "granted") {
                  registration.showNotification(notificationTitle, notificationOptions);
                }
              }
            });
          }).catch(err => {
            console.error('Service Worker registration failed:', err);
          });
        }
      }).catch(err => {
        console.error('Notification permission request failed:', err);
      });
    } else {
      console.error('Service Worker not supported or Window not defined');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storedUsername = localStorage.getItem("guestUsername");
      const response = await axios.post(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/helprq/api/request-help/`, { phone_number: phoneNumber, username: storedUsername }, { withCredentials: true });
      if (response.data.status === "success") {
        router.push("/help_req/req_waiting");
      } else {
        console.error("도움 요청 실패:", response.data.message);
      }
    } catch (error) {
      console.error("도움 요청 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Head>
        <title>키도 - 키오스크 도우미</title>
        <link rel="icon" href="/imgs/favi-icon.png" />
        <link rel="shortcut icon" href="/imgs/favi-icon.png" />
        <link rel="apple-touch-icon-precomposed" href="/imgs/favi-icon.png" />
        <meta name="description" content="키도 - 키오스크 도우미" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar title="도움 요청하기" link="/help_req/settings"></NavBar>
      <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] px-[20px] bg-[#232323]">
        <div className="flex flex-col items-center gap-y-[20px] w-full h-auto bg-[#fff] my-[20px] py-[28px] px-[24px] rounded-[4px] shadow-xl">
          <div className="w-[75%] h-auto aspect-[184/134] bg-center bg-cover" style={bg_img}></div>
          <p className="text-[#232323] text-[17px] font-[500] tracking-[-0.8px]">연락 받으실 휴대폰 번호를 입력해주세요.</p>
          <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="p-[16px] bg-[#fff] w-full rounded-[8px] border border-[#c8c8c8] !appearance-none !outline-none focus:border-primary hover:!border-primary" placeholder="-를 제외하고 입력해주세요." />
          <button type="submit" className="bg-primary flex items-center justify-center py-[15px] px-[15px] rounded-[48px] text-[#fff] w-full text-[18px] font-[700] tracking-[-0.8px] hover:opacity-70">
            도움 요청하기
          </button>
          <Link href="/" className="text-[#232323] text-[15px] font-[700] leading-[110%] tracking-[-0.2px] hover:opacity-70">
            홈화면으로 돌아가기
          </Link>
        </div>
      </form>
    </>
  );
}
