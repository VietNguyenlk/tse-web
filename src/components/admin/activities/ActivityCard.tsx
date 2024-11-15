import {
  AccessTime,
  CalendarMonth,
  DeleteOutline,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { IActivity } from "../../../shared/models/activity.model";
import ActivityDetailsModal from "../../../modules/administration/activity-management/ActivityDetailsModal";
import {
  convertDateFromServer,
  convertTimeFromServer,
} from "../../../shared/utils/date-utils";

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            {/* should loop for label */}
            <Badge className="bg-blue-200 text-blue-800 px-1 py-1 rounded-lg">
              {activityType}
            </Badge>
            <Badge
              className={`${
                activityStatus === "CLOSED"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              } px-1 py-1 rounded-lg`}
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
