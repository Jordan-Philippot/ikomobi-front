import type { PropsWithChildren } from "react";
import { Status } from "@/lib/types/status";

interface FieldProps {
  label?: string | null;
  name?: string | undefined;
  message?: string;
  status?: Status;
  style?: React.CSSProperties;
  required?: boolean;
  disabled?: boolean;
}

export default function Field({
  label,
  name,
  message,
  status,
  style,
  children,
  required = false,
  disabled,
}: PropsWithChildren<FieldProps>) {
  return (
    <div
      style={style}
      className="field"
      data-status={status}
      data-disabled={disabled}
    >
      {label && (
        <label htmlFor={name}>
          {label}
          {required && <sup> *</sup>}
        </label>
      )}
      {children}
      <div className="message_container">
        {message && <span className="input-message">{message}</span>}
      </div>
    </div>
  );
}
