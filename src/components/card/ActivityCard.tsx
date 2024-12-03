import {
  AccessTime,
  CalendarMonth,
  DeleteOutline,
  Edit,
  EditNote,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useEffect, useState } from "react";

import ActivityDetailsModal from "../../modules/administration/activity-management/details/ActivityDetailsModal";
import { IActivity } from "../../shared/models/activity.model";
import {
  convertDateFromServer,
  convertTimeFromServer,
} from "../../shared/utils/date-utils";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
} from "../../shared/models/enums/activity.enum";
import CustomConfirmDialog from "../dialogs/CustomConfirmDialog";
import { useAppDispatch } from "../../configs/store";
import { deleteActivity } from "../../modules/administration/activity-management/activity-management.reducer";
import { userService } from "../../services/user.service";
import ParticipantsModal from "./ParticipantsModal";
interface ActivityCardProps {
  activity: Readonly<IActivity>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const dispatch = useAppDispatch();
  const {
    activityId,
    name,
    activityType,
    activityStatus,
    activityScope,
    startTime,
    endTime,
    venue,
    capacity,
    registeredNumber,
    hostName,
    occurDate,

  } = activity;
  const [modalOpen, setModalOpen] = useState(false);
  const [toggleDeleteConfirmDialog, setToggleDeleteConfirmDialog] = useState(false);
  const [isParticipantsModalOpen, setIsParticipantsModalOpen] = useState(false);

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
      case "IN_COMING":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "OPEN_NOW":
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
      case "IN_COMING":
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
      case "OPEN_NOW":
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
  // get danh sách người tham gia hoạt động
 
    // const getParticipants = async (activityId: Number) => {
    //   try {
    //     const response = await userService.getParticipants(activityId);
    //     console.log(response);
    //     return response;
    //   } catch (error) {
    //     throw error;
    //   }
    // }


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

  const handleConfirmDelete = () => {
    dispatch(deleteActivity(activity.activityId));
    setToggleDeleteConfirmDialog(false);
  };

  return (
    <div className="p-4">
      <CustomConfirmDialog
        isOpen={toggleDeleteConfirmDialog}
        onCancel={() => setToggleDeleteConfirmDialog(false)}
        onConfirm={handleConfirmDelete}
      />
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center gap-3 mb-2">
            <Badge
              className={`${getActivityTypeStyles(
                activityType,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getActivityTypeIcon(activityType)} </i>
              <span>
                {
                  { CONTEST: "Cuộc thi", SEMINAR: "Hội thảo", TRAINING: "Đào tạo" }[
                    activityType
                  ]
                }
              </span>
            </Badge>
            <Badge
              className={`${getActivityStatusStyles(
                activityStatus,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getActivityStatusIcon(activityStatus)} </i>
              <span>
                {
                  {
                    IN_COMING: "Sắp diễn ra",
                    OPEN_NOW: "Đang mở",
                    CLOSED: "Đã đóng",
                    CANCELED: "Huỷ bỏ",
                    FINISHED: "Đã kết thúc",
                  }[activityStatus]
                }
              </span>
            </Badge>

            <Badge
              className={`${getActivityScopeStyle(
                activityScope,
              )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
            >
              <i>{getScopeIcon(activityScope)} </i>
              <span>
                {{ INTERNAL: "Nội bộ", EXTERNAL: "Bên ngoài" }[activityScope]}
              </span>
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Person />
              <span>{hostName}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarMonth />
              <span>{convertDateFromServer(occurDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <AccessTime />
              <span>
                {convertTimeFromServer(startTime, true)} -{" "}
                {convertTimeFromServer(endTime, true)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mt-3">
            <LocationOn />
            <span>{venue}</span>
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-blue-600 hover:bg-gray-100 rounded "
              onClick={() => setModalOpen(true)}
            >
              <EditNote sx={{ width: 36, height: 36 }} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-red-600 hover:bg-gray-100  rounded"
              onClick={() => setToggleDeleteConfirmDialog(true)}
            >
              <DeleteOutline sx={{ width: 32, height: 32 }} />
            </button>
          </div>
        </div>
      </div>

      {/* Registration Progress */}
      <div className="mt-4">
        <div className="flex justify-between mb-1 space-y-1">
          <span className="text-sm text-gray-600">Số lượng đã đăng kí {activityId}</span>
          <span className="text-sm font-medium text-gray-900">
            {registeredNumber}/{capacity}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${
                registeredNumber && capacity && (registeredNumber / capacity) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end">
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800" 
        // onClick={() => getParticipants(activityId)}
        onClick={() => setIsParticipantsModalOpen(true)}
        >
          Xem danh sách đăng kí &rarr;
        </button>
      </div>
          {/* Thêm modal danh sách người tham gia */}
        <ParticipantsModal 
        activity={activity}
        isOpen={isParticipantsModalOpen}
        onClose={() => setIsParticipantsModalOpen(false)}
      />
      <ActivityDetailsModal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        activity={activity}
      />
    </div>
  );
};

export default ActivityCard;
