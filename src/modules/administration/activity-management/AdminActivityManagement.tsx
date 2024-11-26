import { Add, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import { PaginationRequestParams } from "../../../configs/api";
import { getActivities } from "./activity-management.reducer";
import ActivitiesAnalytic from "../../../components/card/ActivitiesAnalytic";
import ActivityFilterBar from "../../../components/search/ActivityFilterBar";
import AllActivitiesDashboard from "./list/AllActivitiesDashboard";
import PaginationBar from "../../../components/pagination/PaginationBar";
import NewActivityModal from "./update/NewActivityModal";

const AdminActivityManagement: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const dispatch = useAppDispatch();
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const { entities, totalPages, totalItems } = useAppSelector(
    (state) => state.activityManagement,
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
        <h1 className="text-lg font-bold">Tất cả hoạt động</h1>

        {/* Analytic */}
        <ActivitiesAnalytic />
        {/* Filter and search */}
        <div className="flex justify-between items-center my-2">
          <ActivityFilterBar onChangePageSize={setPageSize} />
          <div className="flex space-x-2">
            <div className="relative min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10"
              />
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              onClick={() => setNewModalOpen(true)}
            >
              <Add />
              Thêm mới
            </button>
          </div>
        </div>
        {/* Contents */}
        <AllActivitiesDashboard activities={entities} />
        {/* Pagination Bar */}
        {entities.length > 0 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageSizeChange={setPageSize}
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
