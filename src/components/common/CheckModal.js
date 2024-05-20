// 예 아니요 선택이 있는 react portal을 이용한 모달

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FormButton from './Form/FormButton';

const CheckModal = ({
  isShow,
  close,
  title,
  children,
  type,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const handleConfirm = () => {
    onConfirm();
    close();
  };

  const handleCancel = () => {
    onCancel();
    close();
  };

  if (!isShow) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[101] flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-auto max-w-[800px] px-10 h-auto py-5 rounded-lg flex flex-col justify-center items-center">
        <div className="text-lg font-bold mb-[8px]">{title}</div>
        <div className="mb-[12px]">{children}</div>
        <div className="w-full h-[1px] bg-gray-300 my-4"></div>
        {type === 'single' ? (
          <div className="flex w-full w-max-[400px] mx-auto">
            <FormButton onClick={handleConfirm} size={'sm'}>
              확인
            </FormButton>
          </div>
        ) : (
          <div className="flex gap-4">
            <div className="w-[100px]">
              <FormButton size="sm" onClick={handleConfirm}>
                예
              </FormButton>
            </div>
            <div className="w-[100px]">
              <FormButton color={'secondary'} size="sm" onClick={handleCancel}>
                아니요
              </FormButton>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default CheckModal;

export function useModalState() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return { isShow: showModal, close: handleClose, show: handleShow };
}
