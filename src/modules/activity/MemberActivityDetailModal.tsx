import { Close } from "@mui/icons-material";
import { IActivity } from "../../shared/models/activity.model";
import {
  convertDateForDisplay,
  convertTimeFromServer,
} from "../../shared/utils/date-utils";
import { MultiSelectOption } from "../../components/search/MutilpleSelect";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
} from "../../shared/models/enums/activity.enum";
import { SelectOption } from "../../components/search/CustomSelect";
import { Badge } from "@mui/material";

interface MemberActivityDetailModalProps {
  activity: IActivity;
  isOpen: boolean;
  onClose: () => void;
}

const MemberActivityDetailModal: React.FC<MemberActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
}) => {
  const getActivityScopeStyle = (scope: keyof typeof ActivityScope): string => {
    switch (scope) {
      case "INTERNAL":
        return "bg-white border-violet-200 text-violet-700 ring-violet-100 hover:bg-violet-50";
      case "EXTERNAL":
        return "bg-white border-cyan-200 text-cyan-700 ring-cyan-100 hover:bg-cyan-50";
      default:
        return "bg-white border-gray-200 text-gray-700 ring-gray-100 hover:bg-gray-50";
    }
  };

  const getActivityStatusStyles = (status: keyof typeof ActivityStatus): string => {
    switch (status) {
      case "PLANED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "OPENED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CLOSED":
        return "bg-red-100 text-red-800 border-red-200";
      case "CANCELED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getActivityTypeStyles = (type: keyof typeof ActivityType): string => {
    switch (type) {
      case "CONTEST":
        return "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-purple-100";
      case "SEMINAR":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-100";
      case "TRAINING":
        return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-100";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  const getActivityStatusIcon = (
    status: keyof typeof ActivityStatus,
  ): JSX.Element => {
    switch (status) {
      case "PLANED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "OPENED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      case "CLOSED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "CANCELED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getActivityTypeIcon = (type: keyof typeof ActivityType): JSX.Element => {
    switch (type) {
      case "CONTEST":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
        );
      case "SEMINAR":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case "TRAINING":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
    }
  };

  const getScopeIcon = (scope: keyof typeof ActivityScope): JSX.Element => {
    switch (scope) {
      case "INTERNAL":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "EXTERNAL":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-20 transition-opacity">
      <div className="bg-white rounded-lg  w-full max-w-2xl max-h-[90vh] overflow-y-auto relative mt-20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <Close />
        </button>

        {/* Modal Header */}
        <div className="bg-blue-50 p-6 border-b space-y-2">
          <h2 className="text-2xl font-bold text-gray-800">
            {activity.name || "Activity Details"}
          </h2>
          <div className="flex items-center gap-3">
            <Badge
              className={`${getActivityTypeStyles(
                activity.activityType,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getActivityTypeIcon(activity.activityType)} </i>
              <span>
                {
                  {
                    CONTEST: "Cuộc thi",
                    SEMINAL: "Hội thảo",
                    TRAINING: "Đào tạo",
                  }[activity.activityType]
                }
              </span>
            </Badge>
            <Badge
              className={`${getActivityStatusStyles(
                activity.activityStatus,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getActivityStatusIcon(activity.activityStatus)} </i>
              <span>
                {
                  {
                    PLANED: "Lên kế hoạch",
                    OPENED: "Mở",
                    CLOSED: "Đóng",
                    CANCELED: "Huỷ bỏ",
                  }[activity.activityStatus]
                }
              </span>
            </Badge>

            <Badge
              className={`${getActivityScopeStyle(
                activity.activityScope,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getScopeIcon(activity.activityScope)} </i>
              <span>
                {
                  { INTERNAL: "Nội bộ", EXTERNAL: "Bên ngoài" }[
                    activity.activityScope
                  ]
                }
              </span>
            </Badge>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 pb-6 space-y-4">
          <div className="space-y-2 mt-4">
            <h3 className="font-semibold text-gray-700 border-b pb-1">
              Chi tiết hoạt động
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p>
                  <span className="font-medium">Ngày diễn ra:</span>{" "}
                  {convertDateForDisplay(activity.occurDate)}
                </p>
                <p>
                  <span className="font-medium">Thời gian bắt đầu:</span>{" "}
                  {convertTimeFromServer(activity.startTime, true)}
                </p>
                <p>
                  <span className="font-medium">Thời gian kết thúc:</span>{" "}
                  {convertTimeFromServer(activity.endTime, true)}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">Hình thức:</span>{" "}
                  {
                    {
                      ONLINE: "Trực tuyến",
                      OFFLINE: "Trực tiếp",
                    }[activity.venueType]
                  }
                </p>
                <p>
                  <span className="font-medium">
                    {activity.venueType === "ONLINE" ? "Link" : "Địa chỉ"}:
                  </span>{" "}
                  {activity.venue || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Trạng thái:</span>{" "}
                  {
                    {
                      PLANED: "Lên kế hoạch",
                      OPENED: "Mở",
                      CLOSED: "Đóng",
                      CANCELED: "Huỷ bỏ",
                    }[activity.activityStatus]
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {activity.description && (
            <div>
              <h3 className="font-semibold text-base text-gray-700 mb-2">Mô tả</h3>
              <p className="text-gray-600 text-base">{activity.description}</p>
            </div>
          )}

          {/* Activity Details Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div className="space-y-2">
              <h3 className="font-semibold  text-gray-700 border-b pb-1">
                Thông tin cơ bản
              </h3>

              <p>
                <span className="font-medium">Người chủ trì:</span>{" "}
                {activity.hostName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Loại hoạt động:</span>{" "}
                {
                  {
                    CONTEST: "Cuộc thi",
                    SEMINAL: "Hội thảo",
                    TRAINING: "Đào tạo",
                  }[activity.activityType]
                }
              </p>
              <p>
                <span className="font-medium">Phạm vi:</span>{" "}
                {
                  { INTERNAL: "Nội bộ", EXTERNAL: "Bên ngoài" }[
                    activity.activityScope
                  ]
                }
              </p>
            </div>

            {/* Registration Details */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700 border-b pb-1">
                Thời hạn đăng ký
              </h3>
              <p>
                <span className="font-medium">Số lượng tham gia tối đa:</span>{" "}
                {activity.capacity || "N/A"}
              </p>
              <p>
                <span className="font-medium">Số lượng đã đăng ký:</span>{" "}
                {activity.registeredNumber || 0}
              </p>
              <p>
                <span className="font-medium">Ngày mở đăng ký:</span>{" "}
                {convertDateForDisplay(activity.timeOpenRegister)}
              </p>
              <p>
                <span className="font-medium">Ngày đóng đăng ký:</span>{" "}
                {convertDateForDisplay(activity.timeCloseRegister)}
              </p>
            </div>
          </div>

          {/* Event Timing and Venue */}
        </div>
      </div>
    </div>
  );
};

export default MemberActivityDetailModal;
