import Head from "next/head";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/common/Sub/navBar";

export default function Main() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=d4f6ddfa47f0df86e4a068edbc2d4582&autoload=false";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      setIsScriptLoaded(true);
      window.kakao.maps.load(() => {
        initMap();
      });
    };
  }, []);

  const initMap = () => {

    const mapContainer = document.getElementById("map");

    if (!mapContainer) {
      console.error("#map 요소를 찾을 수 없습니다.");
      return;
    }

    const mapOption = {
      center: new window.kakao.maps.LatLng(37.55471954890439, 126.97078636597669), //중심좌표 서울역
      level: 3, //초기 지도 확대 정도

    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 }); //말풍선

    const polylines = []; 
    const markers = []; 

    //마커아이콘 설정
    const normalIcon = new window.kakao.maps.MarkerImage('/imgs/marker.png', new window.kakao.maps.Size(20, 28));
    const clickedIcon = new window.kakao.maps.MarkerImage('/imgs/eventmarker.png', new window.kakao.maps.Size(20, 28));
    //json 불러오기
    fetch('/address.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
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
            const path = []; // 경로저장
            const routeMarkers = []; //마커저장
            for (const position of regions[region][route]) {
              const markerPosition = new window.kakao.maps.LatLng(position.latitude, position.longitude);
              const marker = new window.kakao.maps.Marker({
                map,
                position: markerPosition,
                title: position.content,
                image: normalIcon,

              });

              routeMarkers.push(marker);
              markers.push(marker);
              path.push(markerPosition);
            }

            const routePolyline = new window.kakao.maps.Polyline({
              map,
              path,
              strokeWeight: 5,
              strokeColor: '#232323',
              strokeOpacity: 0.85,
              strokeStyle: 'solid'
            });

            //경로 클릭 이벤트
            (function(polyline, routeMarkers) {
              window.kakao.maps.event.addListener(polyline, 'click', function() {
                for (const j of polylines) {
                  j.polyline.setOptions({ strokeColor: '#232323' });
                }
                polyline.setOptions({ strokeColor: '#FF2F01' });


                for (const j of markers) {
                  j.setImage(normalIcon);
                }

                if (routeMarkers.length > 0) {
                  map.setCenter(routeMarkers[0].getPosition());
                }
              });

              //마커 클릭 이벤트
              for (const marker of routeMarkers) {

                (function(marker, polyline) {
                  window.kakao.maps.event.addListener(marker, 'click', function() {
                    const content = `<div style="padding:5px; text-align:center; font-size:11px;">${marker.getTitle()}</div>`;
                    infowindow.setContent(content);
                    infowindow.open(map, marker);

                    for (const j of polylines) {
                      j.polyline.setOptions({ strokeColor: '#232323' });
                    }
                    polyline.setOptions({ strokeColor: '#FF2F01' });

                    for (const j of markers) {
                      j.setImage(normalIcon);
                    }
                    marker.setImage(clickedIcon);
                  });
                })(marker, polyline);
              }
            })(routePolyline, routeMarkers);

            polylines.push({ polyline: routePolyline, markers: routeMarkers });
          }
        }
      })
      .catch(error => {
        console.error('Error fetching positions:', error);
      });
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
      <div className="flex flex-col items-center justify-center w-full h-[calc(100%-48px)] bg-[#232323]">
        {isScriptLoaded && <div id="map" style={{ width: "100%", height: "800px" }}></div>}
      </div>
    </>
  );
}
