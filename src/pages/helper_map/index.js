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
      <NavBar title="디지털 안내사 위치 보기" link="#"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] bg-[#232323]">
        <iframe className="!outline-none" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50578.750168573504!2d127.06278617954572!3d37.59811349892814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357cb9dae1dbae07%3A0xbce86702f405de68!2z7IK87Jyh64yA7ZWZ6rWQ!5e0!3m2!1sko!2skr!4v1716126642404!5m2!1sko!2skr" className="w-full h-full" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </>
  );
}
