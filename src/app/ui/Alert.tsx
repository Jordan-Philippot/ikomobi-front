import type { PropsWithChildren } from "react";
import AlertCircle from "@/app/icon/AlertCircle";
import Button from "./Button";
import { Status } from "@/lib/types/status";

interface AlertProps {
  status?: Status;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface AlertWithText extends AlertProps {
  text: string;
  children?: undefined;
}

interface AlertWithoutText extends AlertProps {
  text: string;
}

function Alert({
  children,
  status = "default",
  onClick,
  text,
}: AlertWithText | PropsWithChildren<AlertWithoutText>) {
  return (
    <aside data-status={status} className={`alert`}>
      <div className="alert-svg">
        <AlertCircle />
      </div>

      {text && <p>{text}</p>}
      {onClick && (
        <Button
          onClick={onClick}
          color="textButton"
          label="Action"
          className="cta-btn"
        />
      )}
      {children}
    </aside>
  );
}

export default Alert;
