import { useEffect, useRef, useState } from 'react';

export default function TextField({ children }) {
  const [isVisibleMore, setIsVisibleMore] = useState(false);
  const [isVisibleContent, setIsVisibleContent] = useState(true);

  const textRef = useRef(null);

  const handleClick = () => {
    setIsVisibleContent(!isVisibleContent);
  };

  useEffect(() => {
    setIsVisibleMore(false);
    setIsVisibleContent(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleMore(textRef?.current.clientHeight > 72);
      setIsVisibleContent(false);
    }, 0);
  }, [children]);

  return (
    <div className="border-[1px] rounded-[8px] p-[28px] box-border">
      <p
        ref={textRef}
        className={`whitespace-pre-wrap overflow-hidden ${
          isVisibleContent ? '' : 'max-h-[72px]'
        }`}
      >
        {children}
      </p>
      {isVisibleMore && (
        <div className="flex justify-end">
          <button className="text-primary underline" onClick={handleClick}>
            {isVisibleContent ? '접기' : '더보기'}
          </button>
        </div>
      )}
    </div>
  );
}
