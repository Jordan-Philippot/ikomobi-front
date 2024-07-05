"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import type { CSSProperties } from "react";
import Cross from "@/app/icon/Cross";
import Alert from "@/app/ui/Alert";
import { Status } from "@/lib/types/status";

type toasterPosition = "left" | "right";

interface ToasterProps {
  message: string;
  status?: Status;
  position?: toasterPosition;
  duration?: number;
  style?: CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Toaster({
  message,
  status = "default",
  position = "left",
  duration = 5000,
  style,
  onClick,
}: ToasterProps) {
  const [opened, setOpened] = useState<boolean>(true);
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  const [inProgress, setInprogress] = useState<boolean>(false);

  const closeToaster = () => {
    setFadeIn(false);
    setTimeout(() => {
      setOpened(false);
    }, 500);
  };

  const handleDuration = useCallback(() => {
    setFadeIn(true);
    let timer: ReturnType<typeof setTimeout>;

    if (duration && duration > 0) {
      timer = setTimeout(() => {
        closeToaster();
      }, duration);
    }

    setInprogress(true);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [duration, closeToaster]);

  useEffect(() => {
    handleDuration();
  }, [handleDuration]);

  if (!opened) return null;

  return (
    <AnimatePresence>
      {fadeIn && (
        <motion.div
          initial={{
            transform:
              position === "left" ? "translateX(-50px)" : "translateX(50px)",
            opacity: 0,
          }}
          animate={{ opacity: 1, transform: "translateX(0)" }}
          exit={{
            transform:
              position === "left" ? "translateX(-50px)" : "translateX(50px)",
            opacity: 0,
          }}
          transition={{ duration: 0.4 }}
          className={`toaster`}
          data-position={position}
          style={style}
          data-status={status}
        >
          <Alert status={status} text={message} onClick={onClick}>
            <div className="cross-container">
              <div onClick={closeToaster}>
                <Cross />
              </div>
            </div>
          </Alert>

          {duration > 0 && (
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000 }}
              className={`progress-bar`}
              data-duration={duration}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toaster;
