import Head from "next/head";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/common/Sub/navBar";

export default function Main() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4f6ddfa47f0df86e4a068edbc2d4582&libraries=services,clusterer,drawing&autoload=false";
    script.async = true;
    document.head.appendChild(script);
    script.onload = () => {
      setIsScriptLoaded(true);
      window.kakao.maps.load(() => {
        initMap();
      });
    };
  }, []);

  const initMap = async () => {
    const mapContainer = document.getElementById("map");
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.55471954890439, 126.97078636597669), //중심좌표 서울역
      level: 4,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const polylines = [];
    const markers = [];

    //마커아이콘 설정
    const normalIcon = new window.kakao.maps.MarkerImage("/imgs/marker.png", new window.kakao.maps.Size(20, 28));
    const clickedIcon = new window.kakao.maps.MarkerImage("/imgs/eventmarker.png", new window.kakao.maps.Size(20, 28));

    const response = await fetch("/address.json");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    const positions = data.positions;

    const regions = {};
    for (const position of positions) {
      const { region, route } = position;
      if (!regions[region]) {
        regions[region] = {};
      }
      if (!regions[region][route]) {
        regions[region][route] = [];
      }
      regions[region][route].push(position);
    }

    //마커찍기, 경로 잇기
    for (const region in regions) {
      for (const route in regions[region]) {
        const path = []; //경로저장
        const routeMarkers = []; //마커저장
        for (const position of regions[region][route]) {
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(position.latitude, position.longitude),
            title: position.content,
            image: normalIcon,
          });

          routeMarkers.push(marker);
          markers.push(marker);
          path.push(new window.kakao.maps.LatLng(position.latitude, position.longitude));
        }

        const routePolyline = new window.kakao.maps.Polyline({
          map: map,
          path: path,
          strokeWeight: 5,
          strokeColor: "#232323",
          strokeOpacity: 0.85,
          strokeStyle: "solid",
        });

        polylines.push({ polyline: routePolyline, markers: routeMarkers });
      }
    }

    //현재 위치 불러오기
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const currentLocation = new window.kakao.maps.LatLng(lat, lng);

        //위치를 중심으로 원 그리기
        const circle = new window.kakao.maps.Circle({
          center: currentLocation,
          radius: 1000, //반경 1km
          strokeWeight: 0,
          strokeOpacity: 0,
          fillColor: "#FF0000",
          fillOpacity: 0.3,
        });
        circle.setMap(map);

        map.setCenter(currentLocation);

        //마커 변경
        for (const marker of markers) {
          const markerPosition = marker.getPosition();
          const distance = getDistance(lat, lng, markerPosition.getLat(), markerPosition.getLng());
          if (distance <= 1000) {
            //원의 반경 변경할때 동일하게
            marker.setImage(clickedIcon);

            //경로색 변경
            for (const polyline of polylines) {
              if (polyline.markers.includes(marker)) {
                polyline.polyline.setOptions({
                  strokeColor: "#232323",
                });
              }
            }
          }
        }
      });
    }
  };

  // Haversine 공식으로 두 점 사이의 거리 계산 (미터 단위)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;

    const R = 6371e3; // 지구의 반경 (미터 단위)
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lng2 - lng1);

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
  };

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
      <NavBar title="디지털 안내사 위치 보기" link="#"></NavBar>
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] bg-[#232323]">{isScriptLoaded && <div id="map" style={{ width: "100%", height: "100%" }}></div>}</div>
    </>
  );
}
