import React from "react";

function Checkbox({ id, label, moreLink, checked = false, onChange = () => {} }) {
  return (
    <div>
      <div className="flex flex-row items-center gap-x-[8px]">
        <div className="relative flex items-center box-border w-[24px]">
          <input id={id} name="vote-radio" type="checkbox" className="hidden peer" checked={checked} onChange={onChange} />
          <label htmlFor={id} className="flex w-[24px] h-[24px] rounded-full border-[1px] border-[#B2B2B2] justify-center items-center cursor-pointer peer-checked:hidden">
            <svg className="flex stroke-[#b2b2b2] peer-checked:stroke-white" width="14" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.333 1 5 8.333 1.667 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </label>
          <label htmlFor={id} className="w-[24px] h-[24px] rounded-full border-[1px] border-[#B2B2B2] justify-center items-center cursor-pointer hidden peer-checked:!flex peer-checked:bg-primary peer-checked:border-primary">
            <svg className="flex stroke-[#fff] peer-checked:stroke-white" width="14" height="10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.333 1 5 8.333 1.667 5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </label>
        </div>
        <span className="flex text-[15px] leading-[15px] text-[#000]/[0.5]">{label}</span>
        {moreLink && (
          <div className="flex-1 text-right">
            <a target="_blank" href={moreLink} className=" text-primary text-[12px] underline whitespace-nowrap">
              자세히보기
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkbox;
