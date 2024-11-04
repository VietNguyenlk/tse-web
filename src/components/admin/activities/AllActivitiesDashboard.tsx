import dayjs from "dayjs";
import ActivityCard from "./ActivityCard";
import { IActivity } from "../../../shared/models/activity.model";

interface AllActivitiesDashboardProps {
  activities: ReadonlyArray<IActivity>;
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
          <ActivityCard activity={activity} />
        </div>
      ))}
    </div>
  );
};

export default AllActivitiesDashboard;
