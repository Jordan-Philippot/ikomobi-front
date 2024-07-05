import { useDispatch } from "react-redux";
import { createMessage } from "@/lib/redux/reducers/messageReducer";

function useMessage() {
  const dispatch = useDispatch();

  const sendSuccess = (
    message: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    dispatch(
      createMessage({
        status: "success",
        text: message,
        onClick: onClick,
      })
    );
  };

  const sendError = (
    message: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    dispatch(
      createMessage({
        status: "error",
        text: message,
        onClick: onClick,
      })
    );
  };
  const sendDefaultNotif = (
    message: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    dispatch(
      createMessage({
        status: "default",
        text: message,
        onClick: onClick,
      })
    );
  };
  const sendWarning = (
    message: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>
  ) => {
    dispatch(
      createMessage({
        status: "warning",
        text: message,
        onClick: onClick,
      })
    );
  };

  return {
    sendSuccess,
    sendError,
    sendDefaultNotif,
    sendWarning,
  };
}

export default useMessage;
