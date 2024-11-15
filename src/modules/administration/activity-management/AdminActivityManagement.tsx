import { Add } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import { PaginationRequestParams } from "../../../configs/api";
import { getActivities } from "../../activity/activity.reducer";
import ActivitiesAnalytic from "../../../components/admin/activities/ActivitiesAnalytic";
import ActivityFilterAndSearch from "../../../components/admin/activities/ActivityFilterAndSearch";
import AllActivitiesDashboard from "../../../components/admin/activities/AllActivitiesDashboard";
import PaginationBar from "../../../components/pagination/PaginationBar";
import NewActivityModal from "./NewActivityModal";

const AdminActivityManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const dispatch = useAppDispatch();
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const { entities, totalPages, totalItems } = useAppSelector(
    (state) => state.activity,
  );

  useEffect(() => {
    const paginationParams: PaginationRequestParams = {
      page: currentPage,
      size: pageSize,
    };
    dispatch(getActivities(paginationParams));
  }, [pageSize, currentPage]);

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
        <ActivityFilterAndSearch onChangePageSize={setPageSize} />
        {/* Contents */}
        <AllActivitiesDashboard activities={entities} />
        {/* Pagination Bar */}
        {entities.length > 0 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            itemsPerPage={pageSize}
          />
        )}

        <NewActivityModal
          isOpen={isNewModalOpen}
          onClose={() => setNewModalOpen(false)}
        />
      </div>
    </>
  );
};
export default AdminActivityManagement;
