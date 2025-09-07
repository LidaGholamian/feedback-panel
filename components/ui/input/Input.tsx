import React from "react";
import classNames from "classnames";
import { InputProps, ManualMode, RHFMode} from "./Input.types";



export const Input: React.FC<InputProps> = (props) => {
  const {
    name,
    label,
    placeholder,
    disabled,
    className,
  } = props;

  const isRHF = typeof (props as RHFMode).register === "function"

  return (
    <div className={classNames(className)}>
      {label && (
        <div
          className={classNames(
            "text-black font-bold mb-2 text-left text-base"
          )}
        >
          {label}
        </div>
      )}

      <div
        className={classNames(
          "border-gray-300 flex h-14 items-center rounded-lg border px-4",
          {
            "bg-white cursor-pointer": !disabled,
            "bg-gray-400": disabled,
          },
        )}
      >
        {isRHF ? (
          <input
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            {...(props as RHFMode).register(name)}
            className="placeholder:text-gray-cloudy max-w-full grow outline-hidden placeholder:text-sm"
          />
        ) : (
          <input
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            value={(props as ManualMode).value}
            onChange={(e) => (props as ManualMode).onChange(e.target.value)}
            className="placeholder:text-gray-cloudy max-w-full grow outline-hidden placeholder:text-sm"
          />
        )}
      </div>
    </div>
  );
};
