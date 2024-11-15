import dayjs from "dayjs";
import ActivityCard from "./ActivityCard";
import { IActivity } from "../../../shared/models/activity.model";
import { useAppSelector } from "../../../configs/store";

interface AllActivitiesDashboardProps {
  activities: ReadonlyArray<IActivity>;
}

const AllActivitiesDashboard: React.FC<AllActivitiesDashboardProps> = ({
  activities,
}) => {
  const { loading, errorMessage, entities } = useAppSelector(
    (state) => state.activity,
  );

  if (loading) return <>Loading ....</>;
  if (errorMessage) return <>Error: {errorMessage}</>;
  if (entities.length === 0) return <>No activities found</>;

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
