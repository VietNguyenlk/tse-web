import { Add, Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PaginationRequestParams } from "../../../../configs/api";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { getUsers } from "../user-management.reducer";

import UserTable from "./UserTable";
import PaginationBar from "../../../../components/pagination/PaginationBar";
import LoadingOverlay from "../../../../components/loading/LoadingOverlay";

const AllMemberBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userManagement);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const tableHeaders = [
    "MSSV",
    "Tên",
    "Loại",
    "Ngành",
    "Điểm tích lũy",
    "TRẠNG THÁI",
  ];

  useEffect(() => {
    const paginatedParams: PaginationRequestParams = {
      page: currentPage,
      size: pageSize,
    };
    dispatch(getUsers(paginatedParams));
  }, [currentPage, pageSize]);

  return (
    <>
      <div className="h-20 border-b flex justify-between items-center px-4 py-2">
        <h1 className="text-lg font-bold">Tất cả thành viên</h1>
        <button className="border rounded bg-blue-600 text-white text-base font-semibold h-10 p-1 hover:bg-blue-700">
          <Add /> Thêm mới
        </button>
      </div>

      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="flex justify-between">
          <div className="relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10"
            />
          </div>
        </div>

        <div className="relative">
          <UserTable headers={tableHeaders} users={userState.users} />
          <LoadingOverlay isLoading={userState.loading} minTimeout={100} />
        </div>

        {userState.users.length > 0 && (
          <PaginationBar
            totalPages={userState.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            totalItems={userState.totalItems}
            itemsPerPage={pageSize}
          />
        )}
      </div>
    </>
  );
};
export default AllMemberBoard;
