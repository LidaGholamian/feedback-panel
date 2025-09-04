import React from "react";
import classNames from "classnames";

import { TextProps } from "./Text.types";

export const Text: React.FC<TextProps> = ({
  children,
  display = "block",
  size = "sm",
  weight = "normal",
  align = "left",
  color = "text-secondary-darkCharcoal",
  decoration,
  lineHeight
}) => {
  return (
    <div
      className={classNames(
        `text-${size}`,
        `font-${weight}`,
        `text-${align}`,
        lineHeight && `leading-${lineHeight}`,
        decoration,
        display,
        color
      )}
    >
      {children}
    </div>
  );
};
