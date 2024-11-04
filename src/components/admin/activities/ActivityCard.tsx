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
import { DATE_FORMAT } from "../../../configs/constants";
import { IActivity } from "../../../shared/models/activity.model";
import ActivityDetailsModal from "../../modals/ActivityDetailsModal";

interface ActivityCardProps {
  activity: Readonly<IActivity>;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  const { title, activityType, activityStatus, startTime, venue, limitPeople } =
    activity;
  const registeredCount = 2;
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
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
              <span>Tri</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarMonth />
              <span>{dayjs(startTime).format(DATE_FORMAT)}</span>
            </div>
            <div className="flex items-center gap-2">
              <AccessTime />
              <span>{dayjs(startTime).format(DATE_FORMAT)}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocationOn />
              <span>{venue}</span>
            </div>
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
        <div className="flex justify-between mb-1">
          <span className="text-sm text-gray-600">Registration Progress</span>
          <span className="text-sm font-medium text-gray-900">
            {registeredCount}/{limitPeople}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${
                registeredCount &&
                limitPeople &&
                (registeredCount / limitPeople) * 100
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
