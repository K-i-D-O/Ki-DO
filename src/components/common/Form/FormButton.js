import classNames from 'clsx';

const sizes = {
  sm: 'py-[6px] px-[12px] text-sm font-medium ',
  md: 'py-[10px] px-[12px] text-md font-bold ',
  lg: 'p-[16px] text-lg font-bold ',
};

const colorVariants = {
  default: {
    primary:
      'bg-primary hover:bg-primary-hover hover:bg-primary-hover hover:border-primary-hover active:bg-primary-active ring-primary-focus-border',
    secondary:
      'bg-secondary hover:bg-secondary-hover hover:bg-secondary-hover hover:border-secondary-hover active:bg-secondary-active ring-secondary-focus-border',
    cancel:
      'bg-cancel hover:bg-cancel-hover hover:bg-cancel-hover hover:border-cancel-hover active:bg-cancel-active ring-cancel-focus-border',
  },
  outline: {
    primary:
      'border-primary text-primary hover:bg-primary disabled:bg-primary-disabled ring-primary-focus-border',
    secondary:
      'border-secondary text-secondary hover:bg-secondary disabled:bg-secondary-disabled disabled:hover:text-secondary ring-secondary-focus-border',
    cancel:
      'border-cancel text-cancel hover:bg-cancel disabled:bg-cancel-disabled ring-cancel-focus-border',
  },
};

const FormButton = ({
  onClick,
  type,
  disabled,
  children,
  rounded = false,
  size = 'md',
  fit = false,
  outline = false,
  color = 'primary',
}) => {
  const buttonClassName = classNames(
    'whitespace-nowrap disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2',
    colorVariants[outline ? 'outline' : 'default'][color],
    !outline
      ? `text-white disabled:border-gray-300 disabled:bg-gray-300`
      : `border hover:text-white`,
    sizes[size],
    { 'w-full': !fit },
    { 'rounded-full': rounded },
    { 'rounded-md': !rounded }
  );

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={(e) => {
        onClick && onClick(e);
      }}
      className={buttonClassName}
    >
      {children}
    </button>
  );
};

export default FormButton;
