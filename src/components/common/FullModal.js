import React, { useState } from "react";
import ReactDOM from "react-dom";

export default function FullModal({ isShow, close, children, title }) {
  if (!isShow) {
    return <></>;
  }
  return ReactDOM.createPortal(
    <div className="modal">
      <section className="flex flex-col bg-white min-h-[500px] w-full h-full px-[24px] pb-[24px] rounded-[16px]">
        <div className="relative flex justify-center items-center w-full min-h-[60px] h-[60px] bg-white">
          <div className="text-primary font-medium text-[16px]">{title}</div>
          <button className="absolute right-0 top-[18px]" onClick={close}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_432_3264)">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.54289 4.54289C4.93342 4.15237 5.56658 4.15237 5.95711 4.54289L12 10.5858L18.0429 4.54289C18.4334 4.15237 19.0666 4.15237 19.4571 4.54289C19.8476 4.93342 19.8476 5.56658 19.4571 5.95711L13.4142 12L19.4571 18.0429C19.8476 18.4334 19.8476 19.0666 19.4571 19.4571C19.0666 19.8476 18.4334 19.8476 18.0429 19.4571L12 13.4142L5.95711 19.4571C5.56658 19.8476 4.93342 19.8476 4.54289 19.4571C4.15237 19.0666 4.15237 18.4334 4.54289 18.0429L10.5858 12L4.54289 5.95711C4.15237 5.56658 4.15237 4.93342 4.54289 4.54289Z" fill="#616161" />
              </g>
              <defs>
                <clipPath id="clip0_432_3264">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </section>
    </div>,
    document.getElementById("portal")
  );
}

export function useModalState() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return { isShow: showModal, close: handleClose, show: handleShow };
}

// nextjs modal use portal
