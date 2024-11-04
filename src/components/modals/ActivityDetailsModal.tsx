import {
  AccessTime,
  CalendarMonth,
  Close,
  ErrorOutline,
  LocationOn,
  Person,
} from "@mui/icons-material";
import dayjs from "dayjs";
import React from "react";
import { DATE_FORMAT } from "../../configs/constants";
import { IActivity } from "../../shared/models/activity.model";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
} from "../../shared/models/enums/activity.enum";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  activity?: IActivity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  isOpen,
  activity,
  onClose,
}) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  const getBadgeColor = (status) => {
    const colors = {
      DRAFT: "bg-gray-100 text-gray-800",
      PUBLISHED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      COMPLETED: "bg-blue-100 text-blue-800",
    };
    return colors[status] || colors.DRAFT;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {activity.title ?? "Untitled Activity"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Close />
          </button>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-6">
          {activity.activityStatus && (
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(
                activity.activityStatus,
              )}`}
            >
              {ActivityStatus[activity.activityStatus]}
            </span>
          )}
          {activity.activityType && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
              {ActivityType[activity.activityType]}
            </span>
          )}
          {activity.activityScope && (
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
              {ActivityScope[activity.activityScope]}
            </span>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Description */}
          <div className="col-span-full">
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <ErrorOutline />
              <h3 className="font-medium">Description</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {activity.description || "No description provided"}
            </p>
          </div>

          {/* Capacity */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <Person />
              <h3 className="font-medium">Capacity</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {activity.limitPeople || "Unlimited"} participants
            </p>
          </div>

          {/* Venue */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <LocationOn />
              <h3 className="font-medium">Venue</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {activity.venue || "To be announced"}
            </p>
          </div>

          {/* Registration Period */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <CalendarMonth />
              <h3 className="font-medium">Registration Period</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              From: {dayjs(activity.timeOpenRegister).format(DATE_FORMAT)}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              To: {dayjs(activity.timeOpenRegister).format(DATE_FORMAT)}
            </p>
          </div>

          {/* Activity Time */}
          <div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-2">
              <AccessTime />
              <h3 className="font-medium">Activity Time</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Starts: {dayjs(activity.timeOpenRegister).format(DATE_FORMAT)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
