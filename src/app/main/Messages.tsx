"use client";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/redux/store";

// ----------
// Component
// ----------
import Toaster from "@/app/ui/Toaster";
import { useEffect, useState } from "react";

function Messages() {
  const { messages } = useSelector((state: RootState) => state.message);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
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

export default Messages;
