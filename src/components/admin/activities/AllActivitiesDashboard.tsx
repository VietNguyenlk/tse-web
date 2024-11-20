import { useAppSelector } from "../../../configs/store";
import { IActivity } from "../../../shared/models/activity.model";
import EmptyList from "../../list/EmptyList";
import LoadingIndicator from "../../list/LoadingIndicator";
import ActivityCard from "./ActivityCard";

interface AllActivitiesDashboardProps {
  activities: ReadonlyArray<IActivity>;
}

const AllActivitiesDashboard: React.FC<AllActivitiesDashboardProps> = ({
  activities,
}) => {
  const { loading, errorMessage, entities } = useAppSelector(
    (state) => state.activity,
  );

  if (loading)
    return (
      <div className="mt-8">
        <LoadingIndicator size="lg" />
      </div>
    );
  if (errorMessage) return <>Error: {errorMessage}</>;
  if (entities.length === 0) return <EmptyList />;

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
