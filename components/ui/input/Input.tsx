import React from "react";
import classNames from "classnames";

import { InputProps } from "./Input.types";

export const Input: React.FC<InputProps> = ({
  disabled,
  name,
  errors,
  register,
  placeholder,
  className,
  type,
  label,
  isLoading,
  handleChange,
  infoText,
  value,
  inputStyle,
  min,
  max,
  rightElement,
}) => {
  return (
    <div className={classNames(className)}>
      {label ? (
        <div className="text-secondary-black mb-2 text-left text-base leading-5 font-medium">
          {label}
        </div>
      ) : null}
      <div
        className={classNames(
          "border-gray-fog flex h-14 items-center justify-between rounded-lg border",
          {
            ["bg-main-surface cursor-pointer"]: !disabled,
            ["bg-secondary-moonlightSilver"]: disabled,
            ["border-secondary-red"]: errors && errors[name],
          },
          inputStyle
        )}
      >
        <input
          min={min}
          max={max}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={
            handleChange ? (e) => handleChange(e.target.value) : undefined
          }
          {...register(name)}
          onWheel={(e) => e.currentTarget.blur()}
          className="placeholder:text-gray-cloudy max-w-full grow px-4 outline-hidden placeholder:text-sm placeholder:font-normal"
        />
        {rightElement}
      </div>
      {errors && errors[name] ? (
        <p className="text-secondary-red mt-1 px-2 text-xs">
          <span>{errors[name].message}</span>
        </p>
      ) : null}
      {infoText && (
        <p className="text-primary-medium mt-[2px] text-xs">
          <span>{infoText}</span>
        </p>
      )}
    </div>
  );
};
