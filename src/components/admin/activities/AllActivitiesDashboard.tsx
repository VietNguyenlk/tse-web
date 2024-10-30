import dayjs from "dayjs";
import { Activity } from "../../../store/features/activity/activitySlice";
import ActivityCard from "./ActivityCard";

interface AllActivitiesDashboardProps {
  activities: Activity[];
}

const AllActivitiesDashboard: React.FC<AllActivitiesDashboardProps> = ({
  activities,
}) => {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.activityId}
          className="border bg-white rounded-lg shadow-md hover:shadow-lg  transition-shadow"
        >
          <ActivityCard
            title={activity.title}
            type={activity.activityType}
            status={activity.activityStatus}
            speaker={"Tri nguyen"}
            startDate={dayjs(activity.startTime)}
            location={activity.venue}
            registeredCount={2}
            capacity={activity.limitPeople}
          />
        </div>
      ))}
    </div>
  );
};

export default AllActivitiesDashboard;
