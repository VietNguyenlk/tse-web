import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { PaginationRequestParams } from "../../configs/api.config";
import { getAllActivitiesStateSelector } from "../../store/features/activity/activitySelectors";
import { activitySlice } from "../../store/features/activity/activitySlice";
import { fetchAllActivities } from "../../store/features/activity/activityThunk";
import { useAppSelector } from "../../store/hooks";
import { AppDispatch } from "../../store/store";
import PaginationBar from "../PaginationBar";
import NewActivityModal from "../modals/NewActivityModal";
import ActivitiesAnalytic from "./activities/ActivitiesAnalytic";
import ActivityFilterAndSearch from "./activities/ActivityFilterAndSearch";
import AllActivitiesDashboard from "./activities/AllActivitiesDashboard";

const AdminActivityDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const {
    activities,
    currentPage,
    error,
    pageSize,
    status,
    totalItems,
    totalPages,
  } = useAppSelector(getAllActivitiesStateSelector);

  useEffect(() => {
    const paginationParams: PaginationRequestParams = {
      page: 1,
      size: 2,
    };
    dispatch(fetchAllActivities(paginationParams));
  }, [dispatch]);

  const handlePageChange = (pageNum: number) => {
    dispatch(activitySlice.actions.setCurrentPage(pageNum));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(activitySlice.actions.setPageSize(Number(event.target.value)));
  };

  if (status === "loading") return <>Loading ....</>;
  if (error) return <>Error: {error}</>;
  if (activities.length === 0) return <>No activities found</>;

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 ">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-bold">TSE Club Activities</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            onClick={() => setNewModalOpen(true)}
          >
            <Add />
            New Activity
          </button>
        </div>
        {/* Analytic */}
        <ActivitiesAnalytic />
        {/* Filter and search */}
        <ActivityFilterAndSearch />

        <div className="mb-2">
          <select
            className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm"
            value={pageSize}
            onChange={handlePageSizeChange}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        {/* Contents */}
        <AllActivitiesDashboard activities={activities} />
        {/* Pagination Bar */}
        <PaginationBar
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />

        <NewActivityModal
          isOpen={isNewModalOpen}
          onClose={() => setNewModalOpen(false)}
        />
      </div>
    </>
  );
};
export default AdminActivityDashboard;
