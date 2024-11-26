import { useAppSelector } from "../../../../configs/store";
import { IActivity } from "../../../../shared/models/activity.model";
import EmptyList from "../../../../components/loading/EmptyList";
import LoadingIndicator from "../../../../components/loading/LoadingIndicator";
import ActivityCard from "../../../../components/card/ActivityCard";
import LoadingOverlay from "../../../../components/loading/LoadingOverlay";

interface AllActivitiesDashboardProps {
  activities: ReadonlyArray<IActivity>;
}

const AllActivitiesDashboard: React.FC<AllActivitiesDashboardProps> = ({
  activities,
}) => {
  const { loading, errorMessage, entities } = useAppSelector(
    (state) => state.activityManagement,
  );

  if (errorMessage) return <>Error: {errorMessage}</>;

  return (
    <div className="relative">
      {loading && <LoadingOverlay isLoading={loading} minTimeout={100} />}
      {entities.length > 0 ? (
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
      ) : (
        <EmptyList />
      )}
    </div>
  );
};

export default AllActivitiesDashboard;
