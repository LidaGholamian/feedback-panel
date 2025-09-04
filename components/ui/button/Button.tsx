import React from "react";
import classNames from "classnames";

import {
  BUTTON_SIZE,
  BUTTON_VARIANT,
  BUTTON_WEIGHT,
  ButtonProps,
} from "./Button.types";

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className,
  children,
  disabled,
  loading,
  icon,
  isReverseContent = false,
  size = BUTTON_SIZE.MEDIUM,
  shape = "lg",
  weight = BUTTON_WEIGHT.MEDIUM,
  variant,
  hasBadge = false,
}) => {
  // ALL STYLES
  let styles = classNames(
    "flex items-center outline-hidden h-10 px-4 justify-center shrink-0",
    {
      ["cursor-pointer opacity-100"]: !disabled,
      ["opacity-50"]: disabled,
      ["flex-row-reverse"]: isReverseContent,
      ["justify-between gap-2"]: icon || (!icon && hasBadge),
    },
    `rounded-${shape}`,
    className
  );

  // GENERATE VARIANT
  switch (variant) {
    case BUTTON_VARIANT.PRIMARY:
      styles += ` shadow-shadow_1 bg-blue-500 text-white`;
      break;
    case BUTTON_VARIANT.SURFACE:
      styles += ` border border-gray-300 bg-white text-black`;
      break;
    case BUTTON_VARIANT.ERROR:
      styles += ` shadow-shadow_1 bg-red-600 text-white`;
      break;
    case BUTTON_VARIANT.WARNING:
      styles += ` shadow-shadow_1 bg-orange-600 text-white`;
      break;
    case BUTTON_VARIANT.BLACK:
      styles += ` bg-black text-white`;
      break;
    case BUTTON_VARIANT.SUCCESS:
      styles += ` shadow-shadow_1 bg-green-300 text-white`;
  }

  // GENERATE SIZE
  switch (size) {
    case BUTTON_SIZE.SMALL:
      styles += ` text-xs`;
      break;
    case BUTTON_SIZE.MEDIUM:
      styles += ` text-sm`;
      break;
    case BUTTON_SIZE.BASE:
      styles += ` text-base`;
      break;
    case BUTTON_SIZE.LARGE:
      styles += ` text-lg`;
  }

  // GENERATE WEIGHT
  switch (weight) {
    case BUTTON_WEIGHT.NORMAL:
      styles += ` font-normal`;
      break;
    case BUTTON_WEIGHT.MEDIUM:
      styles += ` font-medium`;
      break;
    case BUTTON_WEIGHT.BOLD:
      styles += ` font-bold`;
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={styles}
      onClick={onClick}
    >
      {loading ? (
        <div className="w-[100px] animate-spin">Button</div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
