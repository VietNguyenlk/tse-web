import {
  AccessTime,
  CalendarMonth,
  DeleteOutline,
  Edit,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import { useState } from "react";

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

interface ActivityCardProps {
  activity: Readonly<IActivity>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const {
    name,
    activityType,
    activityStatus,
    startTime,
    endTime,
    venue,
    capacity,
    registeredNumber,
    hostName,
    occurDate,
  } = activity;
  const [modalOpen, setModalOpen] = useState(false);

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

  const getScopeIcon = (scope: keyof typeof ActivityScope): JSX.Element => {
    switch (scope) {
      case "INTERNAL":
        return (
          <svg
            className="w-3.5 h-3.5"
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
            className="w-3.5 h-3.5"
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            {/* should loop for label */}
            <Badge
              className={`${getActivityTypeStyles(
                activityType,
              )} px-1 py-1 rounded-lg`}
            >
              {activityType}
            </Badge>
            <Badge
              className={`${getActivityStatusStyles(
                activityStatus,
              )} px-1 py-1 rounded-lg`}
            >
              {activityStatus}
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
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-red-500 rounded">
            <DeleteOutline />
          </button>
        </div>
      </div>

      {/* Registration Progress */}
      <div className="mt-4">
        <div className="flex justify-between mb-1 space-y-1">
          <span className="text-sm text-gray-600">Registration Progress</span>
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
        <button
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          onClick={() => setModalOpen(true)}
        >
          View Details &rarr;
        </button>
      </div>
      <ActivityDetailsModal
        onClose={() => setModalOpen(false)}
        isOpen={modalOpen}
        activity={activity}
      />
    </div>
  );
};

export default ActivityCard;
