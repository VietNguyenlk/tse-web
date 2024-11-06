import { Close } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import NotificationIcon from "./NotificationIcon";

export enum NotificationType {
  WARNING,
  ERROR,
  SUCCESS,
  INFO,
}

interface NotificationProps {
  type: keyof typeof NotificationType;
  title?: string;
  message?: string;
  onClose?: () => void;
  isShow: boolean;
  duration?: number;
  autoClose?: boolean;
  index: number;
}

const Notification: React.FC<NotificationProps> = ({
  type = "INFO",
  title,
  message,
  onClose,
  isShow = true,
  duration = 3000,
  autoClose = true,
  index = 0,
}) => {
  const [isVisible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isShow) {
      setVisible(true);
      setProgress(100);
      startProgressTimer();
    }
  }, [isShow]);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const startProgressTimer = () => {
    const startTime = Date.now();
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(newProgress);
    };

    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    const progressInterval = setInterval(updateProgress, 10);
    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutRef.current);
    };
  };

  const handleManualClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isShow) return null;

  const baseStyles =
    "fixed right-4 w-80 rounded-lg shadow-lg border overflow-hidden transition-all duration-300";

  const typeStyles = {
    SUCCESS: "bg-green-50 border-green-200",
    ERROR: "bg-red-50 border-red-200",
    WARNING: "bg-yellow-50 border-yellow-200",
    INFO: "bg-blue-50 border-blue-200",
  };

  const progressColors = {
    SUCCESS: "bg-green-500",
    ERROR: "bg-red-500",
    WARNING: "bg-yellow-500",
    INFO: "bg-blue-500",
  };

  const titleColors = {
    SUCCESS: "text-green-800",
    ERROR: "text-red-800",
    WARNING: "text-yellow-800",
    INFO: "text-blue-800",
  };

  const visibilityStyles = isVisible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";

  // Calculate top position based on index
  const topPosition = `top-${4 + index * 24}`;

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${visibilityStyles} ${topPosition}`}
    >
      <div className="p-4">
        <div className="flex gap-3">
          <NotificationIcon type={type} />

          <div className="flex-1">
            {title && (
              <h3 className={`font-medium mb-1 ${titleColors[type]}`}>{title}</h3>
            )}
            <p className="text-gray-600 text-sm">{message}</p>
          </div>

          <button
            onClick={handleManualClose}
            className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close notification"
          >
            <Close />
          </button>
        </div>
      </div>

      {autoClose && (
        <div
          className={`h-1 transition-all duration-100 ${progressColors[type]}`}
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
};

export default Notification;
