import React from "react";

export type status = "default" | "error" | "success" | "warning";
type types = "text" | "email" | "password" | "date" | "search" | "tel";

export interface InputProps {
  id?: string;
  type?: types;
  autocomplete?: string;
  name?: string;
  value?: string;
  status?: status;
  disabled?: boolean;
  maxLength?: number;
  placeholder?: string;
  style?: React.CSSProperties;
  autoFocus?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  title?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      type = "text",
      autocomplete,
      name,
      value,
      status = "default",
      disabled,
      maxLength,
      placeholder,
      style,
      autoFocus = false,
      onChange,
      onBlur,
      leftIcon,
      rightIcon,
      title,
    },
    ref
  ) => (
    <div className={`input-wrapper`} data-status={status} style={style}>
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      <input
        id={id}
        ref={ref}
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        data-left-icon={leftIcon ? true : false}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={autocomplete}
        onBlur={onBlur}
        autoFocus={autoFocus}
        className="input"
        maxLength={maxLength}
      />
      {rightIcon && (
        <span className="icon-right" title={title}>
          {rightIcon}
        </span>
      )}
    </div>
  )
);

Input.displayName = "Input";

export default Input;
