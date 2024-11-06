import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmber,
} from "@mui/icons-material";
import { NotificationType } from "./Notification";

interface NotificationIconProps {
  type: keyof typeof NotificationType;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ type }) => {
  const iconProps = {
    size: 20,
    className: "shrink-0",
  };

  switch (type) {
    case "WARNING":
      return <WarningAmber className={`${iconProps.className}  text-yellow-600`} />;
    case "INFO":
      return <InfoOutlined className={`${iconProps.className}  text-blue-600`} />;
    case "ERROR":
      return <ErrorOutline className={`${iconProps.className}  text-red-600`} />;
    case "SUCCESS":
      return (
        <CheckCircleOutline className={`${iconProps.className}  text-green-600`} />
      );
    default:
      return <InfoOutlined className={`${iconProps.className}  text-blue-600`} />;
  }
};

export default NotificationIcon;
