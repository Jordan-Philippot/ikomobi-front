import type { PropsWithChildren } from "react";
import React from "react";

type titleSize = "h1" | "h2" | "h3" | "h4";
type textWeight = "lighter" | "regular" | "bold";

export interface TitleProps {
  className?: string;
  size?: titleSize;
  weight?: textWeight;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLParagraphElement>;
}

function Title({
  children,
  className = "",
  onClick,
  size = "h1",
  style,
  weight = "regular",
}: PropsWithChildren<TitleProps>) {
  return React.createElement(
    size,
    {
      style,
      onClick,
      className: `title ${weight} ${className}`,
      weight,
    },
    children
  );
}

export default Title;
