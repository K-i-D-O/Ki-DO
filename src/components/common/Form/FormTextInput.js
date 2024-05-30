import { forwardRef } from 'react';

const FormTextInput = (
  {
    id,
    label,
    required,
    placeholder,
    description,
    type,
    value,
    disabled,
    onInput,
    onChange,
  },
  ref
) => {
  return (
    <div className="flex flex-col gap-y-[8px]">
      <label id={id}>
        <div className="flex justify-between text-[15px]">
          <div className="">
            <span className='text-black/50'>{label}{' '}</span>
            {required && <span className="text-red-500">*</span>}
          </div>
          <div className="text-primary">{description}</div>
        </div>
        <input
          htmlFor={id}
          type={type}
          required={required}
          ref={ref}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onInput={(e) => {
            onInput && onInput(e);
          }}
          onChange={(e) => {
            onChange && onChange(e);
          }}
          className="w-full border border-gray-300 rounded-md p-[12px] mt-[8px] focus:outline-none focus:border-primary"
        />
      </label>
    </div>
  );
};
export default forwardRef(FormTextInput);
