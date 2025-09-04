import React from "react";
import classNames from "classnames";

import { InputProps } from "./Input.types";
import { Text } from "../text";


const Input: React.FC<InputProps> = ({
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
  max
}) => {
  return (
    <div className={classNames(className)}>
      {label ? (
        <div className="text-black font-bold mb-2 text-left text-base leading-5">
          {label}
        </div>
      ) : null}
      {isLoading ? (
        <Text>is Loading</Text>
      ) : (
        <div
          className={classNames(
            "border-gray-300 flex h-14 items-center justify-between rounded-lg border",
            {
              ["bg-white cursor-pointer"]: !disabled,
              ["bg-gray-400"]: disabled,
              ["border-red-300"]: errors && errors[name],
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
        </div>
      )}
      {errors && errors[name] ? <Text>{errors[name].message}</Text> : null}
      {infoText && <Text>{infoText}</Text>}
    </div>
  );
};

export default Input;
