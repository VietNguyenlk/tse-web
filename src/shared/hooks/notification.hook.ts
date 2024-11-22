import { useState } from "react";
import { NotificationTypes } from "../../configs/constants";

export interface Notification {
  id: number;
  type: keyof typeof NotificationTypes;
  title: string;
  message: string;
  show: boolean;
  createdAt: number;
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationId, setNotificationId] = useState(0);

  const addNotification = (
    type: keyof typeof NotificationTypes,
    title: string,
    message: string,
  ) => {
    const currentId = notificationId;
    setNotificationId((notificationId) => notificationId + 1);
    setNotifications((prev) =>
      [
        {
          id: currentId,
          type,
          title: title,
          message: message,
          show: true,
          createdAt: Date.now(),
        },
        ...prev,
      ].slice(0, 2),
    ); // Keep only the latest 2 notifications
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return { notifications, addNotification, removeNotification };
};
