export type buttonColor = "primary" | "secondary" | "outlined" | "textButton";
export type buttonSize = "s" | "l";
export type iconPosition = "left" | "right" | "none";

interface ButtonProps {
  buttonIcon?: boolean;
  color?: buttonColor;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  iconPosition?: iconPosition;
  label: string;
  link?: string;
  name?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: buttonSize;
  style?: React.CSSProperties;
  title?: string;
  type?: "button" | "submit";
}

function Button({
  buttonIcon = false,
  color = "primary",
  className,
  disabled = false,
  icon,
  iconPosition = "none",
  label,
  link,
  name,
  onClick,
  size = "s",
  style,
  title,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={`btn ${className ? className : ""}`}
      disabled={disabled}
      data-color={color}
      data-buttonicon={buttonIcon}
      data-size={size}
      data-iconposition={iconPosition}
      name={name}
      onClick={link ? () => (window.location.href = link) : onClick}
      style={style}
      title={title ? title : label}
      type={type}
    >
      {iconPosition === "left" && icon}
      {!buttonIcon && label}
      {iconPosition === "right" || (iconPosition === "none" && icon)}
    </button>
  );
}

export default Button;
