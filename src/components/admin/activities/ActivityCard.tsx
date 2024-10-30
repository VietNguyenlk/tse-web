import {
  AccessTime,
  CalendarMonth,
  DeleteOutline,
  Edit,
  LocationOn,
  Person,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import dayjs from "dayjs";

interface ActivityCardProps {
  title: string;
  type: string;
  status: string;
  speaker: string;
  startDate: dayjs.Dayjs;
  location: string;
  registeredCount: number;
  capacity: number;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  type,
  status,
  speaker,
  startDate,
  location,
  registeredCount,
  capacity,
}) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            {/* should loop for label */}
            <Badge className="bg-blue-200 text-blue-800 px-1 py-1 rounded-lg">
              {type}
            </Badge>
            <Badge
              className={`${
                status === "Upcoming"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              } px-1 py-1 rounded-lg`}
            >
              {status}
            </Badge>
          </div>
          <div className="flex items-center gap-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Person />
              <span>{speaker}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarMonth />
              <span>{startDate.format("YYYY-MM-DD")}</span>
            </div>
            <div className="flex items-center gap-2">
              <AccessTime />
              <span>{startDate.format("YYYY-MM-DD")}</span>
            </div>
            <div className="flex items-center gap-2">
              <LocationOn />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 hover:text-blue-500 rounded">
            <Edit />
          </button>
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
            {registeredCount}/{capacity}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{
              width: `${(registeredCount / capacity) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex justify-end">
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
          View Details &rarr;
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
