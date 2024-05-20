import React, { useState } from 'react';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import classNames from 'clsx';

export const CheckBox = (props) => {
  const [isFocus, setIsFoucs] = useState(false);

  let checkboxClassName = classNames(
    props.checked ? 'bg-indigo-500 group-active:bg-indigo-600' : 'bg-white',
    'text-white',
    'border-2',
    'rounded',
    props.disabled
      ? 'border-gray-300'
      : isFocus || props.checked
      ? 'border-indigo-500 group-active:border-indigo-600'
      : 'border-gray-500 group-active:border-gray-600',
    'w-5',
    'h-5',
    'flex',
    'flex-shrink-0',
    'justify-center',
    'items-center',
    'mr-2',
    isFocus ? 'shadow-outline' : '',
    'transition',
    'ease-in-out',
    'duration-150'
  );

  let labelClassName = classNames(
    props.disabled
      ? 'text-gray-400'
      : 'text-gray-700 group-active:text-gray-800',
    'select-none'
  );

  return (
    <label className="flex items-center group">
      <VisuallyHidden>
        <input
          id={this.props.id}
          name={props.name}
          type="checkbox"
          value={props.value}
          checked={props.checked}
          onFocus={() => {
            setIsFoucs(true);
          }}
          onBlur={() => {
            setIsFoucs(false);
          }}
          onChange={props.onChange}
        />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={props.checked ? 44 : 66}
            style={{
              transition: 'all 400ms',
            }}
          />
        </svg>
      </div>
      <span className={labelClassName}>{props.children}</span>
    </label>
  );
};

export const CircleCheckBox = (props) => {
  const [isFocus, setIsFoucs] = useState(false);
  const checkboxClassName = classNames(
    props.checked ? `bg-primary` : 'bg-white',
    'border rounded-full',
    props.disabled
      ? 'border-gray-300'
      : isFocus || props.checked
      ? `border-primary `
      : 'border-gray-400',
    'w-6 h-6',
    'flex flex-shrink-0 justify-center items-center',
    'mr-2',
    isFocus ? 'ring-1 ring-primary-focus-border' : '',
    'transition ease-in-out duration-150'
  );

  const svgClassName = classNames(
    props.checked ? 'stroke-white' : 'stroke-gray-400',
    'transition ease-in-out duration-150'
  );

  return (
    <label className="flex items-center">
      <VisuallyHidden>
        <input
          id={props.id}
          name={props.name}
          type="checkbox"
          value={props.value}
          checked={props.checked}
          onFocus={() => {
            setIsFoucs(true);
          }}
          onBlur={() => {
            setIsFoucs(false);
          }}
          onChange={props.onChange}
        />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        <svg
          className={svgClassName}
          width="14"
          height="10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.333 1 5 8.333 1.667 5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
      {props.children}
    </label>
  );
};
