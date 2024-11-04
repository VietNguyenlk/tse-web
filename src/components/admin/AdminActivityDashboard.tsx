import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { PaginationRequestParams } from "../../configs/api";
import PaginationBar from "../pagination/PaginationBar";
import NewActivityModal from "../modals/NewActivityModal";
import ActivitiesAnalytic from "./activities/ActivitiesAnalytic";
import ActivityFilterAndSearch from "./activities/ActivityFilterAndSearch";
import AllActivitiesDashboard from "./activities/AllActivitiesDashboard";
import { useAppDispatch, useAppSelector } from "../../configs/store";
import { getActivities } from "../../modules/activity/activity.reducer";

const AdminActivityDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const { loading, errorMessage, entities, totalPages } = useAppSelector(
    (state) => state.activity,
  );

  useEffect(() => {
    const paginationParams: PaginationRequestParams = {
      page: 1,
      size: 2,
    };
    dispatch(getActivities(paginationParams));
  }, [dispatch]);

  // const handlePageChange = (pageNum: number) => {
  // };

  // const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(activitySlice.actions.setPageSize(Number(event.target.value)));
  // };

  if (loading) return <>Loading ....</>;
  if (errorMessage) return <>Error: {errorMessage}</>;
  if (entities.length === 0) return <>No activities found</>;

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
            value={1}
            // onChange={handlePageSizeChange}
          >
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>
        {/* Contents */}
        <AllActivitiesDashboard activities={entities} />
        {/* Pagination Bar */}
        <PaginationBar
          currentPage={1}
          // handlePageChange={handlePageChange}
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
