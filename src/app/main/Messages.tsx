"use client";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";

// ----------
// Component
// ----------
import Toaster from "@/app/ui/Toaster";

function Messages() {
  const { messages } = useSelector((state: RootState) => state.message);

  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <div className="messages-container">
        {messages.map((message) => (
          <div className="__toaster" key={message.date}>
            <Toaster
              message={message.text}
              status={message.status}
              onClick={message.onClick}
              duration={5000}
              style={{ position: "relative" }}
            />
          </div>
        ))}
      </div>,
      document.body
    );
  }

  return null;
}

export default Messages;
